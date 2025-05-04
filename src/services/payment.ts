
import { paymentApi } from './api';

// 支付处理服务
export const PaymentService = {
  // 线上支付处理（模拟）
  processOnlinePayment: async (orderId: string, amount: number, paymentDetails: any): Promise<{ success: boolean; message: string; paymentId?: string }> => {
    try {
      // 创建支付记录
      const payment = await paymentApi.createPayment(orderId, amount, 'online');
      
      // 模拟支付处理延迟
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 模拟支付成功
      const success = Math.random() > 0.1; // 90% 成功率
      
      if (success) {
        await paymentApi.updatePaymentStatus(payment.id, 'completed', `pay_${Date.now()}`);
        return {
          success: true,
          message: '支付成功',
          paymentId: payment.id
        };
      } else {
        await paymentApi.updatePaymentStatus(payment.id, 'failed');
        return {
          success: false,
          message: '支付失败，请重试',
          paymentId: payment.id
        };
      }
    } catch (error) {
      console.error('支付处理错误:', error);
      return {
        success: false,
        message: `支付处理错误: ${(error as Error).message || '未知错误'}`
      };
    }
  },

  // 线下支付记录（例如现金支付）
  recordOfflinePayment: async (orderId: string, amount: number, method: string): Promise<{ success: boolean; message: string; paymentId?: string }> => {
    try {
      // 创建支付记录
      const payment = await paymentApi.createPayment(orderId, amount, method);
      
      // 标记为完成
      await paymentApi.updatePaymentStatus(payment.id, 'completed', `offline_${Date.now()}`);
      
      return {
        success: true,
        message: '支付记录已创建',
        paymentId: payment.id
      };
    } catch (error) {
      console.error('支付记录创建错误:', error);
      return {
        success: false,
        message: `支付记录创建错误: ${(error as Error).message || '未知错误'}`
      };
    }
  }
};
