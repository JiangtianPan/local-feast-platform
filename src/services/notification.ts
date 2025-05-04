
// 模拟通知服务

// 邮件通知服务
const emailService = {
  sendEmail: async (to: string, subject: string, body: string): Promise<boolean> => {
    console.log(`发送邮件到 ${to}`);
    console.log(`主题: ${subject}`);
    console.log(`内容: ${body}`);
    
    // 在实际应用中，这里会集成真实的邮件服务，如SendGrid、Mailgun等
    // 模拟成功率
    return Math.random() > 0.05; // 95% 成功率
  }
};

// 短信通知服务
const smsService = {
  sendSMS: async (phone: string, message: string): Promise<boolean> => {
    console.log(`发送短信到 ${phone}`);
    console.log(`内容: ${message}`);
    
    // 在实际应用中，这里会集成真实的短信服务，如Twilio、阿里云SMS等
    // 模拟成功率
    return Math.random() > 0.1; // 90% 成功率
  }
};

// 通知服务封装
export const NotificationService = {
  // 订单状态通知
  sendOrderNotification: async (order: any, user: any): Promise<{ success: boolean; message: string }> => {
    try {
      const { email, phone } = user;
      const subject = `订单状态更新: ${order.id}`;
      const message = `您的订单 ${order.id} 状态已更新为 ${order.status}。`;
      
      // 尝试发送邮件
      let emailSuccess = false;
      if (email) {
        emailSuccess = await emailService.sendEmail(email, subject, message);
      }
      
      // 尝试发送短信
      let smsSuccess = false;
      if (phone) {
        smsSuccess = await smsService.sendSMS(phone, message);
      }
      
      return {
        success: emailSuccess || smsSuccess,
        message: `通知已发送: 邮件(${emailSuccess ? '成功' : '失败'})${phone ? `，短信(${smsSuccess ? '成功' : '失败'})` : ''}`
      };
    } catch (error) {
      console.error('发送通知错误:', error);
      return {
        success: false,
        message: `发送通知错误: ${(error as Error).message || '未知错误'}`
      };
    }
  },
  
  // 预订通知
  sendReservationNotification: async (reservation: any): Promise<{ success: boolean; message: string }> => {
    try {
      const { email, phone, name, date, time } = reservation;
      const dateObj = new Date(date);
      const formattedDate = `${dateObj.getFullYear()}年${dateObj.getMonth() + 1}月${dateObj.getDate()}日`;
      
      const subject = `预订确认: ${reservation.id}`;
      const message = `尊敬的${name}，您的预订已确认。日期: ${formattedDate}，时间: ${time}，人数: ${reservation.guests}。`;
      
      // 尝试发送邮件
      let emailSuccess = false;
      if (email) {
        emailSuccess = await emailService.sendEmail(email, subject, message);
      }
      
      // 尝试发送短信
      let smsSuccess = false;
      if (phone) {
        smsSuccess = await smsService.sendSMS(phone, message);
      }
      
      return {
        success: emailSuccess || smsSuccess,
        message: `通知已发送: 邮件(${emailSuccess ? '成功' : '失败'})${phone ? `，短信(${smsSuccess ? '成功' : '失败'})` : ''}`
      };
    } catch (error) {
      console.error('发送通知错误:', error);
      return {
        success: false,
        message: `发送通知错误: ${(error as Error).message || '未知错误'}`
      };
    }
  }
};
