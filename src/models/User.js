const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcryptjs = require("bcryptjs");

const userSchema = Schema(
  {
    name: { type: String, required: true },
    admin: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true },
    mobile: { type: String },
    emailActive: { type: Boolean, default: false },
    mobileActive: { type: Boolean, default: false },
    password: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

userSchema.pre("save", function (next) {
  let salt = bcryptjs.genSaltSync(15);
  let hash = bcryptjs.hashSync(this.password, salt);

  this.password = hash;
  next();
});

userSchema.pre("updateOne", function (next) {
  if (this.getUpdate().$set.password) {
    let salt = bcryptjs.genSaltSync(15);
    let hash = bcryptjs.hashSync(this.getUpdate().$set.password, salt);

    this.getUpdate().$set.password = hash;
  }
  next();
});

userSchema.pre("findOneAndUpdate", function (next) {
  if (this.getUpdate().$set.password) {
    let salt = bcryptjs.genSaltSync(15);
    let hash = bcryptjs.hashSync(this.getUpdate().$set.password, salt);

    this.getUpdate().$set.password = hash;
  }
  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcryptjs.compareSync(password, this.password);
};

userSchema.virtual("profile", {
  ref: "Image",
  localField: "_id",
  foreignField: "profile",
});

module.exports = mongoose.model("User", userSchema);
