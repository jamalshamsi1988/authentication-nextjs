import User from "../../../models/User";
import { verifyPassword } from "../../../utils/auth";
import connectDB from "../../../utils/connectDB";

async function handler(req,res){
    if(req.method !== "POST"){
        return;
    }

    try {
        await connectDB();
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:"failed" , message : "Error to connected DB"});
    }

    const {email , password}=req.body;
    if(!email || !password){
        return res.status(422).json({status :"failed" , message:"Invalid data"});
    }

    const user = await User.findOne({email : email});
    if(!user){
        return res.status(404).json({status:"failed", message :"User dosen't exist"});
    }

    const isValid = await verifyPassword(password , user.password);
    if(!isValid){
        return res.status(422).json({status :"failed" , message:"Username or Password is not correct"});
    }

}

export default handler;