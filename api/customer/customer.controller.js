const customerService = require('./customer.service.js');
const logger = require('../../services/logger.service')

// GET LIST
async function getCustomers(req, res) {

  const { ismini, page } = req.query
  try {
    const customersInfo = await customerService.query(page)
    if (ismini) {
      const miniCustomers = customersInfo.customers.map((customer) => {
        return {
          _id: customer._id,
          fullname: customer.fullname,
        }
      })
      res.json(miniCustomers);
    } else {
      res.json(customersInfo);
    }

  } catch (err) {
    console.log(err)
    logger.error('Failed to get customer', err)
    res.status(500).send({ err: 'Failed to get customer' })
  }
}

// GET BY ID 
async function getCustomerById(req, res) {
  try {
    const customerId = req.params.id;
    const customer = await customerService.getById(customerId)
    res.json(customer)
  } catch (err) {
    logger.error('Failed to get customer', err)
    res.status(500).send({ err: 'Failed to get customer' })
  }
}

// POST (add customer)
async function addCustomer(req, res) {
  try {
    const customer = req.body;
    const addedCustomer = await customerService.add(customer)
    res.json(addedCustomer)
  } catch (err) {
    logger.error('Failed to add customer', err)
    res.status(500).send({ err: 'Failed to add customer' })
  }
}

// PUT (Update customer)
async function updateCustomer(req, res) {
  try {
    const customer = req.body;
    await customerService.update(customer)
    res.json(customer)
  } catch (err) {
    logger.error('Failed to update customer', err)
    res.status(500).send({ err: 'Failed to update customer' })

  }
}

// DELETE (Remove customer)
async function removeCustomer(req, res) {
  try {
    const customerId = req.params.id;
    const removedId = await customerService.remove(customerId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove customer', err)
    res.status(500).send({ err: 'Failed to remove customer' })
  }
}

module.exports = {
  getCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  removeCustomer,
}
