const auth = require('../auth')
const express = require('express')
const UserController = require('../controllers/user-controller')
const TransactionController = require('../controllers/transaction-controller')
const ClubController = require('../controllers/club-controller')
const router = express.Router()

router.post('/register', UserController.registerUser)
router.get('/loggedIn', UserController.getLoggedIn)

router.post('/transactions', auth.verify, TransactionController.addTransaction)
router.delete('/transactions/:id', auth.verify, TransactionController.deleteTransaction)
router.put('/transactions/:id', auth.verify, TransactionController.updateTransaction)
router.get('/transactions/:id', auth.verify, TransactionController.getTransaction)

router.post('/club', ClubController.createClub)
router.get('/clubs', ClubController.getAllClubs)
router.get('/clubs/:id', ClubController.getClub)
router.put('/clubs/:id', ClubController.updateClub)
router.delete('/clubs/:id', ClubController.deleteClub)
module.exports = router