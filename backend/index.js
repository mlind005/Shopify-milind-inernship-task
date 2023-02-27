const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios")
const router = require("./routes.js");

require("./Dbconn")
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

const PORT = 6969;

app.use("/api/v1",router)





app.listen(PORT, (err) =>{
	if(!err)
		console.log("Server is Successfully Running,and App is listening on port "+ PORT)
        

	else
		console.log("Error occurred, server can't start", err);
	}
);
