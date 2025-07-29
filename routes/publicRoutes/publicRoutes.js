import { getMonthlyData } from '#controllers/reports/reports.js'
import { Router } from 'express'

const publicRoutes = Router()

publicRoutes.route('/reports/analytics/:startDate/:endDate').get(getMonthlyData)
publicRoutes.route("/saleAnalytics/:year/:month").get(getSaleAnalytics)



export default publicRoutes


