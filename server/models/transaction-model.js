const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = new Schema(
    {
        title: {type: String, required: true},
        transactionAmount: { type: Number, required: true},
        organizationFor: {type: String, required: true},
        recordedBy: {type: String, required: true},
        description: {type: String, required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Transaction', TransactionSchema);