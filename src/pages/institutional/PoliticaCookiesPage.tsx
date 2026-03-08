import { brand } from '@/config/brand';

export default function PoliticaCookiesPage() {
  return (
    <main className="py-12 md:py-20">
      <div className="container max-w-3xl">
        <div className="mb-10">
          <h1 className="font-display text-4xl font-bold mb-3">Política de Cookies</h1>
          <p className="text-muted-foreground">Última atualização: março de 2025</p>
        </div>

        <div className="space-y-8 text-foreground">
          <section>
            <h2 className="font-display text-2xl font-bold mb-3">O que são cookies?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você acessa nosso site. Eles nos ajudam a melhorar sua experiência de navegação, lembrar suas preferências e entender como você usa o site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">Tipos de cookies que utilizamos</h2>
            <div className="space-y-4">
              {[
                {
                  name: 'Cookies essenciais',
                  description: 'Necessários para o funcionamento básico do site, como manter o carrinho de compras ativo e processar pedidos. Não podem ser desativados.',
                  required: true,
                },
                {
                  name: 'Cookies de desempenho',
                  description: 'Coletamos informações sobre como os visitantes usam o site (páginas mais acessadas, mensagens de erro) para melhorar o desempenho. Não identificam o usuário.',
                  required: false,
                },
                {
                  name: 'Cookies de funcionalidade',
                  description: 'Lembram suas preferências (idioma, localização) para personalizar sua experiência.',
                  required: false,
                },
                {
                  name: 'Cookies de marketing',
                  description: 'Usados para exibir anúncios relevantes dentro e fora do site. Requerem seu consentimento.',
                  required: false,
                },
              ].map((cookie) => (
                <div key={cookie.name} className="p-5 border border-border rounded-xl bg-card">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{cookie.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${cookie.required ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      {cookie.required ? 'Obrigatório' : 'Opcional'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{cookie.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-3">Como gerenciar cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Você pode controlar e/ou excluir cookies conforme desejar. Você pode excluir todos os cookies que já estão no seu computador e configurar a maioria dos navegadores para impedir sua colocação.
            </p>
            <div className="space-y-2">
              {[
                { browser: 'Google Chrome', link: 'https://support.google.com/chrome/answer/95647' },
                { browser: 'Mozilla Firefox', link: 'https://support.mozilla.org/pt-BR/kb/cookies-informacoes' },
                { browser: 'Safari', link: 'https://support.apple.com/pt-br/guide/safari/sfri11471/mac' },
                { browser: 'Microsoft Edge', link: 'https://support.microsoft.com/pt-br/microsoft-edge' },
              ].map((b) => (
                <div key={b.browser} className="flex items-center justify-between p-3 border border-border rounded-lg bg-card">
                  <span className="text-sm font-medium">{b.browser}</span>
                  <a href={b.link} target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline">
                    Ver instruções →
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-3">Cookies de terceiros</h2>
            <p className="text-muted-foreground leading-relaxed">
              Alguns dos nossos parceiros (Google Analytics, Facebook Pixel, etc.) podem definir cookies quando você visita nosso site. Esses cookies são regidos pelas políticas de privacidade de seus respectivos proprietários.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-3">Dúvidas</h2>
            <p className="text-muted-foreground leading-relaxed">
              Em caso de dúvidas sobre nossa política de cookies, entre em contato:{' '}
              <a href={`mailto:${brand.contact.email}`} className="text-primary hover:underline">{brand.contact.email}</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
