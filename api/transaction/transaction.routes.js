const express = require('express')
const { getTransactions, getTransactionById, addTransaction, updateTransaction, removeTransaction} = require('./transaction.controller')
const router = express.Router()

router.get('/', getTransactions)
router.get('/:id', getTransactionById)


router.post('/', addTransaction)
router.put('/:id', updateTransaction)
router.delete('/:id', removeTransaction)


module.exports = router
