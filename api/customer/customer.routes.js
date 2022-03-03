const express = require('express')
const { getCustomers, getCustomerById, addCustomer, updateCustomer, removeCustomer} = require('./customer.controller')
const router = express.Router()

router.get('/', getCustomers)
router.get('/:id', getCustomerById)


router.post('/', addCustomer)
router.put('/:id', updateCustomer)
router.delete('/:id', removeCustomer)


module.exports = router
