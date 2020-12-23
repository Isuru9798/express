const mongoose = require('mongoose');
const schema = mongoose.Schema;

const promoSchema = new schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true

        },
        label: {
            type: String,
            required: true,
            default: ''
        },
        price: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true

        },
        featured: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("Promo", promoSchema);