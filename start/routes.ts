import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

/**
 * Routes système
 */
import './routes/swagger.js'
import './routes/health.js'

/**
 * Routes métiers
 */

/**
 * Cette route est utilisée pour tester le fonctionnement de base de l'application.
 */
router.get('/', async (): Promise<{ hello: string }> => {
  return {
    hello: 'test',
  }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())
  })
  .prefix('/api/v1')
