const express = require('express');
const User = require('../Model/User');
const path = require('path');

exports.index = (req, res) => {
    res.render('user')
}

exports.userview = (req, res) => {
    User.find((err,data) => {
        if(!err){
            res.render('home',{
                viewdata: data
            })
        }
    })
}

exports.store = (req, res) => {
    // console.log(req.body)
    const image =req.file

    const Users =new User({
        pname:req.body.pname,
        size:req.body.size,
        price:req.body.price,
        image:image.path
        
    })
    Users.save()
    .then((result) => {
        console.log(result,'Add Successfully')
        res.redirect('/')
    }).catch((err) => {
        console.error(err,'Add failed')
    })
}

exports.delete = (req, res) => {
    const userid = req.params.u_id
    User.deleteOne({_id:userid}).then((deletedata)=>{
        console.log(deletedata,'Deleted Successfully')
        res.redirect('/')
    }).catch((err) => {
        console.error(err,'Delete Failed')
    })
}

exports.edit = (req, res) => {
    const user_id = req.params.u_id
    User.findById(user_id).then((result) => {
        console.log(result)
        res.render('edit', {
            viewdata:result
        })
    }).catch((err) => {
        console.log(err)
    })
}

exports.update = (req, res, next) => {
    const user_id =req.body.uid
    const pname = req.body.pname
    const size =req.body.size
    const price =req.body.price
    // image
    // const image = req.body.image

    User.findById(user_id).then((result) => {
        result.pname = pname
        result.size = size
        result.price = price
        return result.save()
        .then((results) =>{
            res.redirect('/')
            console.log(results,'updated')
        }).catch((err) => {
            console.log(err,'update Failed')
        })
    })
}