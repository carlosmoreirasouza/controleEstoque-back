import type { ReactNode } from 'react';

export const metadata = {
  title: 'Controle de Estoque API',
  description: 'API para controle de estoque e desejos',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
