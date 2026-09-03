import type User from '#models/user'
import { BaseTransformer } from '@adonisjs/core/transformers'

/**
 * Transformer for serializing User model data.
 */
export default class UserTransformer extends BaseTransformer<User> {
  /**
   * Convert the user resource to a plain object with selected fields.
   */
  public toObject(): Pick<User, 'id' | 'fullName' | 'email' | 'createdAt' | 'updatedAt'> {
    return this.pick(this.resource, ['id', 'fullName', 'email', 'createdAt', 'updatedAt'])
  }
}
