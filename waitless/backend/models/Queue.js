const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true, unique: true },
  activeTokens: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Token' }],
  currentServing: { type: mongoose.Schema.Types.ObjectId, ref: 'Token' },
  isPaused: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Queue', queueSchema);
