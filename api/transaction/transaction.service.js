const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId



async function query(page) {
    try {
        const limit = 6
        const skip = page * limit
        const collection = await dbService.getCollection('transaction')
        const totalTransactions = await collection.countDocuments({})
        const transactions = await collection.find({}).sort({ _id: -1 }).skip(skip).limit(limit).toArray()
        const pageAmount = Math.ceil(totalTransactions / limit)

        return { transactions, pageAmount }
    }
    catch (err) {
        console.log('the err', err)
        logger.error('cannot find transactions', err)
        throw err
    }

}


async function getById(transactionId) {
    try {
        const collection = await dbService.getCollection('transaction')
        const transaction = await collection.findOne({ '_id': ObjectId(transactionId) })
        return transaction
    } catch (err) {
        logger.error(`while finding transaction ${transactionId}`, err)
        throw err
    }
}

async function remove(transactionId) {
    try {
        const collection = await dbService.getCollection('transaction')
        await collection.deleteOne({ '_id': ObjectId(transactionId) })
        return transactionId
    } catch (err) {
        logger.error(`cannot remove transaction ${transactionId}`, err)
        throw err
    }
}

async function add(transaction) {
    try {
        const collection = await dbService.getCollection('transaction')
        await collection.insertOne(transaction)
        return transaction
    } catch (err) {
        logger.error('cannot insert transaction', err)
        throw err
    }
}
async function update(transaction) {
    try {
        let id = ObjectId(transaction._id)
        delete transaction._id
        const collection = await dbService.getCollection('transaction')
        await collection.updateOne({ "_id": id }, { $set: { ...transaction } })
    } catch (err) {
        console.log('the err in update', err)
        logger.error(`cannot update transaction ${transaction._Id}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}