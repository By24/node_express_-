'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const permissionSchema = new Schema({
	id:Number,
	name:String,
	weigh:Number,
	icon:String,
	permission:[{
		name:String,
		weigh:Number,
		icon:String,
		rule:String,
		permission:Array
	}],
})

permissionSchema.index({ id: 1 });

const  Permission = mongoose.model(' Permission', permissionSchema);


export default Permission
