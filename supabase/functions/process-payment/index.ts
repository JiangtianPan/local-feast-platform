
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// CORS处理的通用响应头
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

// 创建Supabase客户端的辅助函数
const createSupabaseClient = (req: Request) => {
  const authHeader = req.headers.get('Authorization');
  
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    {
      global: {
        headers: { Authorization: authHeader ?? '' },
      },
    }
  );
};

// 错误响应处理
const handleError = (error: unknown) => {
  console.error('Error:', error);
  
  return new Response(
    JSON.stringify({
      error: (error instanceof Error) ? error.message : '未知错误',
    }),
    {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
};

// 成功响应处理
const handleSuccess = (data: any, status = 200) => {
  return new Response(
    JSON.stringify(data),
    {
      status: status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
};

// 支付处理边缘函数
serve(async (req: Request) => {
  // 处理CORS预检请求
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: '仅支持POST请求' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const supabase = createSupabaseClient(req);
    const { orderId, amount, paymentMethod, paymentDetails } = await req.json();

    // 验证参数
    if (!orderId || !amount || !paymentMethod) {
      return handleSuccess({ success: false, message: '缺少必要参数' }, 400);
    }

    // 验证订单
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      return handleSuccess({ success: false, message: '订单不存在' }, 404);
    }

    // 创建支付记录
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert([{
        order_id: orderId,
        amount,
        payment_method: paymentMethod,
        status: 'pending'
      }])
      .select()
      .single();

    if (paymentError) {
      return handleSuccess({ success: false, message: '创建支付记录失败' }, 500);
    }

    // 模拟支付处理
    // 在实际应用中，这里会与支付网关集成
    const isSuccessful = Math.random() > 0.1; // 90% 成功率
    const paymentId = `pay_${Date.now()}`;

    // 更新支付状态
    const status = isSuccessful ? 'completed' : 'failed';
    const { error: updateError } = await supabase
      .from('payments')
      .update({
        status,
        payment_id: isSuccessful ? paymentId : null,
      })
      .eq('id', payment.id);

    if (updateError) {
      return handleSuccess({ success: false, message: '更新支付状态失败' }, 500);
    }

    // 如果支付成功，更新订单状态
    if (isSuccessful) {
      await supabase
        .from('orders')
        .update({
          payment_status: 'paid',
          payment_method: paymentMethod,
        })
        .eq('id', orderId);

      return handleSuccess({
        success: true,
        message: '支付成功',
        paymentId: payment.id,
        transactionId: paymentId,
      });
    } else {
      return handleSuccess({
        success: false,
        message: '支付失败，请重试',
        paymentId: payment.id,
      });
    }
  } catch (error) {
    return handleError(error);
  }
});
