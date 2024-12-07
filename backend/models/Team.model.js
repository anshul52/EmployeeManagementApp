const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: false,
  },
});

module.exports = mongoose.model("Team", teamSchema);
