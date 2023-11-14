import { propagateServerField } from "next/dist/server/lib/render-server";
import connectDB from "../../utils/connectDB";
import { verifyPassword, verifyToken } from "../../utils/auth";
import User from "../../models/User";

async function handler(req, res) {
  if (req.method !== "POST") return;
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "failed", message: "Error connected DB" });
  }

  const { name, lastName, password } = req.body;
  const { token } = req.cookies;
  const secretKey = process.env.SECRET_KEY;
  if (!token) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });
  }

  const result = verifyToken(token, secretKey);
  if (!result) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are unauthorized" });
  }
  const user = await User.findOne({ email: result.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User dosen't exist" });
  }
  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return res
      .status(422)
      .json({ status: "failed", message: "Password is incorrect" });
  }

  user.name = name;
  user.lastName = lastName;
  user.save();
  res
    .status(200)
    .json({ status: "success", data: { name, lastName, email: result.email } });
}
export default handler;
