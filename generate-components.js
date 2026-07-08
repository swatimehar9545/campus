const fs = require('fs');
const path = require('path');

const components = [
    'analytics', 'profile', 'settings', 'notifications', 'pricing', 'history', 'deployment', 'seo', 'chatbot', 'comments', 'collaboration', 'onboarding', 'marketplace', 'feedback', 'billing', 'integrations', 'accessibility', 'animations', 'widgets'
];

const basePath = path.join(__dirname, 'frontend', 'src', 'components');

components.forEach(comp => {
    const dir = path.join(basePath, comp);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    // Capitalize component name for React
    const compName = comp.charAt(0).toUpperCase() + comp.slice(1);
    const filePath = path.join(dir, `${compName}.jsx`);
    
    const code = `import React from 'react';\n\nexport default function ${compName}() {\n  return (\n    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">\n      <h2 className="text-xl font-bold mb-2">${compName} Component</h2>\n      <p className="text-gray-600 dark:text-gray-300">This is a placeholder for the ${compName} feature.</p>\n    </div>\n  );\n}\n`;
    
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, code);
    }
});

console.log("All components created successfully!");
