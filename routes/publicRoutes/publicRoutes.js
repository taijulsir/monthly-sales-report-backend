import { Router } from 'express'
import { getSaleAnalytics } from '#controllers/analytics/analytics.js'
import { getMonthlyData } from '#controllers/reports/reports.js'
import { getTopProductsByOrder } from '#controllers/topProducts/getProductsByOrder/getProductsByOrder.js'
import { getTopProductsByShop } from '#controllers/topProducts/getProductsByShop/getProductsByShop.js'

const publicRoutes = Router()

publicRoutes.route('/reports/analytics/:startDate/:endDate').get(getMonthlyData)
publicRoutes.route("/saleAnalytics/:year/:month").get(getSaleAnalytics)
publicRoutes.route('/topProductsByOrder/:startDate/:endDate').get(getTopProductsByOrder)
publicRoutes.route("/topProductsByShop").get(getTopProductsByShop)


export default publicRoutes


