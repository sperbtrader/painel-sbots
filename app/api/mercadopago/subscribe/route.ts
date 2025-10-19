import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { checkoutWithMercadoPago } from '@/utils/mercadopago/server';

export async function POST(req: Request) {
  try {
    const { planId } = await req.json();
    const supabase = createClient(cookies());
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error || !user) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }
    const initPoint = await checkoutWithMercadoPago({ planId, user });
    return NextResponse.json({ init_point: initPoint });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erro ao criar sessão de pagamento Mercado Pago' }, { status: 500 });
  }
}
