'use strict';

import AdminModel from '../models/admin/admin'
import Token from '../prototype/token'
import MemberModel from '../models/member/member'
// import SessionModel from '../models/Session'
class Check {
	constructor() {

	}
	async checkAdmin(req, res, next) {
		const tokens = req.headers.token
		const checkToken = await Token.checkToken(tokens);

		if (checkToken) {
			let member_info = Token.decodeToken(tokens);
			const member_id = await MemberModel.findOne({ member_id: member_info.payload.data.member_id });
			console.log(checkToken, member_info.payload.data.member_id)







		} else {
			res.send({
				code: 0,
				message: '无效令牌',
			})
			return
		}



		next()
		return
		const admin_id = req.session.admin_id;
		if (!admin_id || !Number(admin_id)) {
			res.send({
				status: 0,
				type: 'ERROR_SESSION',
				message: '亲，您还没有登录',
			})
			return
		} else {
			const admin = await AdminModel.findOne({ id: admin_id });
			if (!admin) {
				res.send({
					status: 0,
					type: 'HAS_NO_ACCESS',
					message: '亲，您还不是管理员',
				})
				return
			}
		}
		next()
	}
	async checkSuperAdmin(req, res, next) {
		const tokens = req.headers.token
		const newToken = await Token.decodeToken(tokens);
		const newCheckToken = await Token.checkToken(tokens);

		if (!newCheckToken || !newToken) {
			res.send({
				status: 5000,
				message: '无效令牌',
			})
			return
		}
		const admin_id = newToken.payload.data.admin_id;

		if (!admin_id || !Number(admin_id)) {
			res.send({
				status: 101,
				type: 'ERROR_SESSION',
				data: newToken,
				message: '亲，您还没有登录',
			})
			return
		} else {
			const admin = await AdminModel.findOne({ id: admin_id });
			if (!admin || admin.status != 1) {
				res.send({
					status: 0,
					type: 'HAS_NO_ACCESS',
					message: '亲，您的权限不足',
				})
				return
			}
		}
		next()
	}
}

export default new Check()