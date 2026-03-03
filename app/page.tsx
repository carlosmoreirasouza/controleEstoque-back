export default function HomePage() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>API de Controle de Estoque</h1>
      <p>Use os endpoints:</p>
      <ul>
        <li>POST /api/desejos</li>
        <li>POST /api/estoque</li>
        <li>GET /api/health</li>
      </ul>
    </main>
  );
}
