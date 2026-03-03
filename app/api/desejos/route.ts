import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
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

  const cliente = await prisma.cliente.upsert({
    where: { email },
    update: { telefone },
    create: { email, telefone }
  });

  const desejo = await prisma.listaDesejos.create({
    data: {
      itemDesejado,
      clienteId: cliente.id
    }
  });

  return NextResponse.json({
    message: 'Desejo cadastrado com sucesso',
    data: {
      id: desejo.id,
      email: cliente.email,
      telefone: cliente.telefone,
      item_desejado: desejo.itemDesejado,
      created_at: desejo.createdAt
    }
  });
}
