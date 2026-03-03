import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
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

  const produto = await prisma.produto.create({
    data: {
      nome,
      caracteristicasGerais
    }
  });

  const desejos = await prisma.listaDesejos.findMany({
    where: {
      itemDesejado: {
        equals: nome,
        mode: 'insensitive'
      }
    },
    include: {
      cliente: true
    }
  });

  const notificationsResult = await Promise.allSettled(
    desejos.map((wish: (typeof desejos)[number]) =>
      notifyItemInStock({
        email: wish.cliente.email,
        telefone: wish.cliente.telefone,
        nomeItem: wish.itemDesejado
      })
    )
  );

  const notificacoesComFalha = notificationsResult.filter(
    (notification: PromiseSettledResult<void>) => notification.status === 'rejected'
  ).length;

  return NextResponse.json({
    message: 'Item cadastrado no estoque com sucesso',
    data: {
      id: produto.id,
      nome: produto.nome,
      caracteristicas_gerais: produto.caracteristicasGerais,
      created_at: produto.createdAt
    },
    notificacoesDisparadas: desejos.length,
    notificacoesComFalha
  });
}
