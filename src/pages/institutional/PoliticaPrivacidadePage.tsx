import { brand } from '@/config/brand';

export default function PoliticaPrivacidadePage() {
  return (
    <main className="py-12 md:py-20">
      <div className="container max-w-3xl">
        <div className="mb-10">
          <h1 className="font-display text-4xl font-bold mb-3">Política de Privacidade</h1>
          <p className="text-muted-foreground">Última atualização: março de 2025</p>
        </div>

        <div className="prose prose-sm max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="font-display text-2xl font-bold mb-3">1. Quem somos</h2>
            <p className="text-muted-foreground leading-relaxed">
              A <strong>{brand.legalName}</strong>, localizada em {brand.address.street}, {brand.address.number} — {brand.address.neighborhood}, {brand.address.city}/{brand.address.state}, é responsável pelo tratamento dos seus dados pessoais coletados por meio deste site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-3">2. Dados coletados</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">Coletamos os seguintes tipos de dados:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Dados de identificação:</strong> nome, e-mail, telefone, endereço</li>
              <li><strong>Dados de transação:</strong> produtos adquiridos, histórico de pedidos</li>
              <li><strong>Dados de navegação:</strong> cookies, IP, páginas visitadas</li>
              <li><strong>Dados de conta:</strong> login, preferências</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-3">3. Finalidade do tratamento</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">Utilizamos seus dados para:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Processar e entregar seus pedidos</li>
              <li>Enviar confirmações e atualizações de pedidos</li>
              <li>Comunicar promoções e novidades (somente com consentimento)</li>
              <li>Melhorar nossos produtos e serviços</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-3">4. Compartilhamento de dados</h2>
            <p className="text-muted-foreground leading-relaxed">
              Não vendemos seus dados pessoais a terceiros. Podemos compartilhar dados com parceiros de entrega, processadores de pagamento e serviços de tecnologia necessários ao funcionamento da plataforma, sempre sob contratos de confidencialidade.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-3">5. Seus direitos (LGPD)</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">Conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Confirmar a existência de tratamento dos seus dados</li>
              <li>Acessar seus dados</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Solicitar exclusão dos dados</li>
              <li>Revogar consentimento a qualquer momento</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-3">6. Retenção de dados</h2>
            <p className="text-muted-foreground leading-relaxed">
              Mantemos seus dados pelo tempo necessário para a prestação dos serviços e cumprimento das obrigações legais, geralmente por até 5 anos após o último pedido.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-3">7. Segurança</h2>
            <p className="text-muted-foreground leading-relaxed">
              Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, perda ou destruição. Utilizamos criptografia SSL em todas as transações.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-3">8. Contato</h2>
            <p className="text-muted-foreground leading-relaxed">
              Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:{' '}
              <a href={`mailto:${brand.contact.email}`} className="text-primary hover:underline">{brand.contact.email}</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
