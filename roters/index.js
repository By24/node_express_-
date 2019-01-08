import admin from './admin/admin'
import system from './system/permission'
import goods from './goods/goods'
import category from './goods/category'
export default app =>{
    app.use('/admin', admin)
    app.use('/system',system)
    app.use('/goods', goods)
    app.use('/category', category)
}
