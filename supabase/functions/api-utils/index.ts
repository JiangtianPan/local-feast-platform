
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// CORS处理的通用响应头
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

// 创建Supabase客户端的辅助函数
export const createSupabaseClient = (req: Request) => {
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
export const handleError = (error: unknown) => {
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
export const handleSuccess = (data: any, status = 200) => {
  return new Response(
    JSON.stringify(data),
    {
      status: status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
};

// 边缘函数处理器
export const createHandler = (handler: (req: Request, supabase: any) => Promise<Response>) => {
  return serve(async (req: Request) => {
    // 处理CORS预检请求
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    try {
      const supabase = createSupabaseClient(req);
      return await handler(req, supabase);
    } catch (error) {
      return handleError(error);
    }
  });
};
