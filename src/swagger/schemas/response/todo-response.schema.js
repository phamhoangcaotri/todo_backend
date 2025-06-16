/**
 * @swagger
 * components:
 *   schemas:
 *     TodoResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/TodoRequest'
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *             createdAt:
 *               type: string
 *               format: date-time
 *             updatedAt:
 *               type: string
 *               format: date-time
 *       example:
 *         id: "666abc123"
 *         title: "Học Swagger"
 *         completed: false
 *         createdAt: "2025-06-12T14:00:00Z"
 *         updatedAt: "2025-06-12T14:10:00Z"
 */
