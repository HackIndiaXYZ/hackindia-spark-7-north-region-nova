const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  tokenNumber: { type: String, required: true }, // e.g., A-101
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  patientName: { type: String, required: true }, // Store name directly for walk-ins
  status: { type: String, enum: ['waiting', 'calling', 'served', 'skipped', 'cancelled'], default: 'waiting' },
  priority: { type: Boolean, default: false }, // true for emergency cases
  estimatedWaitTime: { type: Number, default: 0 }, // in minutes
  joinedAt: { type: Date, default: Date.now },
  servedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Token', tokenSchema);
