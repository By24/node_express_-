import admin from './admin/admin'
import system from './system/freight'
import goods from './goods/goods'
import category from './goods/category'
export default app =>{
    app.use('/admin', admin)
    app.use('/system',system)
    app.use('/category', category)
    app.use('/goods', goods)
}
