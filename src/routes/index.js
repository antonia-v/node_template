import Router from 'koa-router'
import getHealth from './health/health'
import promotions from './promotions/promotions'

const router = new Router()

router.get('/health', getHealth)

router.post('/api/get-promotions', promotions.getPromotions)

export default router
