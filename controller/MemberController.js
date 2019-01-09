'use strict';

import MemberModel from '../models/member/member'
import AddressComponent from '../prototype/addressComponent'
import formidable from 'formidable'
import Token from '../prototype/token'

class Member extends AddressComponent {
    constructor() {
        super()
        this.register = this.register.bind(this)
        this.login = this.login.bind(this)
    }
    async register(req, res, next) {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                res.send({
                    code: 0,
                    message: '表单信息错误'
                })
                return
            }
            const { member_name, member_pwd } = fields;
            try {
                if (!member_name) {
                    throw new Error('用户名错误')
                } else if (!member_pwd) {
                    throw new Error('密码错误')
                }
            } catch (err) {
                res.send({
                    code: 0,
                    message: err.message,
                })
                return
            }

            const exists = await MemberModel.findOne({ member_name });
            if (exists) {
                res.send({
                    code: 0,
                    message: '用户已存在，请填写其他用户名称'
                })
                return
            }

            const newpassword = this.encryption(member_pwd);
            try {
                const member_id = await this.getId('member_id');
                await MemberModel.create({
                    member_id,
                    member_name,
                    member_pwd: newpassword
                })
                const newToken = await Token.createToken({ member_id })
                res.send({
                    code: 1,
                    token: newToken,
                    message: '用户注册成功'
                })
            } catch (err) {
                console.log('获取数据数据失败', err);
                res.send({
                    code: 0,
                    err: err,
                    message: '用户注册失败',
                })
                return
            }
        })
    }
    async login(req, res, next) {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                res.send({
                    code: 0,
                    message: '表单信息错误'
                })
                return
            }
            const { member_name, member_pwd } = fields;

            const newpassword = this.encryption(member_pwd);

            try {
                const newMemberInfo = await MemberModel.findOne({ member_name, member_pwd: newpassword })
                const newToken = await Token.createToken({ member_id: newMemberInfo.member_id })
                if (newMemberInfo) {
                    res.send({
                        code: 1,
                        token: newToken,
                        message: '用户登陆成功'
                    })
                } else {
                    res.send({
                        code: 0,
                        message: '用户登陆失败',
                    })
                }
            } catch (err) {
                console.log('获取数据数据失败', err);
                res.send({
                    code: 0,
                    err: err,
                    message: '用户登陆失败',
                })
                return
            }
        })
    }
}

export default new Member()
