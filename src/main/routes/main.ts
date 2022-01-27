import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeTestController } from '@/main/factories/application/controllers'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/test', adapt(makeTestController()))
  router.post('/auth/test', auth, adapt(makeTestController()))
}
