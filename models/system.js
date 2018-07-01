const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const systemSchema = new Schema({
  name: String,
  companyId: String
});

module.exports = mongoose.model('System', systemSchema);
