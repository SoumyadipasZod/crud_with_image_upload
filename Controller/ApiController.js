const express = require('express')
const User = require('../Model/User')

exports.index = (req,res) =>{
    User.find((err,data) =>{
        if(!err){
            res.status(200).json({
                status: 'success',
                result: data,
                message: 'data fetch successfully'
            })
        }else{
            res.status(404).json({
                status:'failed',
                result: err,
                message:'failed'
            })
        }
    })
}

exports.store = (req, res) => {
    // console.log(req.body)
    const Users =new User({
        pname:req.body.pname,
        size:req.body.size,
        price:req.body.price,
        status:1
    })
    Users.save()
    .then((result) => {
        res.status(201).json({
            status: 'success',
            result: result,
            message: 'data add successfully'
        })
    }).catch((err) => {
        res.status(404).json({
            status:'failed',
            result: err,
            message:'add record failed'
        })
    })
}