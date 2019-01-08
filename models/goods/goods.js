'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const goodsSchema = new Schema({
	goods_id: Number,                   // 商品id
	goods_name: String,			        // 商品名称
	goods_sn: Number,				    // 商品编号
	goods_category: {
		// 关联分类的id
        type: Schema.Types.ObjectId,
        // 引用
        ref: "Category"
	},	 		    					// 商品所属分类 
	goods_image: String,				// 商品展示图
	goods_cost: Number,					// 商品原价
	goods_price: Number,				// 商品售价
	goods_stock: Number,				// 商品库存
	goods_actual_sales: Number,			// 商品实际销量
	goods_virtual_sales: Number,		// 商品虚拟销量
	goods_status: Boolean,				// 商品上下架状态
	goods_state: Boolean,				// 商品删除状态
	goods_url: String,					// 商品链接地址
	goods_unit: String,					// 商品单位（件、个...）
	goods_weight: Number,           	// 商品重量
	goods_service: String,				// 商品服务内容（如：正品保障,极速发货，7天退换货）
	goods_freight: Number,				// 运费设置（取运费设置表的id）
	goods_pieces_mail: Number,			// 满件包邮（0或空，则不支持满件包邮）
	goods_limit_mail: Number,			// 满额包邮
	goods_deliver: Number,				// 发货方式（1、快递或自提2、仅快递3、仅自提） 
	goods_lessen: Number,				// 减库存方式(1、拍下减库存2、付款减库存)
	// goods_spec: Number,					// 商品规格
	goods_details: String				// 商品图文详情
	
},{
	versionKey: false
})

goodsSchema.index({ id: 1 });

const  GoodsModel = mongoose.model('Goods', goodsSchema);


export default GoodsModel