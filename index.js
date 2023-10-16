const express = require('express')
const mongoose = require('mongoose')
const empRouter = require('./routes/employees')

//const EmpModel = require('./models/employee')

const UserModel = require('./models/user')

const app = express()

const SERVER_PORT = 8080

app.use(express.json())
app.use(express.urlencoded())

const DB_CONNECTION_STRING = "mongodb+srv://rootadmin:passvenus@cluster0.fpg8zxl.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority"

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.use('/api/v1/emp', empRouter);

app.post("/api/v1/user/signup", async (req,res)=>{

    try{ 
        const newUser = new UserModel({
            ...req.body
        })
        await newUser.save()
        res.status(201).json(newUser)
    }catch(error){
        res.status(500).send(error)
    }
    
})

app.post("/api/v1/user/login", async (req,res)=>{
    const { username, email, password } = req.body
    try{
        const user = await UserModel.findOne({ username }).exec();

        if (!user) {
            return res.status(401).json({ message: "User not found." });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Incorrect password." });
        }

        return res.status(200).json({ message: "Login successful." });

    }catch(error){
        res.status(500).send(error)
    }
})


app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})