import { Router } from 'express'
import publicRoutes from './publicRoutes/publicRoutes.js'
import { insertData } from '#controllers/insertData/insertData.js'
import { OrderItem } from '#models/orderItem/orderItemModel.js'
import { Order } from '#models/order/orderModel.js'

const routes = Router()

routes.use('/public', publicRoutes)
routes.get("/insertData", insertData)


export default routes


