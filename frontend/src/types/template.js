/**
 * Defines the structure of a Template
 * 
 * @typedef {Object} Template
 * @property {string} id - Unique identifier
 * @property {string} title - Template name
 * @property {string} category - Category (Portfolio, E-commerce, Landing Page)
 * @property {string} thumbnail - URL to thumbnail preview
 * @property {Array<Object>} content - The initial JSON tree for the builder
 * @property {boolean} isPremium - Whether the template requires a paid plan
 */

export const TemplateSchema = {
    // We can add runtime validation schema here in the future
};
