import React from 'react';

export function Sidebar() {
    return (
        <div className="w-64 border-r dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
            <h3 className="font-semibold mb-4">Components</h3>
            <div className="space-y-2">
                <div className="p-2 border rounded cursor-grab bg-gray-50 dark:bg-gray-700">Section</div>
                <div className="p-2 border rounded cursor-grab bg-gray-50 dark:bg-gray-700">Heading</div>
                <div className="p-2 border rounded cursor-grab bg-gray-50 dark:bg-gray-700">Text</div>
                <div className="p-2 border rounded cursor-grab bg-gray-50 dark:bg-gray-700">Image</div>
                <div className="p-2 border rounded cursor-grab bg-gray-50 dark:bg-gray-700">Button</div>
            </div>
        </div>
    );
}
