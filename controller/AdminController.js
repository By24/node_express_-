'use strict';

import AdminModel from '../models/admin/admin'
import AddressComponent from '../prototype/addressComponent'
import crypto from 'crypto'
import formidable from 'formidable'
import Token from '../prototype/token'
class Admin extends AddressComponent {
	constructor() {
		super()
		this.register = this.register.bind(this)
		this.login = this.login.bind(this)
	}
	async login(req, res, next) {
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			if (err) {
				res.send({
					code: 0,
					type: 'FORM_DATA_ERROR',
					message: '表单信息错误'
				})
				return
			}
			const { email, password } = fields;
			try {
				if (!email) {
					throw new Error('用户名错误')
				} else if (!password) {
					throw new Error('密码错误')
				}
			} catch (err) {
				res.send({
					code: 0,
					type: 'GET_ERROR_PARAM',
					message: err.message,
				})
				return
			}

			const newpassword = this.encryption(password);
			try {
				const admin = await AdminModel.findOne({ email, password: newpassword })
				if (admin) {
					const newToken = await Token.createToken({ admin_id: admin.id })
					res.send({
						code: 1,
						data: {
							avatar: admin.avatar,
							email: admin.email,
							status: admin.status,
							admin: admin.admin,
							token: newToken,
						},
						msg: '登陆成功',
					})
				} else {
					res.send({
						code: 0,
						msg: '登陆失败',
					})
				}
			} catch (err) {
				res.send({
					code: 0,
					type: 'GET_ERROR_PARAM',
					message: err.message,
				})
				return
			}
		})
	}
	async register(req, res, next) {
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			if (err) {
				res.send({
					code: 0,
					type: 'FORM_DATA_ERROR',
					message: '表单信息错误'
				})
				return
			}
			const { email, password, status = 1 } = fields;
			try {
				if (!email) {
					throw new Error('用户名错误')
				} else if (!password) {
					throw new Error('密码错误')
				}
			} catch (err) {
				res.send({
					code: 0,
					type: 'GET_ERROR_PARAM',
					message: err.message,
				})
				return
			}

			try {
				const admin = await AdminModel.findOne({ email })
				if (admin) {
					res.send({
						code: 0,
						message: '该用户已经存在',
					})
				} else {
					const adminTip = (status == 1 ? '管理员' : '超级管理员');
					const admin_id = await this.getId('admin_id');
					const newpassword = this.encryption(password);
					const newAdmin = {
						email,
						password: newpassword,
						id: admin_id,
						create_time: new Date().toLocaleString(),
						admin: adminTip,
						status,
					}
					await AdminModel.create(newAdmin)
					res.send({
						code: 1,
						data: {
							email,
							admin: adminTip,
							create_time: newAdmin.create_time
						},
						message: '注册管理员成功',
					})
				}
			} catch (err) {
				res.send({
					code: 0,
					type: 'GET_ERROR_PARAM',
					message: err.message,
				})
				return
			}
		})
	}
	async list(req, res, next) {
		const admin = await AdminModel.find()
		res.send({
			code: 0,
			data: admin,
			type: 'GET_ERROR_PARAM',
		})
		return
	}
	async delete(req, res, next) {
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			const { email, password, status = 1 } = fields;
			res.send({
				code: 0,
				data: req.headers,
				type: 'GET_ERROR_PARAM',
			})
		})
	}
	encryption(password) {
		const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
		return newpassword
	}
	Md5(password) {
		const md5 = crypto.createHash('md5');
		return md5.update(password).digest('base64');
	}
}

export default new Admin()
