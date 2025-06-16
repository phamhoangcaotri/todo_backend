const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        completed: { type: Boolean, default: false },
    },
    {
        timestamps: true
    }
);

todoSchema.virtual('id').get(function () {
  return this._id.toString();
});

todoSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id;
  }
});

module.exports = mongoose.model('Todo', todoSchema);
