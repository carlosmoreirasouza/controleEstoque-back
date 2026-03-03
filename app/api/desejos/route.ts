import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { desejoSchema } from '@/lib/validation';

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = desejoSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Dados inválidos', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { email, telefone, itemDesejado } = parsed.data;

  const result = await pool.query(
    `
      INSERT INTO desejos (email, telefone, item_desejado)
      VALUES ($1, $2, $3)
      RETURNING id, email, telefone, item_desejado, created_at
    `,
    [email, telefone, itemDesejado]
  );

  return NextResponse.json({
    message: 'Desejo cadastrado com sucesso',
    data: result.rows[0]
  });
}
