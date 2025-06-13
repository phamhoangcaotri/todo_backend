const Todo = require('../models/todoModel');
const { HTTP_STATUS } = require('../constants/constants');

exports.getTodos = async (req, res) => {
    const { completed, title, fromDate, toDate } = req.query;

    /// created query
    const query = {};
    if (completed != undefined) {
        query.completed = completed == 'true';
    }

    if (title != undefined) {
        query.title = new RegExp(title, 'i');
    }

    if (fromDate != undefined && toDate != undefined) {
        query.createdAt = new RegExp(title, 'i');
    }

    if (fromDate || toDate) {
        query.createdAt = {};
        if (fromDate) query.createdAt.$gte = new Date(fromDate);
        if (toDate) query.createdAt.$lte = new Date(toDate);
    }

    const todos = await Todo.find(query).sort('-createdAt');

    res.json(todos.map(formatTodo));
};

exports.createTodo = async (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Title is required' });

    const todo = new Todo({ title });
    await todo.save();
    res.status(201).json(formatTodo(todo));
};

exports.updateTodo = async (req, res) => {
    const { title, completed } = req.body;
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Not found' });

    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;

    await todo.save();
    res.json(formatTodo(todo));
};

exports.deleteTodo = async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Not found' });

    res.json(formatTodo(todo));
};

function formatTodo(todo) {
    const obj = todo.toObject();
    return {
        id: obj._id,
        title: obj.title,
        completed: obj.completed,
        createdAt: obj.createdAt,
        updatedAt: obj.updatedAt,
        v: obj.__v
    };
}
