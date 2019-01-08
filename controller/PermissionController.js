
'use strict';

import PermissionModel from '../models/system/permission'
import AddressComponent from '../prototype/addressComponent'
import formidable from 'formidable'

class Permission extends AddressComponent {
	constructor() {
		super()
	}
	async add(req, res, next) {
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			
		})
    }
}

export default new Permission()