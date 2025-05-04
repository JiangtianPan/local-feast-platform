
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

// 类型定义
export type Category = Database['public']['Tables']['categories']['Row'];
export type Dish = Database['public']['Tables']['dishes']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
export type OrderItem = Database['public']['Tables']['order_items']['Row'];
export type Reservation = Database['public']['Tables']['reservations']['Row'];
export type Payment = Database['public']['Tables']['payments']['Row'];

// 菜单API
export const menuApi = {
  // 获取所有类别
  getCategories: async (): Promise<Category[]> => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data || [];
  },

  // 获取类别下的所有菜品
  getDishesInCategory: async (categoryId: string): Promise<Dish[]> => {
    const { data, error } = await supabase
      .from('dishes')
      .select('*')
      .eq('category_id', categoryId)
      .eq('is_available', true)
      .order('name');
    
    if (error) throw error;
    return data || [];
  },

  // 获取所有菜品
  getAllDishes: async (): Promise<Dish[]> => {
    const { data, error } = await supabase
      .from('dishes')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data || [];
  },

  // 获取单个菜品详情
  getDish: async (id: string): Promise<Dish | null> => {
    const { data, error } = await supabase
      .from('dishes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // 管理员: 创建类别
  createCategory: async (category: Omit<Category, 'id' | 'created_at' | 'updated_at'>): Promise<Category> => {
    const { data, error } = await supabase
      .from('categories')
      .insert([category])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 管理员: 更新类别
  updateCategory: async (id: string, category: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>): Promise<Category> => {
    const { data, error } = await supabase
      .from('categories')
      .update(category)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 管理员: 删除类别
  deleteCategory: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // 管理员: 创建菜品
  createDish: async (dish: Omit<Dish, 'id' | 'created_at' | 'updated_at'>): Promise<Dish> => {
    const { data, error } = await supabase
      .from('dishes')
      .insert([dish])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 管理员: 更新菜品
  updateDish: async (id: string, dish: Partial<Omit<Dish, 'id' | 'created_at' | 'updated_at'>>): Promise<Dish> => {
    const { data, error } = await supabase
      .from('dishes')
      .update(dish)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 管理员: 删除菜品
  deleteDish: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('dishes')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // 管理员: 更新库存
  updateInventory: async (id: string, quantity: number, reason: string): Promise<void> => {
    const { error: dishError } = await supabase
      .from('dishes')
      .update({ inventory: quantity })
      .eq('id', id);
    
    if (dishError) throw dishError;

    const { error: historyError } = await supabase
      .from('inventory_history')
      .insert([{
        dish_id: id,
        quantity_change: quantity,
        reason,
      }]);
    
    if (historyError) throw historyError;
  }
};

// 用户相关API
export const userApi = {
  // 获取当前用户资料
  getProfile: async (): Promise<Profile | null> => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // 更新用户资料
  updateProfile: async (profile: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>): Promise<Profile> => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('用户未登录');
    
    const { data, error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', user.id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// 订单相关API
export const orderApi = {
  // 创建订单
  createOrder: async (
    items: Array<{ dish_id: string; quantity: number; notes?: string }>,
    address?: string
  ): Promise<Order> => {
    // 1. 获取用户信息
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('用户未登录');

    // 2. 验证库存并计算总价
    let totalAmount = 0;
    const processedItems = [];

    for (const item of items) {
      const { data: dish, error } = await supabase
        .from('dishes')
        .select('*')
        .eq('id', item.dish_id)
        .single();

      if (error) throw error;
      if (!dish) throw new Error(`菜品不存在: ${item.dish_id}`);
      if (!dish.is_available) throw new Error(`菜品不可用: ${dish.name}`);
      if (dish.inventory < item.quantity) throw new Error(`${dish.name} 库存不足`);

      totalAmount += parseFloat(dish.price.toString()) * item.quantity;
      
      processedItems.push({
        dish_id: dish.id,
        dish_name: dish.name,
        price: dish.price,
        quantity: item.quantity,
        notes: item.notes
      });
    }

    // 3. 创建订单
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        user_id: user.id,
        status: 'pending',
        total_amount: totalAmount,
        payment_status: 'unpaid',
        address
      }])
      .select()
      .single();

    if (orderError) throw orderError;

    // 4. 创建订单项目
    const orderItems = processedItems.map(item => ({
      order_id: order.id,
      ...item
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // 5. 减少库存
    for (const item of items) {
      const { data: dish } = await supabase
        .from('dishes')
        .select('inventory')
        .eq('id', item.dish_id)
        .single();

      if (dish) {
        await supabase
          .from('dishes')
          .update({ inventory: dish.inventory - item.quantity })
          .eq('id', item.dish_id);

        await supabase
          .from('inventory_history')
          .insert([{
            dish_id: item.dish_id,
            quantity_change: -item.quantity,
            reason: `订单 ${order.id} 消耗`
          }]);
      }
    }

    return order;
  },

  // 获取用户订单
  getUserOrders: async (): Promise<Order[]> => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // 获取订单详情
  getOrderDetails: async (orderId: string): Promise<{ order: Order; items: OrderItem[] }> => {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();
    
    if (orderError) throw orderError;
    
    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId);
    
    if (itemsError) throw itemsError;
    
    return { order, items: items || [] };
  },

  // 更新订单状态
  updateOrderStatus: async (orderId: string, status: string): Promise<Order> => {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 更新支付状态
  updatePaymentStatus: async (orderId: string, paymentStatus: string, paymentMethod?: string): Promise<Order> => {
    const { data, error } = await supabase
      .from('orders')
      .update({ payment_status: paymentStatus, payment_method: paymentMethod })
      .eq('id', orderId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 取消订单
  cancelOrder: async (orderId: string): Promise<Order> => {
    // 1. 获取订单项目
    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .select('dish_id, quantity')
      .eq('order_id', orderId);
    
    if (itemsError) throw itemsError;
    
    // 2. 恢复库存
    for (const item of items || []) {
      if (item.dish_id) {
        const { data: dish } = await supabase
          .from('dishes')
          .select('inventory')
          .eq('id', item.dish_id)
          .single();
        
        if (dish) {
          await supabase
            .from('dishes')
            .update({ inventory: dish.inventory + item.quantity })
            .eq('id', item.dish_id);

          await supabase
            .from('inventory_history')
            .insert([{
              dish_id: item.dish_id,
              quantity_change: item.quantity,
              reason: `订单 ${orderId} 取消退回`
            }]);
        }
      }
    }
    
    // 3. 更新订单状态
    const { data, error } = await supabase
      .from('orders')
      .update({ status: 'cancelled' })
      .eq('id', orderId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// 预订相关API
export const reservationApi = {
  // 创建预订
  createReservation: async (reservation: Omit<Reservation, 'id' | 'created_at' | 'updated_at' | 'status'>): Promise<Reservation> => {
    // 检查时间冲突
    const date = reservation.date;
    const time = reservation.time;
    const guests = reservation.guests;
    
    // 检查同一时间段内的预订人数总和，假设餐厅最多容纳50人
    const timeBuffer = 2; // 2小时缓冲期
    
    const timeAsDate = new Date(`1970-01-01T${time}`);
    const startTime = new Date(timeAsDate);
    startTime.setHours(timeAsDate.getHours() - timeBuffer);
    
    const endTime = new Date(timeAsDate);
    endTime.setHours(timeAsDate.getHours() + timeBuffer);
    
    const { data: existingReservations, error: checkError } = await supabase
      .from('reservations')
      .select('guests')
      .eq('date', date)
      .gte('time', startTime.toTimeString().substring(0, 8))
      .lte('time', endTime.toTimeString().substring(0, 8))
      .not('status', 'eq', 'canceled');
    
    if (checkError) throw checkError;
    
    const totalGuests = (existingReservations || []).reduce((sum, r) => sum + r.guests, 0) + guests;
    
    if (totalGuests > 50) {
      throw new Error('预定时间段已满，请选择其他时间');
    }
    
    // 创建预订
    const { data, error } = await supabase
      .from('reservations')
      .insert([{ ...reservation, status: 'pending' }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 获取用户预订
  getUserReservations: async (): Promise<Reservation[]> => {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .order('date', { ascending: true })
      .order('time', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  // 获取预订详情
  getReservation: async (id: string): Promise<Reservation> => {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // 更新预订
  updateReservation: async (id: string, updates: Partial<Omit<Reservation, 'id' | 'created_at' | 'updated_at'>>): Promise<Reservation> => {
    // 如果更新日期或时间，需要重新检查冲突
    if (updates.date || updates.time || updates.guests) {
      const { data: currentReservation } = await supabase
        .from('reservations')
        .select('*')
        .eq('id', id)
        .single();
      
      if (currentReservation) {
        const date = updates.date || currentReservation.date;
        const time = updates.time || currentReservation.time;
        const guests = updates.guests || currentReservation.guests;
        
        // 检查同样的冲突逻辑
        const timeAsDate = new Date(`1970-01-01T${time}`);
        const timeBuffer = 2;
        
        const startTime = new Date(timeAsDate);
        startTime.setHours(timeAsDate.getHours() - timeBuffer);
        
        const endTime = new Date(timeAsDate);
        endTime.setHours(timeAsDate.getHours() + timeBuffer);
        
        const { data: existingReservations, error: checkError } = await supabase
          .from('reservations')
          .select('guests')
          .eq('date', date)
          .gte('time', startTime.toTimeString().substring(0, 8))
          .lte('time', endTime.toTimeString().substring(0, 8))
          .not('id', 'eq', id)
          .not('status', 'eq', 'canceled');
        
        if (checkError) throw checkError;
        
        const totalGuests = (existingReservations || []).reduce((sum, r) => sum + r.guests, 0) + guests;
        
        if (totalGuests > 50) {
          throw new Error('预定时间段已满，请选择其他时间');
        }
      }
    }
    
    const { data, error } = await supabase
      .from('reservations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 取消预订
  cancelReservation: async (id: string): Promise<Reservation> => {
    const { data, error } = await supabase
      .from('reservations')
      .update({ status: 'canceled' })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 管理员: 获取所有预订
  getAllReservations: async (startDate?: string, endDate?: string): Promise<Reservation[]> => {
    let query = supabase.from('reservations').select('*');
    
    if (startDate) {
      query = query.gte('date', startDate);
    }
    
    if (endDate) {
      query = query.lte('date', endDate);
    }
    
    query = query.order('date').order('time');
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data || [];
  },

  // 管理员: 确认预订
  confirmReservation: async (id: string): Promise<Reservation> => {
    const { data, error } = await supabase
      .from('reservations')
      .update({ status: 'confirmed' })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// 支付相关API
export const paymentApi = {
  // 创建支付记录
  createPayment: async (orderId: string, amount: number, method: string): Promise<Payment> => {
    const { data, error } = await supabase
      .from('payments')
      .insert([{
        order_id: orderId,
        amount,
        payment_method: method,
        status: 'pending'
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 更新支付状态
  updatePaymentStatus: async (paymentId: string, status: string, paymentExternalId?: string): Promise<Payment> => {
    const updateData: any = { status };
    
    if (paymentExternalId) {
      updateData.payment_id = paymentExternalId;
    }
    
    const { data, error } = await supabase
      .from('payments')
      .update(updateData)
      .eq('id', paymentId)
      .select()
      .single();
    
    if (error) throw error;
    
    // 如果支付成功，更新订单支付状态
    if (status === 'completed') {
      const { data: payment } = await supabase
        .from('payments')
        .select('order_id')
        .eq('id', paymentId)
        .single();
      
      if (payment) {
        await supabase
          .from('orders')
          .update({ payment_status: 'paid' })
          .eq('id', payment.order_id);
      }
    }
    
    return data;
  },

  // 获取订单的支付记录
  getOrderPayments: async (orderId: string): Promise<Payment[]> => {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('order_id', orderId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }
};

// 统计分析API
export const analyticsApi = {
  // 获取销售统计
  getSalesStats: async (startDate?: string, endDate?: string): Promise<any> => {
    const now = new Date();
    const defaultEndDate = now.toISOString().split('T')[0];
    const defaultStartDate = new Date(now.setMonth(now.getMonth() - 1)).toISOString().split('T')[0];
    
    let query = supabase.from('orders')
      .select(`
        id,
        total_amount,
        status,
        payment_status,
        created_at,
        order_items (
          dish_id,
          dish_name,
          quantity
        )
      `)
      .eq('payment_status', 'paid');
    
    if (startDate || defaultStartDate) {
      query = query.gte('created_at', startDate || defaultStartDate);
    }
    
    if (endDate || defaultEndDate) {
      const endDateTime = `${endDate || defaultEndDate}T23:59:59`;
      query = query.lte('created_at', endDateTime);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    // 处理数据以生成统计信息
    const stats = {
      totalSales: 0,
      orderCount: 0,
      averageOrderValue: 0,
      popularDishes: {} as Record<string, number>,
      dailySales: {} as Record<string, number>
    };
    
    if (data && data.length > 0) {
      stats.orderCount = data.length;
      stats.totalSales = data.reduce((sum, order) => sum + Number(order.total_amount), 0);
      stats.averageOrderValue = stats.totalSales / stats.orderCount;
      
      // 热门菜品统计
      data.forEach(order => {
        if (order.order_items && order.order_items.length > 0) {
          order.order_items.forEach((item: any) => {
            if (!stats.popularDishes[item.dish_name]) {
              stats.popularDishes[item.dish_name] = 0;
            }
            stats.popularDishes[item.dish_name] += item.quantity;
          });
        }
        
        // 每日销售统计
        const date = new Date(order.created_at).toISOString().split('T')[0];
        if (!stats.dailySales[date]) {
          stats.dailySales[date] = 0;
        }
        stats.dailySales[date] += Number(order.total_amount);
      });
    }
    
    return stats;
  },

  // 获取预订统计
  getReservationStats: async (startDate?: string, endDate?: string): Promise<any> => {
    const now = new Date();
    const defaultEndDate = new Date(now.setMonth(now.getMonth() + 1)).toISOString().split('T')[0];
    const defaultStartDate = now.toISOString().split('T')[0];
    
    let query = supabase.from('reservations').select('*');
    
    if (startDate || defaultStartDate) {
      query = query.gte('date', startDate || defaultStartDate);
    }
    
    if (endDate || defaultEndDate) {
      query = query.lte('date', endDate || defaultEndDate);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    // 处理数据以生成统计信息
    const stats = {
      totalReservations: 0,
      confirmedReservations: 0,
      pendingReservations: 0,
      canceledReservations: 0,
      totalGuests: 0,
      dailyReservations: {} as Record<string, number>,
      hourlyDistribution: {} as Record<string, number>
    };
    
    if (data && data.length > 0) {
      stats.totalReservations = data.length;
      stats.totalGuests = data.reduce((sum, res) => sum + res.guests, 0);
      stats.confirmedReservations = data.filter(res => res.status === 'confirmed').length;
      stats.pendingReservations = data.filter(res => res.status === 'pending').length;
      stats.canceledReservations = data.filter(res => res.status === 'canceled').length;
      
      // 每日预订统计
      data.forEach(res => {
        if (!stats.dailyReservations[res.date]) {
          stats.dailyReservations[res.date] = 0;
        }
        if (res.status !== 'canceled') {
          stats.dailyReservations[res.date] += 1;
        }
        
        // 时间分布统计
        const hour = res.time.split(':')[0];
        if (!stats.hourlyDistribution[hour]) {
          stats.hourlyDistribution[hour] = 0;
        }
        if (res.status !== 'canceled') {
          stats.hourlyDistribution[hour] += 1;
        }
      });
    }
    
    return stats;
  },

  // 获取库存统计
  getInventoryStats: async (): Promise<any> => {
    const { data, error } = await supabase
      .from('dishes')
      .select('id, name, inventory, is_available');
    
    if (error) throw error;
    
    // 处理数据以生成统计信息
    const stats = {
      totalDishes: 0,
      availableDishes: 0,
      outOfStockDishes: 0,
      lowInventoryDishes: [],
      inventoryDistribution: [] as Array<{ name: string; inventory: number }>
    };
    
    if (data && data.length > 0) {
      stats.totalDishes = data.length;
      stats.availableDishes = data.filter(dish => dish.is_available).length;
      
      const outOfStock = data.filter(dish => dish.inventory <= 0);
      stats.outOfStockDishes = outOfStock.length;
      
      const lowInventory = data.filter(dish => dish.inventory > 0 && dish.inventory <= 5);
      stats.lowInventoryDishes = lowInventory.map(dish => ({ id: dish.id, name: dish.name, inventory: dish.inventory }));
      
      stats.inventoryDistribution = data.map(dish => ({
        name: dish.name,
        inventory: dish.inventory
      }));
    }
    
    return stats;
  }
};
