const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  requestedAt: { type: Date, default: Date.now },
  borrowedFrom: { type: Date },  
  borrowedTo: { type: Date },   
  isReturned: { type: Boolean, default: false }, 
  returnedAt: { type: Date },     

  decisionAt: { type: Date }  
});

const Borrow = mongoose.models.Borrow || mongoose.model('Borrow', borrowSchema);
module.exports = Borrow;
