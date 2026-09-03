import User from '#models/user'
import { loginValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import type { AccessToken } from '@adonisjs/auth/access_tokens'
import UserTransformer from '#transformers/user_transformer'

/**
 * Controller for managing access tokens (login/logout).
 */
export default class AccessTokensController {
  /**
   * Authenticate a user with email and password, and return an access token.
   */
  public async store({ request, serialize }: HttpContext): Promise<unknown> {
    const { email, password }: { email: string; password: string } = await request.validateUsing(loginValidator)

    const user: User = await User.verifyCredentials(email, password)
    const token: AccessToken = await User.accessTokens.create(user)

    return serialize({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    })
  }

  /**
   * Revoke the current access token (logout).
   */
  public async destroy({ auth }: HttpContext): Promise<{ message: string }> {
    const user: User = auth.getUserOrFail()
    if (user.currentAccessToken) {
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    }

    return {
      message: 'Logged out successfully',
    }
  }
}
