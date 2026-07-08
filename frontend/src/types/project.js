/**
 * Defines the structure of a Project (Website)
 * 
 * @typedef {Object} Project
 * @property {string} id - Unique identifier for the project
 * @property {string} userId - Owner ID
 * @property {string} name - Name of the website
 * @property {string} description - Short description
 * @property {string} subdomain - Allocated subdomain (e.g., mysite.builder.app)
 * @property {Array<Object>} content - The JSON tree of the website structure
 * @property {string} status - Draft, Published, Archived
 * @property {string} lastModified - ISO string of last edit
 * @property {string} createdAt - ISO string of creation date
 */

export const ProjectSchema = {
    // We can add runtime validation schema here in the future
};
