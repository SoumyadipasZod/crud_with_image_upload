const express = require('express');
const Route =express.Router()
const ApiController = require('../Controller/ApiController')

Route.get('/',ApiController.index)
Route.post('/addproduct',ApiController.store)

module.exports =Route