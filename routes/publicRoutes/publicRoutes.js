import { getSaleAnalytics } from '#controllers/analytics/analytics.js'
import { getTopProductsByOrder } from '#controllers/getTopProductsByOrder/getTopProductsByOrder.js'
import { getMonthlyData } from '#controllers/reports/reports.js'
import { Router } from 'express'

const publicRoutes = Router()

publicRoutes.route('/reports/analytics/:startDate/:endDate').get(getMonthlyData)
publicRoutes.route('/topProductsByOrder/:startDate/:endDate').get(getTopProductsByOrder)
publicRoutes.route("/saleAnalytics/:year/:month").get(getSaleAnalytics)



export default publicRoutes


