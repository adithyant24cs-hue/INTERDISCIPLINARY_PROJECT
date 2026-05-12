const router = require("express").Router();

const bcrypt = require("bcryptjs");

const User = require("../models/User");

const verifyToken = require(
    "../middleware/authMiddleware"
);

const allowRoles = require(
    "../middleware/roleMiddleware"
);


// CREATE USER
router.post(

    "/create",

    verifyToken,

    allowRoles("warden"),

    async(req,res)=>{

        try{

            const {
                studentId,
                password,
                role
            } = req.body;

            const existingUser =
                await User.findOne({
                    studentId
                });

            if(existingUser){

                return res.status(400).json({
                    message:"User already exists"
                });

            }

            const hashedPassword =
                await bcrypt.hash(password,10);

            const user = await User.create({

                studentId,

                password:hashedPassword,

                role

            });

            res.json({
                message:"User created",
                user
            });

        }catch(err){

            res.status(500).json(err);

        }

    }

);


// GET USERS
router.get(

    "/",

    verifyToken,

    allowRoles("warden"),

    async(req,res)=>{

        try{

            const users = await User.find()
            .select("-password");

            res.json(users);

        }catch(err){

            res.status(500).json(err);

        }

    }

);

module.exports = router;