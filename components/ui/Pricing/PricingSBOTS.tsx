// PricingSBOTS.tsx modificado para usar Mercado Pago

'use client';

import Button from '@/components/ui/Button';
import type { Tables } from '@/types_db';
import { User } from '@supabase/supabase-js';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

type Subscription = Tables<'subscriptions'>;
type Price = Tables<'prices'>;
type Product = Tables<'products'>;

interface PriceWithProduct extends Price {
  products: Product | null;
}

interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  user: User | null | undefined;
  subscription: SubscriptionWithProduct | null;
}

// Definição dos 4 planos SBOTS com os IDs dos planos do Mercado Pago
const SBOTS_PLANS = [
  {
    id: 'alfa-1-mini',
    name: 'AlfaSharksFlow (1 MINI)',
    description: 'Acesso AlfaSharksFlow limitado a 1 mini-contrato.',
    price: 'R$ 297',
    planId: '', // TODO: substituir pelo ID do plano do Mercado Pago
    features: [
      'Acesso por 1 mês',
      '1 robô AlfaSharksFlow',
      'Limitado a 1 mini-contrato',
      'Suporte básico'
    ],
    recommended: false
  },
  {
    id: 'shark-scalping',
    name: 'SharkScalping',
    description: 'Robô operacional Scalper para WINFUT.',
    price: 'R$ 497',
    planId: '', // TODO: substituir pelo ID do plano do Mercado Pago
    features: [
      'Acesso por 1 mês',
      '1 robô SharkScalping',
      'Operação WINFUT',
      'Atualizações inclusas'
    ],
    recommended: false
  },
  {
    id: 'sbots-alfa',
    name: 'SBOTS AlfaSharksFlow',
    description: 'Robô operacional conservador para Mini Índice Futuro.',
    price: 'R$ 497',
    planId: '', // TODO: substituir pelo ID do plano do Mercado Pago
    features: [
      'Acesso por 1 mês',
      '1 robô AlfaSharksFlow',
      'Operação conservadora',
      'Mini Índice Futuro'
    ],
    recommended: false
  },
  {
    id: 'combo-flow-scalping',
    name: 'Combo SBOTS FlowScalping',
    description:
      'AlfaSharksFlow WINFUT + AlfaSharkScalping WINFUT + Acesso a todos os modelos de teste limitados a 1 mini-contrato + SUPORTE EXCLUSIVO.',
    price: 'R$ 997',
    planId: '', // TODO: substituir pelo ID do plano do Mercado Pago
    features: [
      'Acesso por 1 mês',
      'AlfaSharksFlow WINFUT',
      'AlfaSharkScalping WINFUT',
      'Todos os modelos de teste',
      'Limitado a 1 mini-contrato',
      'Suporte exclusivo'
    ],
    recommended: true
  }
];

export default function PricingSBOTS({ user, subscription }: Props) {
  const router = useRouter();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const currentPath = usePathname();

  // Função para processar checkout com Mercado Pago
  const handleMercadoPagoCheckout = async (planId: string) => {
    setPriceIdLoading(planId);

    if (!user) {
      setPriceIdLoading(undefined);
      return router.push('/signin/signup');
    }

    try {
      const response = await fetch('/api/mercadopago/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId })
      });

      if (!response.ok) {
        throw new Error('Erro ao criar assinatura.');
      }

      const data = await response.json();
      const { init_point } = data;

      if (init_point) {
        window.location.href = init_point;
      } else {
        throw new Error('Não foi possível obter o link de pagamento.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6">
            Escolha Seu Robô SBOTS
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Selecione o plano ideal para começar a operar automaticamente no mercado futuro
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {SBOTS_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-zinc-900 rounded-2xl p-8 border-2 ${
                plan.recommended
                  ? 'border-[#00E676] shadow-[0_0_30px_rgba(0,230,118,0.3)]'
                  : 'border-zinc-800'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[#2D8CFF] to-[#00E676] text-black text-sm font-bold px-4 py-1 rounded-full">
                    RECOMENDADO
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-zinc-400 min-h-[60px]">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-black bg-gradient-to-r from-[#2D8CFF] to-[#00E5FF] bg-clip-text text-transparent">
                  {plan.price}
                </div>
                <div className="text-sm text-zinc-500 mt-1">por mês</div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm text-zinc-300">
                    <span className="text-[#00E676] mr-2 font-bold">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="slim"
                type="button"
                loading={priceIdLoading === plan.planId}
                onClick={() => handleMercadoPagoCheckout(plan.planId)}
                className={`w-full py-3 rounded-full font-bold transition-all ${
                  plan.recommended
                    ? 'bg-gradient-to-r from-[#2D8CFF] to-[#00E676] text-black hover:shadow-[0_0_20px_rgba(0,230,118,0.5)]'
                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                }`}
                disabled={!!subscription}
              >
                {subscription ? 'Gerenciar' : 'Assinar Agora'}
              </Button>
            </div>
          ))}
        </div>

        {/* Guarantee Section */}
        <div className="bg-zinc-900 border border-[#00E676]/20 rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-[#00E676] mb-4">Garantia Dupla SBOTS™</h2>
          <p className="text-lg text-zinc-300">
            Teste nosso robô por 7 dias. Se não lucrar, devolvemos seu dinheiro + um bônus surpresa.
            Sem letras miúdas. Sem enrolação.
          </p>
        </div>

        {/* WhatsApp CTA */}
        <div className="text-center">
          <p className="text-zinc-400 mb-4">Tem dúvidas? Fale com nosso time!</p>
          <a
            href="https://wa.me/5551993808280?text=Quero%20saber%20mais%20sobre%20os%20robôs%20SBOTS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 text-lg font-bold text-white border-2 border-[#00E676] rounded-full hover:bg-[#00E676] hover:text-black transition-all"
          >
            Falar no WhatsApp
          </a>
        </div>

        {/* Disclaimer */}
        <div className="mt-16 text-center text-sm text-zinc-500 leading-relaxed max-w-4xl mx-auto">
          <p>
            <strong>*Aviso legal:</strong> Os resultados passados não garantem retorno futuro. Os
            números apresentados são médias de usuários anteriores e podem variar conforme o mercado.
            Não oferecemos garantia de lucro fixo. Operar no mercado financeiro envolve riscos. Esta
            não é uma recomendação de investimento.
          </p>
        </div>
      </section>
    </div>
  );
}