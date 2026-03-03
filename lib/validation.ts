import { z } from 'zod';

export const desejoSchema = z.object({
  email: z.string().email(),
  telefone: z.string().min(8).max(30),
  itemDesejado: z.string().min(2).max(120)
});

export const estoqueSchema = z.object({
  nome: z.string().min(2).max(120),
  caracteristicasGerais: z.string().min(2).max(1000)
});

export type DesejoInput = z.infer<typeof desejoSchema>;
export type EstoqueInput = z.infer<typeof estoqueSchema>;
