import { Router } from 'express'
import publicRoutes from './publicRoutes/publicRoutes.js'

const routes = Router()

routes.use('/public', publicRoutes)




export default routes


