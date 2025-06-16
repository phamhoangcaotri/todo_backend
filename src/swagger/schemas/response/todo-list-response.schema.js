/**
 * @swagger
 * components:
 *   schemas:
 *     TodoListResponse:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           example: 42
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TodoResponse'
 */