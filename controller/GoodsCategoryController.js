
'use strict';

import CategoryModel from '../models/goods/category'
import AddressComponent from '../prototype/addressComponent'
import formidable from 'formidable'

class Category extends AddressComponent {
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
                if (!fields.category_name) {
                    throw new Error('必须填写分类名称');
                }
            } catch (err) {
                console.log('前台参数出错', err.message);
                res.send({
                    code: 0,
                    message: err.message
                })
                return
            }

            const exists = await CategoryModel.findOne({ category_name: fields.category_name });
            if (exists) {
                res.send({
                    code: 0,
                    message: '分类名称已存在，请添加其他分类名称'
                })
                return
            }

            try {
                const category_id = await this.getId('category_id');
                fields.category_id = category_id
                await CategoryModel.create(fields)
                res.send({
                    code: 1,
                    message: '分类添加成功'
                })
            } catch (err) {
                console.log('获取数据数据失败', err);
                res.send({
                    code: 0,
                    message: '分类添加失败',
                })
                return
            }
        })

    }
}

export default new Category()