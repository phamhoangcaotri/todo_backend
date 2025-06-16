/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: ToDo management
 */

/**
 * @swagger
 * /api/todos/get-list:
 *   get:
 *     summary: Get list of ToDos (with filter & paging)
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - $ref: '#/components/parameters/CompletedParam'
 *       - $ref: '#/components/parameters/TitleParam'
 *       - $ref: '#/components/parameters/FromDateParam'
 *       - $ref: '#/components/parameters/ToDateParam'
 *     responses:
 *       200:
 *         description: List of ToDos (paging)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoListResponse'
 */

/**
 * @swagger
 * /api/todos/create:
 *   post:
 *     summary: Create a new ToDo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/TodoRequestBody'
 *     responses:
 *       201:
 *         description: Created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoResponse'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/todos/update/{id}:
 *   put:
 *     summary: Update a ToDo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       $ref: '#/components/requestBodies/TodoRequestBody'
 *     responses:
 *       200:
 *         description: Updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoResponse'
 *       404:
 *         description: ToDo not found
 */

/**
 * @swagger
 * /api/todos/delete/{id}:
 *   delete:
 *     summary: Delete a ToDo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoResponse'
 *       404:
 *         description: ToDo not found
 */
