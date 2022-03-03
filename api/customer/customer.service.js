const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(page) {
    try {
        const limit = 10
        const skip = page * limit

        const collection = await dbService.getCollection('customer')
        const totalCustomers = await collection.countDocuments({})
        const customers = await collection.find({}).sort({ _id: -1 }).skip(skip).limit(limit).toArray()
        const pageAmount = Math.ceil(totalCustomers / limit)
        return { customers, pageAmount }
    }
    catch (err) {
        console.log('the err', err)
        logger.error('cannot find customers', err)
        throw err
    }

}

async function getById(customerId) {
    try {
        const collection = await dbService.getCollection('customer')
        const customer = await collection.findOne({ '_id': ObjectId(customerId) })
        customer.cerdit_card_number = `********${customer.cerdit_card_number.slice(6)}`
        return customer
    } catch (err) {
        logger.error(`while finding customer ${customerId}`, err)
        throw err
    }
}

async function remove(customerId) {
    try {
        const collection = await dbService.getCollection('customer')
        await collection.deleteOne({ '_id': ObjectId(customerId) })
        return customerId
    } catch (err) {
        logger.error(`cannot remove customer ${customerId}`, err)
        throw err
    }
}

async function add(customer) {
    try {
        const customerToAdd = { ...customer, phone: customer.phone + '', cerdit_card_number: customer.cerdit_card_number + '' }
        const collection = await dbService.getCollection('customer')
        await collection.insertOne(customerToAdd)
        return customerToAdd
    } catch (err) {
        logger.error('cannot insert customer', err)
        throw err
    }
}
async function update(customer) {
    try {
        let id = ObjectId(customer._id)
        delete customer._id
        const customerToUpdate = { ...customer, phone: customer.phone + '', cerdit_card_number: customer.cerdit_card_number + '' }
        const collection = await dbService.getCollection('customer')
        await collection.updateOne({ "_id": id }, { $set: { ...customerToUpdate } })
    } catch (err) {
        console.log('the err in update', err)
        logger.error(`cannot update customer ${customer._Id}`, err)
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