import admin from './admin'
import system from './system/permission'
export default app =>{
    app.use('/admin', admin);
    app.use('/system',system)
}
