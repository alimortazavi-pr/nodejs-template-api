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

userSchema.pre("save", async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  if (this.getUpdate().$set.password) {
    let salt = bcryptjs.genSaltSync(15);
    let hash = bcryptjs.hashSync(this.getUpdate().$set.password, salt);

    this.getUpdate().$set.password = hash;
  } else {
    this.getUpdate().$set.password = docToUpdate.password;
  }
  next();
});

userSchema.pre("updateOne", async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  if (this.getUpdate().$set.password) {
    let salt = bcryptjs.genSaltSync(15);
    let hash = bcryptjs.hashSync(this.getUpdate().$set.password, salt);

    this.getUpdate().$set.password = hash;
  } else {
    this.getUpdate().$set.password = docToUpdate.password;
  }
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  if (this.getUpdate().$set.password) {
    let salt = bcryptjs.genSaltSync(15);
    let hash = bcryptjs.hashSync(this.getUpdate().$set.password, salt);

    this.getUpdate().$set.password = hash;
  } else {
    this.getUpdate().$set.password = docToUpdate.password;
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
