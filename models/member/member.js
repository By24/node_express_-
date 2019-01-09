'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const memberSchema = new Schema({
    member_id: Number,
    member_pwd: String,
    member_name: String,
    member_category_time: {
        type: Date,
        default: new Date()
    }
})

memberSchema.index({ id: 1 });

const Member = mongoose.model('ff__Member', memberSchema);


export default Member
