import React from 'react';
import { useBuilderStore } from '../../store/builderStore';

export function TopBar() {
    const undo = useBuilderStore(state => state.undo);
    const redo = useBuilderStore(state => state.redo);
    const setDeviceView = useBuilderStore(state => state.setDeviceView);
    const deviceView = useBuilderStore(state => state.deviceView);

    return (
        <div className="h-14 border-b dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between px-4">
            <div className="font-bold text-lg">AI Builder</div>
            <div className="flex gap-2">
                <button onClick={() => setDeviceView('mobile')} className={`px-2 py-1 rounded ${deviceView === 'mobile' ? 'bg-blue-100 dark:bg-blue-900' : ''}`}>Mobile</button>
                <button onClick={() => setDeviceView('tablet')} className={`px-2 py-1 rounded ${deviceView === 'tablet' ? 'bg-blue-100 dark:bg-blue-900' : ''}`}>Tablet</button>
                <button onClick={() => setDeviceView('desktop')} className={`px-2 py-1 rounded ${deviceView === 'desktop' ? 'bg-blue-100 dark:bg-blue-900' : ''}`}>Desktop</button>
            </div>
            <div className="flex gap-2">
                <button onClick={undo} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">Undo</button>
                <button onClick={redo} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">Redo</button>
            </div>
        </div>
    );
}
