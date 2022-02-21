const express = require('express');
const Route = express.Router();
const UserController =require('../Controller/UserController')

Route.get('/',UserController.userview)
Route.get('/add-product',UserController.index);
Route.post('/userpost',UserController.store);
Route.get('/delete/:u_id',UserController.delete)
Route.get('/edit/:u_id',UserController.edit)
Route.post('/update',UserController.update)

module.exports = Route