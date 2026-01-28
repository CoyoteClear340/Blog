// Initializing our web server (Express).
// Connecting to our database (MongoDB via Mongoose).
// Setting up essential middleware (like cors).
// Loading our API routes.
// Telling the server to start listening for incoming requests.

const express = require("express"); // load express framework form modules
require('dotenv').config();


const app = express(); // instance of express app obj has methods for routing
app.use(express.json())
const mongoose = require('mongoose') // import mongoose lib


const PORT = process.env.PORT || 5000;

const startServer = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI) // tell mongooes to connet using MONGODB URI
        console.log('Successfully connected to Mongo!');

        // start server
        app.listen(PORT ,()=>{
            console.log(`sERVER RUNNNIG on ${PORT}`);
        })
        
    }catch(err){
        console.error('Failed to connect to MongoDB', error);
    // Exit the Node.js process with a failure code (1)
    // This is important for deployment environments to know the app failed to start.
    process.exit(1); 
    }

}

startServer();


