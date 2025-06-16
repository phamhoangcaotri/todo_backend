const Todo = require('../models/todo.model');
const { HTTP_STATUS } = require('../constants/constants');

exports.getTodos = async (req, res) => {
    try {
        const {
            completed,
            title,
            fromDate,
            toDate,
            page = 1,
            limit = 10
        } = req.query;

        const filter = {};

        if (completed !== undefined) {
            filter.completed = completed === 'true';
        }

        if (title) {
            filter.title = { $regex: title, $options: 'i' };
        }

        if (fromDate || toDate) {
            filter.createdAt = {};
            if (fromDate) filter.createdAt.$gte = new Date(fromDate);
            if (toDate) filter.createdAt.$lte = new Date(toDate);
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [total, data] = await Promise.all([
            Todo.countDocuments(filter),
            Todo.find(filter).skip(skip).limit(parseInt(limit))
        ]);

        res.json({
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            data
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
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
