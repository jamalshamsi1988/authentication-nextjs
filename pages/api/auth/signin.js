import { sign } from "jsonwebtoken";
import User from "../../../models/User";
import { verifyPassword } from "../../../utils/auth";
import connectDB from "../../../utils/connectDB";
import { serialize } from "cookie";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "failed", message: "Error to connected DB" });
  }

  const { email, password } = req.body;
  const secretKey = process.env.SECRET_KEY;
  const expiration = 24 * 60 * 60;

  if (!email || !password) {
    return res.status(422).json({ status: "failed", message: "Invalid data" });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User dosen't exist" });
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return res
      .status(422)
      .json({
        status: "failed",
        message: "Username or Password is not correct",
      });
  }

  const token = sign({ email }, secretKey, { expiresIn: expiration });
  const serailized=serialize("token" , token ,{httpOnly : true ,maxAge : expiration , path : "/"});
  
  res.status(200).setHeader("Set-Cookie", serailized ).json({status :"success" , message : "logged in" ,data : {email : user.email}});
}

export default handler;
