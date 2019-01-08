'use strict';

import mongoose from 'mongoose'

const idsSchema = new mongoose.Schema({
	goods_id: Number,
	category_id: Number,
	freight_id: Number
});

const Ids = mongoose.model('Ids', idsSchema);

Ids.findOne((err, data) => {
	if (!data) {
		const newIds = new Ids({
			goods_id: 0,
			category_id: 0
		});
		newIds.save();
	}
})
export default Ids