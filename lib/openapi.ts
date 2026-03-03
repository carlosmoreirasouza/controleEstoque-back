export const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Controle de Estoque API',
    version: '1.1.0',
    description:
      'Documentação Swagger dos endpoints para cadastro de desejos, estoque e consulta de saúde da API.'
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
    { name: 'Estoque' },
    { name: 'Documentação' }
  ],
  components: {
    schemas: {
      HealthResponse: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'ok' }
        },
        required: ['status']
      },
      DesejoRequest: {
        type: 'object',
        properties: {
          email: { type: 'string', format: 'email', example: 'cliente@email.com' },
          telefone: { type: 'string', example: '5511999999999' },
          itemDesejado: { type: 'string', example: 'Notebook X' }
        },
        required: ['email', 'telefone', 'itemDesejado']
      },
      DesejoResponse: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Desejo cadastrado com sucesso' },
          data: {
            type: 'object',
            properties: {
              id: { type: 'string', example: 'clx123abc0000xyz' },
              email: { type: 'string', format: 'email', example: 'cliente@email.com' },
              telefone: { type: 'string', example: '5511999999999' },
              item_desejado: { type: 'string', example: 'Notebook X' },
              created_at: { type: 'string', format: 'date-time' }
            },
            required: ['id', 'email', 'telefone', 'item_desejado', 'created_at']
          }
        },
        required: ['message', 'data']
      },
      EstoqueRequest: {
        type: 'object',
        properties: {
          nome: { type: 'string', example: 'Notebook X' },
          caracteristicasGerais: { type: 'string', example: '16GB RAM, SSD 512GB' }
        },
        required: ['nome', 'caracteristicasGerais']
      },
      EstoqueResponse: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Item cadastrado no estoque com sucesso' },
          data: {
            type: 'object',
            properties: {
              id: { type: 'string', example: 'clx123abc0000xyz' },
              nome: { type: 'string', example: 'Notebook X' },
              caracteristicas_gerais: { type: 'string', example: '16GB RAM, SSD 512GB' },
              created_at: { type: 'string', format: 'date-time' }
            },
            required: ['id', 'nome', 'caracteristicas_gerais', 'created_at']
          },
          notificacoesDisparadas: { type: 'number', example: 2 },
          notificacoesComFalha: { type: 'number', example: 0 }
        },
        required: ['message', 'data', 'notificacoesDisparadas', 'notificacoesComFalha']
      },
      ValidationError: {
        type: 'object',
        properties: {
          error: { type: 'string', example: 'Dados inválidos' },
          details: {
            type: 'object',
            additionalProperties: true,
            example: {
              fieldErrors: {
                email: ['Email inválido']
              }
            }
          }
        },
        required: ['error', 'details']
      }
    }
  },
  paths: {
    '/api/health': {
      get: {
        tags: ['Saúde'],
        summary: 'Verifica se a API está saudável',
        operationId: 'getHealth',
        responses: {
          '200': {
            description: 'API disponível',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/HealthResponse'
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
        operationId: 'createDesejo',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/DesejoRequest'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Desejo cadastrado com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DesejoResponse'
                }
              }
            }
          },
          '400': {
            description: 'Dados inválidos',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ValidationError'
                }
              }
            }
          }
        }
      }
    },
    '/api/estoque': {
      post: {
        tags: ['Estoque'],
        summary: 'Cadastra item em estoque e dispara notificações',
        operationId: 'createEstoque',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/EstoqueRequest'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Item cadastrado no estoque com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/EstoqueResponse'
                }
              }
            }
          },
          '400': {
            description: 'Dados inválidos',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ValidationError'
                }
              }
            }
          }
        }
      }
    },
    '/api/openapi': {
      get: {
        tags: ['Documentação'],
        summary: 'Retorna o documento OpenAPI em JSON',
        operationId: 'getOpenApiSpec',
        responses: {
          '200': {
            description: 'Especificação OpenAPI',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  additionalProperties: true
                }
              }
            }
          }
        }
      }
    },
    '/api/docs': {
      get: {
        tags: ['Documentação'],
        summary: 'Retorna a interface Swagger UI',
        operationId: 'getSwaggerUi',
        responses: {
          '200': {
            description: 'Página HTML com Swagger UI',
            content: {
              'text/html': {
                schema: {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    }
  }
} as const;
