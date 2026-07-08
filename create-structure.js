const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'frontend', 'src');

// Function to create directories recursively
function createDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// Function to create empty files
function createFile(filePath) {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '');
    }
}

// Folders
const folders = [
    'assets/images', 'assets/icons', 'assets/fonts', 'assets/videos', 'assets/logos', 'assets/templates', 'assets/avatars', 'assets/illustrations', 'assets/backgrounds', 'assets/lottie', 'assets/sounds',
    'components/common', 'components/layout', 'components/authentication', 'components/dashboard', 'components/ai', 'components/builder', 'components/preview', 'components/editor', 'components/templates', 'components/themes', 'components/export', 'components/analytics', 'components/profile', 'components/settings', 'components/notifications', 'components/pricing', 'components/history', 'components/deployment', 'components/seo', 'components/chatbot', 'components/comments', 'components/collaboration', 'components/onboarding', 'components/marketplace', 'components/feedback', 'components/billing', 'components/integrations', 'components/accessibility', 'components/animations', 'components/widgets',
    'pages', 'layouts', 'routes', 'context', 'hooks', 'services', 'api', 'utils', 'styles', 'store', 'constants', 'config', 'lib', 'types', 'mock', 'i18n'
];

folders.forEach(folder => createDir(path.join(srcDir, folder)));

// Files
const files = {
    'pages': ['Home.jsx', 'Dashboard.jsx', 'Builder.jsx', 'Preview.jsx', 'Templates.jsx', 'Marketplace.jsx', 'Deploy.jsx', 'SEO.jsx', 'Billing.jsx', 'Subscription.jsx', 'Integrations.jsx', 'Feedback.jsx', 'Documentation.jsx', 'Changelog.jsx', 'Team.jsx', 'Invite.jsx', 'Settings.jsx'],
    'store': ['authStore.js', 'builderStore.js', 'projectStore.js', 'aiStore.js'],
    'constants': ['routes.js', 'colors.js', 'themes.js', 'apiEndpoints.js'],
    'config': ['appConfig.js', 'environment.js'],
    'lib': ['ai.js', 'export.js', 'storage.js'],
    'types': ['user.js', 'project.js', 'template.js'],
    'mock': ['templates.js', 'projects.js'],
    'i18n': ['en.json', 'hi.json']
};

for (const [folder, fileList] of Object.entries(files)) {
    fileList.forEach(file => createFile(path.join(srcDir, folder, file)));
}

console.log("Structure created successfully!");
