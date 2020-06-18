import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface UserModel extends Document {
  email: string;
  name: string;
  password: string | undefined;
  rol: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    rol: String,
  },
  { timestamps: true }
);

userSchema.pre<UserModel>("save", async function (next) {
  const user = this;
  if (!user.isModified()) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<UserModel>("User", userSchema);
