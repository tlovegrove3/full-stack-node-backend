const { mongoose } = require("../config/database");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  status: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
