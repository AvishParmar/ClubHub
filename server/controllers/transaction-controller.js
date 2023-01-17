const Transaction = require('../models/transaction-model');

addTransaction = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Transaction',
        })
    }

    const transaction = new Transaction(body);
    console.log("creating transaction: " + JSON.stringify(top5List));
    if (!transaction) {
        return res.status(400).json({ success: false, error: err })
    }

    transaction
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                transaction: transaction,
                message: 'Transaction Added!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Transaction Not Added!'
            })
        })
}

deleteTransaction = async(req, res) => {
    Transaction.findById({ _id: req.params.id }, (err, transaction) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Transaction not found!',
            })
        }
        Transaction.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: transaction })
        }).catch(err => console.log(err))
    })
}

updateTransaction = async(req, res) => {
    const body = req.body
    console.log("updateTransaction: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Transaction.findOne({ _id: req.params.id }, (err, transaction) => {
        console.log("transaction found: " + JSON.stringify(transaction));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Transaction not found!',
            })
        }

        transaction.title = body.title
        transaction.transactionAmount = body.transactionAmount
        transaction.recordedBy = body.recordedBy
        transaction.description = body.description
        transaction
            .save()
            .then(() => {
                console.log("SUCCESS: Transaction Updated!");
                return res.status(200).json({
                    success: true,
                    id: transaction._id,
                    message: 'Transaction updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Transaction not updated!',
                })
            })
    })
}

getTransaction = async(req, res) => {
    await Transaction.findById({ _id: req.params.id }, (err, transaction) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true, transaction: transaction })
    }).catch(err => console.log(err))
}

module.exports = {
    addTransaction,
    deleteTransaction,
    updateTransaction,
    getTransaction,
}