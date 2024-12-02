'use server';

import { sendEmail } from '@/email-templates/email';
import OrderConfirmationEmail from '@/email-templates/order-confirmation';
import { render } from '@react-email/render';

export const sendOrderConfirmationEmail = async (data: { email: string }) => {
  const to = `John Doe<${data.email}>`;

  sendEmail({
    to: to,
    subject: 'Your Order is Confirmed! - Evely',
    html: render(OrderConfirmationEmail()) as unknown as string,
  });

  return true;
};
