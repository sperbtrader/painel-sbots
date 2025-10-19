import mercadopago from 'mercadopago';

// Configure Mercado Pago with your access token from environment variables
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
});

interface CheckoutParams {
  planId: string;
  user: {
    id: string;
    email: string | null;
  };
}

/**
 * Create a Mercado Pago preapproval subscription for a user.
 * Returns the init_point URL to redirect the user to the Mercado Pago checkout.
 */
export async function checkoutWithMercadoPago({ planId, user }: CheckoutParams): Promise<string> {
  if (!user?.email) {
    throw new Error('User email is required for Mercado Pago checkout');
  }

  const backUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/painel`;

  const response = await mercadopago.preapproval.create({
    preapproval_plan_id: planId,
    payer_email: user.email,
    back_url: backUrl,
  });

  const { init_point } = response.body as any;
  if (!init_point) {
    throw new Error('Failed to create Mercado Pago preapproval');
  }

  return init_point as string;
}
