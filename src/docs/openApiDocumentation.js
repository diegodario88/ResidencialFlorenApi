module.exports = {
  openapi: '3.0.1',
  info: {
    version: '1.3.0',
    title: 'Florence - Api',
    description: 'Fornece informações sobre as farmácias de plantão',
    mainRoute: '/api/v2/oncalls/today',
    contact: {
      name: 'Diego Dario',
      email: 'diegodario88@gmail.com',
      url: 'https://github.com/diegodario88',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  host: 'https://floren-api.appspot.com/',
  basePath: '/api/v2',
  servers: [
    {
      url: 'http://localhost:1337',
      description: 'Local testing server',
    },
    {
      url: 'https://floren-api.appspot.com/',
      description: 'Production server',
    },
  ],
  tags: [
    {
      name: 'pharmacy',
      description: 'Everything about pharmacies',
      externalDocs: {
        description: 'Find out more',
        url: 'http://floren.app',
      },
    },
    {
      name: 'oncall',
      description: 'Access to oncall groups',
    },
  ],
  schemes: [
    'https',
    'http',
  ],
  paths: {
    '/api/v2/pharmacies': {
      post: {
        tags: [
          'pharmacy',
        ],
        summary: 'Add a new pharmacy to the list',
        description: '',
        operationId: 'store',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Pharmacy object that needs to be added to the list',
            required: true,
            schema: {
              $ref: '#/definitions/Pharmacy',
            },
          },
        ],
        responses: {
          405: {
            description: 'Invalid input',
          },
        },
        security: [
          {
            pharmastore_auth: [
              'write:pharma',
              'read:pharma',
            ],
          },
        ],
      },
      put: {
        tags: [
          'pharmacy',
        ],
        summary: 'Update an existing pharmacy',
        description: '',
        operationId: 'update',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Pharmacy object that needs to be added to the list',
            required: true,
            schema: {
              $ref: '#/definitions/Pharmacy',
            },
          },
        ],
        responses: {
          400: {
            description: 'Invalid ID supplied',
          },
          404: {
            description: 'Pharmacy not found',
          },
          405: {
            description: 'Validation exception',
          },
        },
        security: [
          {
            pharmastore_auth: [
              'write:pharma',
              'read:pharma',
            ],
          },
        ],
      },
      get: {
        tags: [
          'pharmacy',
        ],
        summary: 'gets all existing pharmacy',
        description: '',
        operationId: 'getAll',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        responses: {
          404: {
            description: 'Pharmacy not found',
          },
          405: {
            description: 'Request exception',
          },
        },
      },
    },
    '/api/v2/pharmacies/{pharmaId}': {
      get: {
        tags: [
          'pharmacy',
        ],
        summary: 'Find pharmacy by ID',
        description: 'Returns a single pharmacy',
        operationId: 'getOne',
        produces: [
          'application/json',
        ],
        parameters: [
          {
            name: 'pharmaId',
            in: 'path',
            description: 'ID of pharmacy to return',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              $ref: '#/definitions/Pharmacy',
            },
          },
          400: {
            description: 'Invalid ID supplied',
          },
          404: {
            description: 'Pharmacy not found',
          },
        },
        security: [
          {
            api_key: [],
          },
        ],
      },
      delete: {
        tags: [
          'pharmacy',
        ],
        summary: 'Deletes a pharmacy',
        description: '',
        operationId: 'destroy',
        produces: [
          'application/json',
        ],
        parameters: [
          {
            name: 'api_key',
            in: 'header',
            required: true,
            type: 'string',
          },
          {
            name: 'pharmaId',
            in: 'path',
            description: 'Pharmacy id to delete',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          400: {
            description: 'Invalid ID supplied',
          },
          404: {
            description: 'Pharmacy not found',
          },
        },
        security: [
          {
            petstore_auth: [
              'write:pharma',
              'read:pharma',
            ],
          },
        ],
      },
    },
    '/api/v2/pharmacies/pharma/:name': {
      get: {
        tags: [
          'pharmacy',
        ],
        summary: 'Find pharmacy by ID',
        description: 'Returns a single pharmacy',
        operationId: 'getOne',
        consumes: [
          'multipart/form-data',
        ],
        produces: [
          'application/json',
        ],
        parameters: [
          {
            name: 'pharmaId',
            in: 'path',
            description: 'ID of pharmacy to return',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              $ref: '#/definitions/ApiResponse',
            },
          },
        },
        security: [
          {
            petstore_auth: [
              'write:pets',
              'read:pets',
            ],
          },
        ],
      },
    },
    '/api/v2/oncalls': {
      post: {
        tags: [
          'oncall',
        ],
        summary: 'Create oncall group',
        description: 'This can only be done by the logged in user.',
        operationId: 'create',
        produces: [
          'application/json',
        ],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Created oncall object',
            required: true,
            schema: {
              $ref: '#/definitions/Oncall',
            },
          },
        ],
        responses: {
          default: {
            description: 'successful operation',
          },
        },
      },
      put: {
        tags: [
          'oncall',
        ],
        summary: 'Update an existing oncall',
        description: '',
        operationId: 'update',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Oncall object that needs to be added to the list',
            required: true,
            schema: {
              $ref: '#/definitions/Oncall',
            },
          },
        ],
        responses: {
          400: {
            description: 'Invalid ID supplied',
          },
          404: {
            description: 'Oncall not found',
          },
          405: {
            description: 'Validation exception',
          },
        },
        security: [
          {
            pharmastore_auth: [
              'write:oncall',
              'read:oncall',
            ],
          },
        ],
      },
      get: {
        tags: [
          'oncall',
        ],
        summary: 'gets all existing oncall',
        description: '',
        operationId: 'getAll',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        responses: {
          404: {
            description: 'Oncall not found',
          },
          405: {
            description: 'Request exception',
          },
        },
      },
    },
    '/api/v2/oncalls/{oncallId}': {
      get: {
        tags: [
          'oncall',
        ],
        summary: 'Find oncall by ID',
        description: 'Returns a single oncall',
        operationId: 'getOne',
        produces: [
          'application/json',
        ],
        parameters: [
          {
            name: 'oncallId',
            in: 'path',
            description: 'ID of oncall to return',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              $ref: '#/definitions/Oncall',
            },
          },
          400: {
            description: 'Invalid ID supplied',
          },
          404: {
            description: 'Oncall not found',
          },
        },
        security: [
          {
            api_key: [],
          },
        ],
      },
      delete: {
        tags: [
          'oncall',
        ],
        summary: 'Deletes a group',
        description: '',
        operationId: 'destroy',
        produces: [
          'application/json',
        ],
        parameters: [
          {
            name: 'api_key',
            in: 'header',
            required: true,
            type: 'string',
          },
          {
            name: 'oncallId',
            in: 'path',
            description: 'Oncall id to delete',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          400: {
            description: 'Invalid ID supplied',
          },
          404: {
            description: 'Oncall not found',
          },
        },
        security: [
          {
            petstore_auth: [
              'write:oncall',
              'read:oncall',
            ],
          },
        ],
      },
    },
    '/api/v2/oncalls/oncall/:name': {
      get: {
        tags: [
          'oncall',
        ],
        summary: 'Find oncall by name',
        description: 'Returns a single oncall',
        operationId: 'getOne',
        consumes: [
          'multipart/form-data',
        ],
        produces: [
          'application/json',
        ],
        parameters: [
          {
            name: 'oncallName',
            in: 'path',
            description: 'Name of oncall group to return',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              $ref: '#/definitions/ApiResponse',
            },
          },
        },
        security: [
          {
            petstore_auth: [
              'write:oncall',
              'read:oncall',
            ],
          },
        ],
      },
    },
    '/api/v2/oncalls/today': {
      get: {
        tags: [
          'oncall',
        ],
        summary: 'get current oncall group',
        description: '',
        operationId: 'getCurrent',
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              type: 'string',
            },
            headers: {
              'X-Rate-Limit': {
                type: 'integer',
                format: 'int32',
                description: 'calls per hour allowed by the user',
              },
              'X-Expires-After': {
                type: 'string',
                format: 'date-time',
                description: 'date in UTC when token expires',
              },
            },
          },
          400: {
            description: 'Invalid username/password supplied',
          },
        },
      },
    },
    '/api/v2/oncalls/future': {
      post: {
        tags: [
          'oncall',
        ],
        summary: 'Create a calendar of oncall group based on period dates',
        description: 'This can be done by all users.',
        operationId: 'future',
        produces: [
          'application/json',
        ],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Created oncall calendar with future date',
            required: true,
            schema: {
              $ref: '#/definitions/Period',
            },
          },
        ],
        responses: {
          default: {
            description: 'successful operation',
          },
        },
        security: [
          {
            pharmastore_auth: [
              'write:pharmacy',
              'read:pharmacy',
            ],
          },
        ],
      },
    },
  },
  securityDefinitions: {
    pharmastore_auth: {
      type: 'oauth2',
      authorizationUrl: 'http://floren.app',
      flow: 'implicit',
      scopes: {
        'write:pharmacy': 'modify info in your account',
        'read:pharmacy': 'read your info',
      },
    },
    api_key: {
      type: 'apiKey',
      name: 'api_key',
      in: 'header',
    },
  },
  definitions: {
    Oncall: {
      type: 'object',
      required: [
        'pharmacies',
      ],
      properties: {
        id: {
          type: 'object',
          example: 'objectId(5eb80deb079d6510a3f68d8a)',
        },
        number: {
          type: 'int',
          example: '13',
        },
        name: {
          type: 'string',
          example: 'G13',
        },
        pharmacies: {
          type: 'objectId',
          $ref: '#/definitions/Pharmacy',
        },
        weekday: {
          type: 'object',
          example: {
            status: 'boolean',
            date: 'date-time',
          },
        },
        saturday: {
          type: 'object',
          example: {
            status: 'boolean',
            date: 'date-time',
          },
        },
        sunday: {
          type: 'object',
          example: {
            status: 'boolean',
            date: 'date-time',
          },
        },
      },
      xml: {
        name: 'Oncall',
      },
    },
    Pharmacy: {
      type: 'object',
      required: [
        'name',
        'phone',
        'address',
      ],
      properties: {
        id: {
          type: 'object',
          format: 'ObjectId',
          example: 'objectId(5eb80deb079d6510a3f68d8a)',
        },
        name: {
          type: 'string',
          example: 'Farmácia do Povo',
        },
        phone: {
          type: 'string',
          example: '(44) 3445-1111)',
        },
        address: {
          type: 'string',
          example: 'Rua das Flores, 99',
        },
      },
      xml: {
        name: 'Pharmacy',
      },
    },
    ApiResponse: {
      type: 'object',
      properties: {
        code: {
          type: 'integer',
          format: 'int32',
        },
        type: {
          type: 'string',
        },
        message: {
          type: 'string',
        },
      },
    },
    Period: {
      type: 'object',
      required: [
        'firstDate',
        'secondDate',
      ],
      properties: {
        firstDate: {
          type: 'string',
          format: 'date-time',
          example: '2020-05-10',
        },
        secondDate: {
          type: 'string',
          format: 'date-time',
          example: '2020-05-30',
        },
      },
    },
  },
  externalDocs: {
    description: 'Find out more about the project',
    url: 'http://floren.app',
  },
};
