const auth = require('../auth')
const express = require('express')
const UserController = require('../controllers/user-controller')
const TransactionController = require('../controllers/transaction-controller')
const router = express.Router()

router.post('/register', UserController.registerUser)
router.get('/loggedIn', UserController.getLoggedIn)

router.post('/transactions', auth.verify, TransactionController.addTransaction)
router.delete('/transactions/:id', auth.verify, TransactionController.deleteTransaction)
router.put('/transactions/:id', auth.verify, TransactionController.updateTransaction)
router.get('/transactions/:id', auth.verify, TransactionController.getTransaction)

module.exports = router