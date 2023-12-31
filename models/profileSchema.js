const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
  userID: { type: String, require: true, unique: true },
  serverID: { type: String, require: true },
  coins: { type: Number, default: 1000 },
  bank: { type: Number },
    
  daily: { type: Number }
});

model = mongoose.model("ProfileModels", profileSchema);

module.exports = model

