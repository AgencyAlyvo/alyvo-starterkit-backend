import UserTransformer from '#transformers/user_transformer'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * Controller for managing the authenticated user's profile.
 */
export default class ProfileController {
  /**
   * Return the authenticated user's profile.
   */
  public async show({ auth, serialize }: HttpContext): Promise<unknown> {
    return serialize(UserTransformer.transform(auth.getUserOrFail()))
  }
}
