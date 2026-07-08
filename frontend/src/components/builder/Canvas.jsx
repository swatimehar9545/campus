import React from 'react';
import { useBuilderStore } from '../../store/builderStore';

export function Canvas() {
    const present = useBuilderStore(state => state.present);
    const deviceView = useBuilderStore(state => state.deviceView);

    // Calculate canvas width based on deviceView
    let canvasWidth = '100%';
    if (deviceView === 'mobile') canvasWidth = '375px';
    if (deviceView === 'tablet') canvasWidth = '768px';

    return (
        <div 
            className="bg-white shadow-lg transition-all duration-300 mx-auto"
            style={{ width: canvasWidth, minHeight: '100%' }}
        >
            {/* We will render the JSON tree here later */}
            <div className="p-8 text-center text-gray-500">
                <p>Drag and drop components here</p>
                <pre className="text-left mt-4 text-xs bg-gray-100 p-2 overflow-auto">
                    {JSON.stringify(present, null, 2)}
                </pre>
            </div>
        </div>
    );
}
