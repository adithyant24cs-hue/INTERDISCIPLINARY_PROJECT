const router = require("express").Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


// LOGIN
router.post("/login", async(req,res)=>{

    try{

        const { studentId, password } = req.body;

        const user = await User.findOne({
            studentId
        });

        if(!user){
            return res.status(400).json({
                message:"User not found"
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if(!validPassword){
            return res.status(400).json({
                message:"Invalid password"
            });
        }

        const token = jwt.sign(
            {
                id:user._id,
                role:user.role,
                studentId:user.studentId
            },
            process.env.JWT_SECRET
        );

        res.json({

            token,

            role:user.role,

            studentId:user.studentId

        });

    }catch(err){

        res.status(500).json(err);

    }

});

module.exports = router;