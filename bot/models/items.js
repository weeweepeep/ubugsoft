const mongo = require('mongoose');

module.exports = mongo.Schema('items', new mongo.Schema({
  userID: { type: String, require: true, unique: true },
  weddingring: { type: Number, require: false },
}))