import admin from './admin/admin'
import member from './member/member'
import system from './system/freight'
import goods from './goods/goods'
import category from './goods/category'

import Check from '../middlewares/check';
export default app =>{
    app.use('/admin', admin)
    app.use('/member', member)

    app.use('/system',system)
    app.use('/category', category)
    app.use('/goods', Check.checkAdmin ,goods)
}
