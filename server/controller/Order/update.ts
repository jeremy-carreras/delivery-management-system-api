import Order from '../../db/tablas/Order';
import { sendWhatsApp } from '../../services/whatsapp';

const update = async (id, body: any) => {
  if (!id) throw new Error('El id es requerido.');
  const order = await Order.findByPk(id);
  if (!order) throw new Error('No se encontró una orden con ese id.');

  const allowed = ['user_id', 'customer_name', 'customer_phone', 'delivery_address', 'total', 'status', 'cancellation_reason', 'assigned_to'];
  const dataUpdate: any = {};
  allowed.forEach((field) => {
    if (body[field] !== undefined) dataUpdate[field] = body[field];
  });

  await Order.update(dataUpdate, { where: { id } });

  // Notify customer via WhatsApp when order goes out for delivery
  if (dataUpdate.status === 'En reparto') {
    const freshOrder = await Order.findByPk(id);
    if (freshOrder) {
      const phone = (freshOrder as any).customer_phone as string;
      const name  = (freshOrder as any).customer_name  as string;
      const msg =
        `🚚 ¡Hola ${name}! Tu pedido está *en camino*.\n` +
        `Tu repartidor ya salió y llegará pronto a tu dirección.\n\n` +
        `¡Gracias por tu pedido en FlashDrop! 🌟`;
      await sendWhatsApp(phone, msg);
    }
  }

  return { message: 'Orden actualizada correctamente.' };
};

export default update;
