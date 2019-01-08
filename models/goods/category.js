'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const categorySchema = new Schema({
	category_id: Number,                   // 商品分类id
    category_name: String,                 // 商品分类名称
	
},{
	versionKey: false
})

categorySchema.index({ id: 1 });

const  CategoryModel = mongoose.model('Category', categorySchema);


export default CategoryModel