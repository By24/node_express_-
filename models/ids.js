'use strict';

import mongoose from 'mongoose'

const idsSchema = new mongoose.Schema({
	goods_id: Number,
	category_id: Number,
	freight_id: Number,
	member_id: Number
});

const Ids = mongoose.model('ff__Ids', idsSchema);

Ids.findOne((err, data) => {
	if (!data) {
		const newIds = new Ids({
			goods_id: 0,
			category_id: 0,
			freight_id: 0,
			member_id: 0,
		});
		newIds.save();
	}
})
export default Ids