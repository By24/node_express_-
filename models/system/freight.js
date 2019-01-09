'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const freightSchema = new Schema({
	freight_id: Number,
	freight_name: String,
})

freightSchema.index({ id: 1 });

const Freight = mongoose.model('ff__Freight', freightSchema);


export default Freight
