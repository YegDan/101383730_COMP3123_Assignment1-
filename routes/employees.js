const express = require("express")
const EmpModel = require('../models/employee')


const router = express.Router()

//get all emps
router.get('/employees', async (req, res) => {
    try{
        const empList = await EmpModel.find({})
        res.status(200).json(empList)
    }catch(error){
        res.status(500).send(error)
    }
})

//create new emp
router.post('/employees', async (req, res) => {
    try{
        const newEmp = new EmpModel({
            ...req.body
        })
        await newEmp.save()
        res.status(201).json(newEmp)
    }catch(error){
        res.status(500).send(error)
    }

})


//get emp by emp id
router.get('/employees/:id', async (req, res) => {
    const empId = req.params.id
    try{
        const emp = await EmpModel.findById(empId).exec()
        res.status(200).json(emp)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//edit by emp id
router.put('/employees/:id', async (req, res) => {
    const empId = req.params.id
    const { first_name, last_name, email, gender, salary } = req.body;
    try{
        const updatedEmp = await EmpModel.findByIdAndUpdate(empId, {
            first_name: first_name,
            last_name: last_name,
            email: email,
            gender: gender,
            salary: salary
        }, {new: true})
        
        if(updatedEmp == null){
            return res.status(404)
        }
        res.status(200).json(updatedEmp)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//delete emp by id
router.delete('/employees', async (req, res)=>{
    const empId = req.query.eid
    try{
        const emp = await EmpModel.deleteOne({_id: empId})
        if(emp.deletedCount === 0){
            res.status(200).json({message: "Employee Not Found"})
        }
        res.status(204).end()
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

module.exports = router;