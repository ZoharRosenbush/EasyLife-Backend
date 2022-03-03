const transactionService = require('./transaction.service.js');
const logger = require('../../services/logger.service')

// GET LIST
async function getTransactions(req, res) {

  const { page } = req.query

  try {
    const transactionsInfo = await transactionService.query(page)
    res.json(transactionsInfo);
  } catch (err) {
    console.log(err)
    logger.error('Failed to get transaction', err)
    res.status(500).send({ err: 'Failed to get transaction' })
  }
}

// GET BY ID 
async function getTransactionById(req, res) {
  try {
    const transactionId = req.params.id;
    const transaction = await transactionService.getById(transactionId)
    res.json(transaction)
  } catch (err) {
    logger.error('Failed to get transaction', err)
    res.status(500).send({ err: 'Failed to get transaction' })
  }
}

// POST (add transaction)
async function addTransaction(req, res) {
  try {
    const transaction = req.body;
    const addedTransaction = await transactionService.add(transaction)
    res.json(addedTransaction)
  } catch (err) {
    logger.error('Failed to add transaction', err)
    res.status(500).send({ err: 'Failed to add transaction' })
  }
}

// PUT (Update transaction)
async function updateTransaction(req, res) {
  try {
    const transaction = req.body;
    await transactionService.update(transaction)
    res.json(transaction)
  } catch (err) {
    logger.error('Failed to update transaction', err)
    res.status(500).send({ err: 'Failed to update transaction' })

  }
}

// DELETE (Remove transaction)
async function removeTransaction(req, res) {
  try {
    const transactionId = req.params.id;
    const removedId = await transactionService.remove(transactionId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove transaction', err)
    res.status(500).send({ err: 'Failed to remove transaction' })
  }
}

module.exports = {
  getTransactions,
  getTransactionById,
  addTransaction,
  updateTransaction,
  removeTransaction,
}
