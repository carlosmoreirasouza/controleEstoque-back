export const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Controle de Estoque API',
    version: '1.0.0',
    description: 'Documentação Swagger dos endpoints da API.'
  },
  servers: [
    {
      url: '/',
      description: 'Servidor atual'
    }
  ],
  tags: [
    { name: 'Saúde' },
    { name: 'Desejos' },
    { name: 'Estoque' }
  ],
  paths: {
    '/api/health': {
      get: {
        tags: ['Saúde'],
        summary: 'Verifica se a API está saudável',
        responses: {
          '200': {
            description: 'API disponível',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'ok' }
                  },
                  required: ['status']
                }
              }
            }
          }
        }
      }
    },
    '/api/desejos': {
      post: {
        tags: ['Desejos'],
        summary: 'Cadastra um desejo de item para um cliente',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', format: 'email', example: 'cliente@email.com' },
                  telefone: { type: 'string', example: '5511999999999' },
                  itemDesejado: { type: 'string', example: 'Notebook X' }
                },
                required: ['email', 'telefone', 'itemDesejado']
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Desejo cadastrado com sucesso'
          },
          '400': {
            description: 'Dados inválidos'
          }
        }
      }
    },
    '/api/estoque': {
      post: {
        tags: ['Estoque'],
        summary: 'Cadastra item em estoque e dispara notificações',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nome: { type: 'string', example: 'Notebook X' },
                  caracteristicasGerais: { type: 'string', example: '16GB RAM, SSD 512GB' }
                },
                required: ['nome', 'caracteristicasGerais']
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Item cadastrado no estoque com sucesso'
          },
          '400': {
            description: 'Dados inválidos'
          }
        }
      }
    }
  }
};
