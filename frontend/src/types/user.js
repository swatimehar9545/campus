/**
 * Defines the structure of a User object
 * 
 * @typedef {Object} User
 * @property {string} id - Unique identifier for the user
 * @property {string} name - Full name of the user
 * @property {string} email - Email address
 * @property {string} avatar - URL to user avatar image
 * @property {string} plan - Current subscription plan (free, pro, business)
 * @property {string} role - User role (admin, user)
 * @property {string} createdAt - ISO string of creation date
 */

export const UserSchema = {
    // We can add runtime validation schema here (e.g., Zod or Joi) in the future
};
