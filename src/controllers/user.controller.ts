import { Request, Response } from "express";
import User, { UserModel } from "../models/user";
import jwt from "jsonwebtoken";
import env from "../config/environment";

function createToken(user: UserModel) {
  const { id, email } = user;
  return jwt.sign(
    {
      id: id,
      email: email,
    },
    env.jwtSecret,
    {
      expiresIn: 86400,
    }
  );
}

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "Please, send your email and password" });
  }
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ msg: "The user already exists" });
  }
  const newUser = new User(req.body);
  await newUser.save();
  return res.status(201).json(newUser);
};

export const signIn = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "Please, send your email and password" });
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ msg: "The user does not exists" });
  }
  const isMatch = await user.comparePassword(req.body.password);
  if (isMatch) {
    user.password = undefined
    res.status(200).json({ token: createToken(user), user });
  }
  return res.status(400).json({ msg: "The email or password are incorrect" });
};

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await User.find({}, { password: 0 });
  return res.status(200).json(users);
};

export const getUsersById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await User.findById(req.params.id, { password: 0 });
  delete user?.password;
  return res.status(200).json(user);
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await User.updateOne(
    { _id: req.body.id },
    { $set: req.body },
    { new: true }
  );
  return res.status(200).json(user);
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await User.deleteOne({ _id: req.params.id });
  return res.status(200).json(user);
};
