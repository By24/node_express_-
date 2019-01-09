
'use strict';

import GoodsModel from '../models/goods/goods'
import AddressComponent from '../prototype/addressComponent'
import formidable from 'formidable'

class Goods extends AddressComponent {
	constructor() {
		super()
		this.add = this.add.bind(this)
	}
	async list(req, res, next) {
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			if (err) {
				res.send({
					code: 0,
					message: '表单信息错误'
				})
				return
			}
			const { member_id, limit = 10, offset = 0 } = fields;
			// limit 每次限制多少条
			// offset 从第几条开始显示limit条
			try {
				if (!member_id || !Number(member_id)) {
					throw new Error('member_id参数错误')
				} else if (!Number(limit)) {
					throw new Error('limit参数错误')
				} else if (typeof Number(offset) !== 'number') {
					throw new Error('offset参数错误')
				}
			} catch (err) {
				console.log(err.message, err);
				res.send({
					code: 0,
					message: err.message
				})
				return
			}
			try {
				// const goods = await GoodsModel.find({}, '-_id').sort({ id: 1 }).limit(Number(limit)).skip(Number(offset)).populate('goods_category');
				const goods = await GoodsModel.find({}, '-_id').sort({ id: 1 }).limit(Number(limit)).skip(Number(offset)).populate('goods_category');
				res.send({
					code: 1,
					data: goods,
					message: '获取商品成功'
				})
			} catch (err) {
				console.log('获取数据失败', err);
				res.send({
					code: 0,
					message: '获取数据失败',
				})
				return
			}

		})
	}
	async add(req, res, next) {
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			if (err) {
				res.send({
					code: 0,
					message: '表单信息错误'
				})
				return
			}

			try {
				if (!fields.goods_name) {
					throw new Error('必须填写商品名称');
				} else if (!fields.goods_category) {
					throw new Error('必须选择商品分类');
				}
			} catch (err) {
				console.log('前台参数出错', err.message);
				res.send({
					code: 0,
					message: err.message
				})
				return
			}

			const exists = await GoodsModel.findOne({ goods_name: fields.goods_name });
			if (exists) {
				res.send({
					code: 0,
					message: '商品已存在，请添加其他商品名称'
				})
				return
			}

			try {
				const goods_id = await this.getId('goods_id');
				fields.goods_id = goods_id
				await GoodsModel.create(fields)
				res.send({
					code: 1,
					message: '商品添加成功'
				})
			} catch (err) {
				console.log('获取数据数据失败', err);
				res.send({
					code: 0,
					err:err,
					message: '添加商品失败',
				})
				return
			}
		})
	}
}

export default new Goods()