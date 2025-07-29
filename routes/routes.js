import { insertData } from '#controllers/insertData/insertData.js'
import { Router } from 'express'
import publicRoutes from './publicRoutes/publicRoutes.js'

const routes = Router()

routes.use('/public', publicRoutes)
routes.get("/insertData", insertData)


export default routes


