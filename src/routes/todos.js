const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

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
 *     summary: Lấy danh sách ToDo (có filter)
 *     tags: [Todos]
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Lọc theo trạng thái hoàn thành (true/false)
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: false
 *         description: Tìm kiếm theo tiêu đề (không phân biệt hoa thường)
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Ngày tạo từ (YYYY-MM-DD)
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Ngày tạo đến (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: List of ToDos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get('/get-list', todoController.getTodos);

/**
 * @swagger
 * /api/todos/create:
 *   post:
 *     summary: Tạo ToDo mới
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Bad request
 */
router.post('/create', todoController.createTodo);

/**
 * @swagger
 * /api/todos/update/{id}:
 *   put:
 *     summary: Cập nhật ToDo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của ToDo
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Không tìm thấy ToDo
 */
router.put('/update/:id', todoController.updateTodo);

/**
 * @swagger
 * /api/todos/delete/{id}:
 *   delete:
 *     summary: Xoá ToDo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của ToDo
 *     responses:
 *       200:
 *         description: Xoá thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Không tìm thấy ToDo
 */
router.delete('/delete/:id', todoController.deleteTodo);

module.exports = router;
