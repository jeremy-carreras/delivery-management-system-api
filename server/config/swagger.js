const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FlashDrop Delivery API',
      version: '1.0.0',
      description: 'CRUD API for the FlashDrop delivery platform — users, categories, products, orders, order items, bakery flavors and bread types.',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Local' },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id:            { type: 'string', format: 'uuid' },
            username:      { type: 'string', example: 'john_doe' },
            password_hash: { type: 'string', example: 'secret123' },
            role:          { type: 'string', enum: ['admin', 'user'], default: 'user' },
            phone:         { type: 'string', example: '555-1234' },
            name:          { type: 'string', example: 'John Doe' },
            address:       { type: 'string', example: '123 Main St' },
            created_at:    { type: 'string', format: 'date-time' },
          },
        },
        Category: {
          type: 'object',
          properties: {
            id:         { type: 'string', format: 'uuid' },
            name:       { type: 'string', example: 'Groceries' },
            type:       { type: 'string', enum: ['Normal', 'Custom'], default: 'Normal' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        Product: {
          type: 'object',
          properties: {
            id:           { type: 'string', example: '1' },
            name:         { type: 'string', example: 'Organic Hass Avocado' },
            price:        { type: 'number', format: 'float', example: 4.50 },
            unit:         { type: 'string', example: '2 units' },
            category_id:  { type: 'string', format: 'uuid' },
            image:        { type: 'string', format: 'uri' },
            is_available: { type: 'boolean', default: true },
            created_at:   { type: 'string', format: 'date-time' },
          },
        },
        Order: {
          type: 'object',
          properties: {
            id:               { type: 'string', example: 'ORD-2026-12345' },
            user_id:          { type: 'string', format: 'uuid' },
            customer_name:    { type: 'string', example: 'Jane Doe' },
            customer_phone:   { type: 'string', example: '555-9999' },
            delivery_address: { type: 'string', example: '456 Elm St' },
            total:            { type: 'number', format: 'float', example: 15.70 },
            status:           { type: 'string', enum: ['Pending', 'Active', 'Completed', 'Cancelled'], default: 'Pending' },
            created_at:       { type: 'string', format: 'date-time' },
          },
        },
        OrderItem: {
          type: 'object',
          properties: {
            id:             { type: 'string', format: 'uuid' },
            order_id:       { type: 'string', example: 'ORD-2026-12345' },
            product_id:     { type: 'string', example: '1' },
            product_name:   { type: 'string', example: 'Organic Hass Avocado' },
            quantity:       { type: 'integer', minimum: 1, example: 2 },
            price_at_time:  { type: 'number', format: 'float', example: 4.50 },
            bread_type:     { type: 'string', example: 'Sourdough' },
            flavors:        { type: 'array', items: { type: 'string' }, example: ['Chocolate', 'Vanilla'] },
          },
        },
        BakeryFlavor: {
          type: 'object',
          properties: {
            id:   { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Chocolate' },
          },
        },
        BreadType: {
          type: 'object',
          properties: {
            id:   { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Sourdough' },
          },
        },
      },
    },
    tags: [
      { name: 'Users',          description: 'User management' },
      { name: 'Categories',     description: 'Product categories' },
      { name: 'Products',       description: 'Delivery products' },
      { name: 'Orders',         description: 'Customer orders' },
      { name: 'Order Items',    description: 'Line items within an order' },
      { name: 'Bakery Flavors', description: 'Available bakery flavors' },
      { name: 'Bread Types',    description: 'Available bread types' },
    ],
    paths: {
      // ── USERS ──────────────────────────────────────────────────────
      '/users': {
        get: {
          tags: ['Users'],
          summary: 'List all users',
          responses: {
            200: { description: 'OK', content: { 'application/json': { schema: { properties: { message: { type: 'string' }, data: { type: 'array', items: { $ref: '#/components/schemas/User' } } } } } } },
          },
        },
        post: {
          tags: ['Users'],
          summary: 'Create a new user',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { required: ['username', 'password_hash'], properties: { username: { type: 'string' }, password_hash: { type: 'string' }, role: { type: 'string', enum: ['admin', 'user'] }, phone: { type: 'string' }, name: { type: 'string' }, address: { type: 'string' } } } } },
          },
          responses: { 201: { description: 'Created' }, 400: { description: 'Bad request' } },
        },
      },
      '/users/{id}': {
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        get: {
          tags: ['Users'],
          summary: 'Get user by ID',
          responses: { 200: { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } } }, 400: { description: 'Not found' } },
        },
        put: {
          tags: ['Users'],
          summary: 'Update a user',
          requestBody: { required: true, content: { 'application/json': { schema: { properties: { username: { type: 'string' }, password_hash: { type: 'string' }, role: { type: 'string' }, phone: { type: 'string' }, name: { type: 'string' }, address: { type: 'string' } } } } } },
          responses: { 200: { description: 'Updated' }, 400: { description: 'Error' } },
        },
        delete: { tags: ['Users'], summary: 'Delete a user', responses: { 200: { description: 'Deleted' }, 400: { description: 'Error' } } },
      },

      // ── CATEGORIES ─────────────────────────────────────────────────
      '/categories': {
        get: {
          tags: ['Categories'],
          summary: 'List all categories',
          responses: { 200: { description: 'OK', content: { 'application/json': { schema: { properties: { message: { type: 'string' }, data: { type: 'array', items: { $ref: '#/components/schemas/Category' } } } } } } } },
        },
        post: {
          tags: ['Categories'],
          summary: 'Create a new category',
          requestBody: { required: true, content: { 'application/json': { schema: { required: ['name'], properties: { name: { type: 'string' }, type: { type: 'string', enum: ['Normal', 'Custom'] } } } } } },
          responses: { 201: { description: 'Created' }, 400: { description: 'Error' } },
        },
      },
      '/categories/{id}': {
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        get: { tags: ['Categories'], summary: 'Get category by ID', responses: { 200: { description: 'OK' }, 400: { description: 'Not found' } } },
        put: {
          tags: ['Categories'],
          summary: 'Update a category',
          requestBody: { required: true, content: { 'application/json': { schema: { properties: { name: { type: 'string' }, type: { type: 'string', enum: ['Normal', 'Custom'] } } } } } },
          responses: { 200: { description: 'Updated' }, 400: { description: 'Error' } },
        },
        delete: { tags: ['Categories'], summary: 'Delete a category', responses: { 200: { description: 'Deleted' }, 400: { description: 'Error' } } },
      },

      // ── PRODUCTS ───────────────────────────────────────────────────
      '/products': {
        get: {
          tags: ['Products'],
          summary: 'List all products (includes category)',
          responses: { 200: { description: 'OK', content: { 'application/json': { schema: { properties: { message: { type: 'string' }, data: { type: 'array', items: { $ref: '#/components/schemas/Product' } } } } } } } },
        },
        post: {
          tags: ['Products'],
          summary: 'Create a new product',
          requestBody: { required: true, content: { 'application/json': { schema: { required: ['id', 'name', 'price', 'unit'], properties: { id: { type: 'string' }, name: { type: 'string' }, price: { type: 'number' }, unit: { type: 'string' }, category_id: { type: 'string' }, image: { type: 'string' }, is_available: { type: 'boolean' } } } } } },
          responses: { 201: { description: 'Created' }, 400: { description: 'Error' } },
        },
      },
      '/products/{id}': {
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        get: { tags: ['Products'], summary: 'Get product by ID (includes category)', responses: { 200: { description: 'OK' }, 400: { description: 'Not found' } } },
        put: {
          tags: ['Products'],
          summary: 'Update a product',
          requestBody: { required: true, content: { 'application/json': { schema: { properties: { name: { type: 'string' }, price: { type: 'number' }, unit: { type: 'string' }, category_id: { type: 'string' }, image: { type: 'string' }, is_available: { type: 'boolean' } } } } } },
          responses: { 200: { description: 'Updated' }, 400: { description: 'Error' } },
        },
        delete: { tags: ['Products'], summary: 'Delete a product', responses: { 200: { description: 'Deleted' }, 400: { description: 'Error' } } },
      },

      // ── ORDERS ─────────────────────────────────────────────────────
      '/orders': {
        get: {
          tags: ['Orders'],
          summary: 'List all orders (includes user + items)',
          responses: { 200: { description: 'OK', content: { 'application/json': { schema: { properties: { message: { type: 'string' }, data: { type: 'array', items: { $ref: '#/components/schemas/Order' } } } } } } } },
        },
        post: {
          tags: ['Orders'],
          summary: 'Create a new order',
          requestBody: { required: true, content: { 'application/json': { schema: { required: ['customer_name', 'customer_phone', 'delivery_address', 'total'], properties: { user_id: { type: 'string' }, customer_name: { type: 'string' }, customer_phone: { type: 'string' }, delivery_address: { type: 'string' }, total: { type: 'number' }, status: { type: 'string', enum: ['Pending', 'Active', 'Completed', 'Cancelled'] } } } } } },
          responses: { 201: { description: 'Created' }, 400: { description: 'Error' } },
        },
      },
      '/orders/{id}': {
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        get: { tags: ['Orders'], summary: 'Get order by ID (includes user + items)', responses: { 200: { description: 'OK' }, 400: { description: 'Not found' } } },
        put: {
          tags: ['Orders'],
          summary: 'Update an order / change status',
          requestBody: { required: true, content: { 'application/json': { schema: { properties: { customer_name: { type: 'string' }, customer_phone: { type: 'string' }, delivery_address: { type: 'string' }, total: { type: 'number' }, status: { type: 'string', enum: ['Pending', 'Active', 'Completed', 'Cancelled'] } } } } } },
          responses: { 200: { description: 'Updated' }, 400: { description: 'Error' } },
        },
        delete: { tags: ['Orders'], summary: 'Delete an order (cascades to items)', responses: { 200: { description: 'Deleted' }, 400: { description: 'Error' } } },
      },

      // ── ORDER ITEMS ────────────────────────────────────────────────
      '/order-items': {
        get: { tags: ['Order Items'], summary: 'List all order items', responses: { 200: { description: 'OK' } } },
        post: {
          tags: ['Order Items'],
          summary: 'Create an order item',
          requestBody: { required: true, content: { 'application/json': { schema: { required: ['order_id', 'product_name', 'quantity', 'price_at_time'], properties: { order_id: { type: 'string' }, product_id: { type: 'string' }, product_name: { type: 'string' }, quantity: { type: 'integer', minimum: 1 }, price_at_time: { type: 'number' }, bread_type: { type: 'string' }, flavors: { type: 'array', items: { type: 'string' } } } } } } },
          responses: { 201: { description: 'Created' }, 400: { description: 'Error' } },
        },
      },
      '/order-items/{id}': {
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        get: { tags: ['Order Items'], summary: 'Get order item by ID', responses: { 200: { description: 'OK' }, 400: { description: 'Not found' } } },
        put: {
          tags: ['Order Items'],
          summary: 'Update an order item',
          requestBody: { required: true, content: { 'application/json': { schema: { properties: { quantity: { type: 'integer' }, price_at_time: { type: 'number' }, bread_type: { type: 'string' }, flavors: { type: 'array', items: { type: 'string' } } } } } } },
          responses: { 200: { description: 'Updated' }, 400: { description: 'Error' } },
        },
        delete: { tags: ['Order Items'], summary: 'Delete an order item', responses: { 200: { description: 'Deleted' }, 400: { description: 'Error' } } },
      },

      // ── BAKERY FLAVORS ─────────────────────────────────────────────
      '/bakery-flavors': {
        get: { tags: ['Bakery Flavors'], summary: 'List all bakery flavors', responses: { 200: { description: 'OK' } } },
        post: {
          tags: ['Bakery Flavors'],
          summary: 'Create a flavor',
          requestBody: { required: true, content: { 'application/json': { schema: { required: ['name'], properties: { name: { type: 'string' } } } } } },
          responses: { 201: { description: 'Created' }, 400: { description: 'Error' } },
        },
      },
      '/bakery-flavors/{id}': {
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        get: { tags: ['Bakery Flavors'], summary: 'Get flavor by ID', responses: { 200: { description: 'OK' }, 400: { description: 'Not found' } } },
        put: {
          tags: ['Bakery Flavors'],
          summary: 'Update a flavor',
          requestBody: { required: true, content: { 'application/json': { schema: { properties: { name: { type: 'string' } } } } } },
          responses: { 200: { description: 'Updated' }, 400: { description: 'Error' } },
        },
        delete: { tags: ['Bakery Flavors'], summary: 'Delete a flavor', responses: { 200: { description: 'Deleted' }, 400: { description: 'Error' } } },
      },

      // ── BREAD TYPES ────────────────────────────────────────────────
      '/bread-types': {
        get: { tags: ['Bread Types'], summary: 'List all bread types', responses: { 200: { description: 'OK' } } },
        post: {
          tags: ['Bread Types'],
          summary: 'Create a bread type',
          requestBody: { required: true, content: { 'application/json': { schema: { required: ['name'], properties: { name: { type: 'string' } } } } } },
          responses: { 201: { description: 'Created' }, 400: { description: 'Error' } },
        },
      },
      '/bread-types/{id}': {
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        get: { tags: ['Bread Types'], summary: 'Get bread type by ID', responses: { 200: { description: 'OK' }, 400: { description: 'Not found' } } },
        put: {
          tags: ['Bread Types'],
          summary: 'Update a bread type',
          requestBody: { required: true, content: { 'application/json': { schema: { properties: { name: { type: 'string' } } } } } },
          responses: { 200: { description: 'Updated' }, 400: { description: 'Error' } },
        },
        delete: { tags: ['Bread Types'], summary: 'Delete a bread type', responses: { 200: { description: 'Deleted' }, 400: { description: 'Error' } } },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
