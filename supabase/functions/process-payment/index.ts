
import { createHandler, corsHeaders, handleError, handleSuccess } from '../api-utils/index.ts';

// 支付处理边缘函数
createHandler(async (req, supabase) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: '仅支持POST请求' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
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
