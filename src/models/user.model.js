import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please Enter a Valid Email"],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    confirm_password: {
      type: String,
      required: true,
      validate: [
        function (val) {
          return val === this.password;
        },
        "Password doesn't match",
      ],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirm_password = undefined;
  }
});

userSchema.methods.comparePassword = function (pswd, pswdDB) {
  return bcrypt.compare(pswd, pswdDB);
};

userSchema.methods.isPasswordChanged = function (jwtiat) {
  const lastUpdate = parseInt(this.updatedAt.getTime() / 1000);
  return jwtiat < lastUpdate;
};

export const User = mongoose.model("User", userSchema);
