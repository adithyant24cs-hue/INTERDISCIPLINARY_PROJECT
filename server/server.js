const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const dotenv = require("dotenv");

const path = require("path");

dotenv.config();

const authRoutes = require("./routes/authRoutes");

const outpassRoutes = require("./routes/outpassRoutes");

const userRoutes = require("./routes/userRoutes");

const app = express();


// MIDDLEWARE
app.use(cors());

app.use(express.json());


// DATABASE
mongoose.connect(process.env.MONGO_URI)

.then(()=>{

    console.log("MongoDB Connected");

})

.catch((err)=>{

    console.log(err);

});


// API ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/outpass", outpassRoutes);

app.use("/api/users", userRoutes);


// FRONTEND BUILD PATH
const frontendPath = path.resolve(
    __dirname,
    "../Client/dist"
);


// STATIC FILES
app.use(express.static(frontendPath));


// REACT ROUTES
app.get("/{*any}", (req,res)=>{

    res.sendFile(
        path.join(
            frontendPath,
            "index.html"
        )
    );

});


// SERVER
const PORT = process.env.PORT || 10000;

app.listen(PORT, ()=>{

    console.log(
        `Server running on port ${PORT}`
    );

});