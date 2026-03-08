import { brand } from '@/config/brand';

export default function TermosCondicoesPage() {
  return (
    <main className="py-12 md:py-20">
      <div className="container max-w-3xl">
        <div className="mb-10">
          <h1 className="font-display text-4xl font-bold mb-3">Termos e Condições</h1>
          <p className="text-muted-foreground">Última atualização: março de 2025</p>
        </div>

        <div className="space-y-8 text-foreground">
          <section>
            <h2 className="font-display text-2xl font-bold mb-3">1. Aceitação dos termos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Ao utilizar o site da {brand.legalName}, você concorda com estes Termos e Condições. Se não concordar, por favor, não utilize nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-3">2. Sobre a empresa</h2>
            <p className="text-muted-foreground leading-relaxed">
              {brand.legalName} é uma floricultura localizada em {brand.address.city}/{brand.address.state}, especializada na venda e entrega de flores, cestas, chocolates e presentes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-3">3. Produtos e disponibilidade</h2>
            <p className="text-muted-foreground leading-relaxed">
              Todos os produtos estão sujeitos à disponibilidade de estoque. As imagens são meramente ilustrativas; variações sazonais podem ocorrer nos arranjos. Reservamo-nos o direito de substituir flores por espécies similares em caso de indisponibilidade, mantendo o padrão de qualidade.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-3">4. Pedidos e pagamento</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Pedidos são confirmados após a confirmação do pagamento</li>
              <li>Aceitamos PIX, cartão de crédito e débito</li>
              <li>Preços incluem impostos mas não incluem frete, calculado no checkout</li>
              <li>O pedido pode ser cancelado antes do início do preparo, sem custo</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-3">5. Entrega</h2>
            <p className="text-muted-foreground leading-relaxed">
              A entrega é realizada conforme janelas disponíveis no checkout. Pedidos realizados até às 15h são elegíveis para entrega no mesmo dia. Atrasos causados por fatores externos (trânsito, clima, etc.) não implicam em devolução.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-3">6. Política de trocas e devoluções</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Devido à natureza perecível dos produtos:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Problemas devem ser reportados em até 24h após o recebimento</li>
              <li>Em caso de produto danificado, substituímos ou reembolsamos</li>
              <li>Envie foto do problema para {brand.contact.email} ou WhatsApp</li>
              <li>Não realizamos trocas por preferência pessoal após o preparo</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-3">7. Propriedade intelectual</h2>
            <p className="text-muted-foreground leading-relaxed">
              Todo o conteúdo deste site (imagens, textos, logotipos) é propriedade da {brand.legalName} ou de seus licenciantes. É proibida a reprodução sem autorização prévia por escrito.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-3">8. Limitação de responsabilidade</h2>
            <p className="text-muted-foreground leading-relaxed">
              Não nos responsabilizamos por danos indiretos, perda de dados ou outros prejuízos decorrentes do uso do site, exceto nos casos previstos pelo Código de Defesa do Consumidor.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-3">9. Lei aplicável</h2>
            <p className="text-muted-foreground leading-relaxed">
              Estes termos são regidos pelas leis brasileiras. Fica eleito o foro da comarca de Araguaína/TO para dirimir quaisquer controvérsias.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-3">10. Contato</h2>
            <p className="text-muted-foreground leading-relaxed">
              Dúvidas:{' '}
              <a href={`mailto:${brand.contact.email}`} className="text-primary hover:underline">{brand.contact.email}</a>
              {' '}ou WhatsApp: {brand.contact.whatsapp.numberDisplay}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
