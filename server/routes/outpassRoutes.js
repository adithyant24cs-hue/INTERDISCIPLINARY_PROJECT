const router = require("express").Router();

const Outpass = require("../models/Outpass");

const verifyToken = require(
    "../middleware/authMiddleware"
);

const allowRoles = require(
    "../middleware/roleMiddleware"
);


// CREATE OUTPASS
router.post(

    "/create",

    verifyToken,

    allowRoles("student"),

    async(req,res)=>{

        try{

            const outpass = await Outpass.create({

                ...req.body,

                studentId:req.user.studentId

            });

            res.json(outpass);

        }catch(err){

            res.status(500).json(err);

        }

    }

);


// GET ALL PASSES
router.get(

    "/",

    verifyToken,

    allowRoles("warden","student"),

    async(req,res)=>{

        try{

            let passes;

            // STUDENT → ONLY OWN PASSES
            if(req.user.role === "student"){

                passes = await Outpass.find({

                    studentId:req.user.studentId

                }).sort({ createdAt:-1 });

            }

            // WARDEN → ALL PASSES
            else{

                passes = await Outpass.find()
                .sort({ createdAt:-1 });

            }

            res.json(passes);

        }catch(err){

            res.status(500).json(err);

        }

    }

);


// APPROVE PASS
router.put(

    "/approve/:id",

    verifyToken,

    allowRoles("warden"),

    async(req,res)=>{

        try{

            const pass = await Outpass.findById(
                req.params.id
            );

            pass.status = "approved";

            pass.qrCode = JSON.stringify({

                id:pass._id,

                studentId:pass.studentId,

                status:"approved"

            });

            await pass.save();

            res.json(pass);

        }catch(err){

            res.status(500).json(err);

        }

    }

);


// REJECT PASS
router.put(

    "/reject/:id",

    verifyToken,

    allowRoles("warden"),

    async(req,res)=>{

        try{

            const updated =
                await Outpass.findByIdAndUpdate(

                    req.params.id,

                    {
                        status:"rejected"
                    },

                    { new:true }

                );

            res.json(updated);

        }catch(err){

            res.status(500).json(err);

        }

    }

);


// VERIFY QR
router.post(

    "/verify",

    verifyToken,

    allowRoles("security"),

    async(req,res)=>{

        try{

            const { qrData } = req.body;

            const parsed = JSON.parse(qrData);

            const pass = await Outpass.findById(
                parsed.id
            );

            if(!pass){

                return res.status(404).json({
                    message:"Pass not found"
                });

            }

            if(pass.status !== "approved"){

                return res.status(400).json({
                    message:"Pass not approved"
                });

            }

            // SAVE LOG
            const Log = require("../models/Log");

            await Log.create({

                studentId:pass.studentId,

                reason:pass.reason,

                fromDate:pass.fromDate,

                toDate:pass.toDate

            });

            res.json({

                valid:true,

                pass

            });

        }catch(err){

            res.status(500).json({
                message:"Invalid QR"
            });

        }

    }

);


// GET LOGS
router.get(

    "/logs",

    verifyToken,

    allowRoles("security","warden"),

    async(req,res)=>{

        try{

            const Log = require("../models/Log");

            const logs = await Log.find()
            .sort({ scannedAt:-1 });

            res.json(logs);

        }catch(err){

            res.status(500).json(err);

        }

    }

);

module.exports = router;