import React from 'react';
import { useBuilderStore } from '../../store/builderStore';

export function SettingsPanel() {
    const selectedElementId = useBuilderStore(state => state.selectedElementId);

    return (
        <div className="w-72 border-l dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
            <h3 className="font-semibold mb-4">Properties</h3>
            {selectedElementId ? (
                <div>
                    <p className="text-sm text-gray-500">Editing: {selectedElementId}</p>
                    {/* Settings fields will go here */}
                </div>
            ) : (
                <p className="text-sm text-gray-500">Select an element to edit</p>
            )}
        </div>
    );
}
