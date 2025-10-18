import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-[#2D8CFF] to-[#00E676] bg-clip-text text-transparent leading-tight">
            Lucro diário no seu bolso com robô que opera sozinho
          </h1>
          <p className="mt-6 text-xl sm:text-2xl text-[#00E5FF] font-semibold">
            Instalamos, você assiste. Teste grátis por 7 dias.
          </p>
          <p className="mt-6 text-lg text-zinc-400 max-w-3xl mx-auto">
            Nosso robô SBOTS analisa o mercado e opera automaticamente, buscando lucros diários. 
            Mesmo sem experiência, você começa a ver resultados em até 48h.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signin/signup"
              className="inline-block px-8 py-4 text-lg font-bold text-black bg-gradient-to-r from-[#2D8CFF] to-[#00E676] rounded-full hover:shadow-[0_0_30px_rgba(0,230,118,0.5)] transition-all"
            >
              Quero Testar Agora
            </Link>
            <a
              href="https://wa.me/5551993808280?text=Quero%20testar%20o%20robô%20SBOTS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 text-lg font-bold text-white border-2 border-[#00E676] rounded-full hover:bg-[#00E676] hover:text-black transition-all"
            >
              💬 Falar no WhatsApp
            </a>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-zinc-900 border border-[#00E676]/20 rounded-2xl p-8 text-center">
            <h2 className="text-5xl font-black text-[#00E676]">R$537</h2>
            <p className="mt-4 text-zinc-400">Média de lucro nos primeiros 7 dias*</p>
          </div>
          <div className="bg-zinc-900 border border-[#00E676]/20 rounded-2xl p-8 text-center">
            <h2 className="text-5xl font-black text-[#00E676]">+90%</h2>
            <p className="mt-4 text-zinc-400">dos usuários têm retorno no 1º mês*</p>
          </div>
          <div className="bg-zinc-900 border border-[#00E676]/20 rounded-2xl p-8 text-center">
            <h2 className="text-5xl font-black text-[#00E676]">100%</h2>
            <p className="mt-4 text-zinc-400">automático e configurado por nós</p>
          </div>
        </div>
      </section>

      {/* CTA to Pricing */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Escolha Seu Plano
          </h2>
          <p className="text-lg text-zinc-400 mb-8">
            Selecione o robô ideal para começar a lucrar hoje
          </p>
          <Link
            href="/pricing"
            className="inline-block px-8 py-4 text-lg font-bold text-black bg-gradient-to-r from-[#2D8CFF] to-[#00E676] rounded-full hover:shadow-[0_0_30px_rgba(0,230,118,0.5)] transition-all"
          >
            Ver Planos e Preços
          </Link>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-zinc-900 border border-[#00E676]/20 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-[#00E676] mb-4">
            🔐 Garantia Dupla SBOTS™
          </h2>
          <p className="text-lg text-zinc-300">
            Teste nosso robô por 7 dias. Se não lucrar, devolvemos seu dinheiro + um bônus surpresa. 
            Sem letras miúdas. Sem enrolação.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center text-sm text-zinc-500 leading-relaxed">
          <p>
            <strong>*Aviso legal:</strong> Os resultados passados não garantem retorno futuro. 
            Os números apresentados são médias de usuários anteriores e podem variar conforme o mercado. 
            Não oferecemos garantia de lucro fixo. Operar no mercado financeiro envolve riscos. 
            Esta não é uma recomendação de investimento.
          </p>
        </div>
      </section>
    </div>
  );
}

