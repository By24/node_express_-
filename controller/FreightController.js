
'use strict';
import FreightModel from '../models/system/freight'
import AddressComponent from '../prototype/addressComponent'
import formidable from 'formidable'

class Freight extends AddressComponent {
	constructor() {
		super()
		this.add = this.add.bind(this)
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
				if (!fields.freight_name) {
					throw new Error('必须填写规则名称');
				}
			} catch (err) {
				console.log('前台参数出错', err.message);
				res.send({
					code: 0,
					message: err.message
				})
				return
			}

			const exists = await FreightModel.findOne({ freight_name: fields.freight_name });
			if (exists) {
				res.send({
					code: 0,
					message: '规则名称已存在，请添加其他规则名称'
				})
				return
			}

			try {
				const freight_id = await this.getId('freight_id');
				fields.freight_id = freight_id
				await FreightModel.create(fields)
				res.send({
					code: 1,
					message: '规则添加成功'
				})
			} catch (err) {
				console.log('获取数据数据失败', err);
				res.send({
					code: 0,
					message: '规则添加失败',
				})
				return
			}
		})
	}
}

export default new Freight()