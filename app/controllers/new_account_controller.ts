import User from '#models/user'
import { signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import type { AccessToken } from '@adonisjs/auth/access_tokens'
import UserTransformer from '#transformers/user_transformer'

/**
 * Controller for creating new user accounts (signup).
 */
export default class NewAccountController {
  /**
   * Register a new user and return an access token.
   */
  public async store({ request, serialize }: HttpContext): Promise<unknown> {
    const { fullName, email, password }: { fullName: string | null; email: string; password: string } =
      await request.validateUsing(signupValidator)

    const user: User = await User.create({ fullName, email, password })
    const token: AccessToken = await User.accessTokens.create(user)

    return serialize({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    })
  }
}
