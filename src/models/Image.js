const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    profile: { type: Schema.Types.ObjectId, ref: "User", default: undefined },
    path: { type: String, required: true },
  },
  { timestamps: true }
);

imageSchema.pre("save", function (next) {
  this.path = this.path.substring(6);

  next();
});

imageSchema.pre("updateOne", function (next) {
  this.getUpdate().$set.path = this.getUpdate().$set.path.substring(6);

  next();
});

module.exports = mongoose.model("Image", imageSchema);
