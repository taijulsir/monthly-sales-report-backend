import { getMonthlyData } from '#controllers/reports/analytics.js'
import { Router } from 'express'

const publicRoutes = Router()

publicRoutes.route('/reports/analytics/:startDate/:endDate').get(getMonthlyData)



export default publicRoutes


