import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
  //1. check if the user exists
  //2. create the user if it does not exist
  //3. return the user object to the calling client

  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      return res.status(200).send();
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating the user" });
  }
};
const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const { auth0Id } = req.params;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.country = country;
    user.city = city;
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Updating user profile" });
  }
};
export default {
  createCurrentUser,
  updateCurrentUser,
};
