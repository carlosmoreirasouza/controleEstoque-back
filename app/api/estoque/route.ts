import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { notifyItemInStock } from '@/lib/notification';
import { estoqueSchema } from '@/lib/validation';

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = estoqueSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Dados inválidos', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { nome, caracteristicasGerais } = parsed.data;

  const productResult = await pool.query(
    `
      INSERT INTO estoque (nome, caracteristicas_gerais)
      VALUES ($1, $2)
      RETURNING id, nome, caracteristicas_gerais, created_at
    `,
    [nome, caracteristicasGerais]
  );

  const wishesResult = await pool.query(
    `
      SELECT email, telefone, item_desejado
      FROM desejos
      WHERE LOWER(item_desejado) = LOWER($1)
    `,
    [nome]
  );

  const notificationsResult = await Promise.allSettled(
    wishesResult.rows.map((wish) =>
      notifyItemInStock({
        email: wish.email,
        telefone: wish.telefone,
        nomeItem: wish.item_desejado
      })
    )
  );

  const notificacoesComFalha = notificationsResult.filter(
    (notification) => notification.status === 'rejected'
  ).length;

  return NextResponse.json({
    message: 'Item cadastrado no estoque com sucesso',
    data: productResult.rows[0],
    notificacoesDisparadas: wishesResult.rowCount,
    notificacoesComFalha
  });
}
