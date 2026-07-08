import { API_ENDPOINTS } from '../constants/apiEndpoints';

/**
 * Service to handle all AI related operations
 */
export const aiService = {
  
  /**
   * Generates website structure based on a text prompt
   * @param {string} prompt - User description of the website
   * @returns {Promise<Object>} - The JSON tree of the generated website
   */
  async generateWebsite(prompt) {
    // Mocking the API response for now until backend is connected
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'generated-header',
            type: 'Section',
            props: { style: { padding: '40px', backgroundColor: '#f3f4f6' } },
            children: [
              {
                id: 'generated-title',
                type: 'Heading',
                props: { text: `AI Generated: ${prompt}`, style: { fontSize: '32px' } }
              }
            ]
          }
        ]);
      }, 1500);
    });
  },

  /**
   * Refines a specific component's text or layout using AI
   * @param {Object} componentData - Existing component JSON
   * @param {string} instruction - What to change
   */
  async refineComponent(componentData, instruction) {
    // Placeholder for backend API call
    console.log("Refining component via AI...", instruction);
    return { ...componentData };
  }
};
