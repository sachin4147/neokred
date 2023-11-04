const express = require("express")
const { UserModel } = require("../Models/UserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { authMiddelware } = require("../Middlewares/Athentication")
require("dotenv").config()


const UserRoute = express.Router()

UserRoute.post("/register", async (req, res) => {
    try {
        //check user already exist
        
        const userExist = await UserModel.findOne({ email: req.body.email })
        if (userExist) {
            return res.status(400).send({
                success: false,
                message: "user already exists"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword;
        const user = new UserModel(req.body)
        await user.save()
        return res.status(201).send({
            success: true,
            message: "user registered successfully"
        })

    } catch (err) {
        return res.status(400).send({
           
            success: false,
            message: err.message
        })
        
    }
})

UserRoute.post("/login", async (req, res) => {
    try {

        const user = await UserModel.findOne({ email: req.body.email })

        if (!user) {
            return res.status(500).send({
                success: false,
                message: "user not found"
            })

        }
        //compare password
        const validPaassword=await bcrypt.compare(
            req.body.password,
            user.password
        )
        if(!validPaassword){
            return res.status(400).send({
                success: false,
                message: "invalid password"
            })
        }
        //generate token
        const token=jwt.sign({userId:user._id},process.env.SECRET_KEY,{ expiresIn: '5m' })
        return res.status(200).send({msg:"Login Successfull !",token:token})

    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message
        })
    }
})
 UserRoute.get("/get-current-user",authMiddelware,async(req,res)=>{
    try{
        const user=await UserModel.findOne({_id:req.body.userId})

       
        return res.send({
            success:true,
            message:"user fetched successfully",
            data:user,
        })
       
        
    }catch(err){
       res.status(500).send({err:"No user Available"})
    }
})



module.exports = { UserRoute }