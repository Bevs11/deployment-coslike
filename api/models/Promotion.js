const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema(
    {
        userId:{
            type: String,
            required: true
        },
        desc:{
            type: String,
            max: 500
        },
        img:{
            type: String,
        },
        tags:{
            type:Array,
            default:[],
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Promotion', PromotionSchema);