import { create } from 'zustand';

// Generate a random ID for components
const generateId = () => Math.random().toString(36).substr(2, 9);

// Default starting point for the canvas
const initialTree = [
    {
        id: 'root-container',
        type: 'container',
        props: {
            style: { padding: '20px', minHeight: '100vh', backgroundColor: '#ffffff' }
        },
        children: []
    }
];

export const useBuilderStore = create((set, get) => ({
    // State History for Undo/Redo
    past: [],
    present: initialTree,
    future: [],

    // Editor UI State
    selectedElementId: null,
    deviceView: 'desktop', // 'mobile', 'tablet', 'desktop'
    theme: 'light',
    
    // Auto-save logic can use this
    lastSaved: null,

    // Actions
    setDeviceView: (view) => set({ deviceView: view }),
    setTheme: (newTheme) => set({ theme: newTheme }),
    setSelectedElement: (id) => set({ selectedElementId: id }),

    // State Modification Actions (with history)
    _saveHistory: (newPresent) => {
        const { present, past } = get();
        // Limit history to 50 steps
        const newPast = [...past, present].slice(-50);
        set({
            past: newPast,
            present: newPresent,
            future: [],
            lastSaved: new Date().toISOString()
        });
        
        // Auto-save to localStorage
        try {
            localStorage.setItem('builder-state', JSON.stringify(newPresent));
        } catch (e) {
            console.error("Auto-save failed", e);
        }
    },

    addComponent: (parentId, componentType) => {
        const { present, _saveHistory } = get();
        const newComponent = {
            id: generateId(),
            type: componentType,
            props: { style: {} },
            children: [] // Only containers can have children realistically, but we generalize it
        };

        const recursiveAdd = (tree) => {
            return tree.map(node => {
                if (node.id === parentId) {
                    return { ...node, children: [...(node.children || []), newComponent] };
                }
                if (node.children) {
                    return { ...node, children: recursiveAdd(node.children) };
                }
                return node;
            });
        };

        const newTree = recursiveAdd(present);
        _saveHistory(newTree);
        set({ selectedElementId: newComponent.id });
    },

    updateComponentProps: (id, newProps) => {
        const { present, _saveHistory } = get();
        
        const recursiveUpdate = (tree) => {
            return tree.map(node => {
                if (node.id === id) {
                    return { ...node, props: { ...node.props, ...newProps } };
                }
                if (node.children) {
                    return { ...node, children: recursiveUpdate(node.children) };
                }
                return node;
            });
        };

        const newTree = recursiveUpdate(present);
        _saveHistory(newTree);
    },

    removeComponent: (id) => {
        const { present, _saveHistory, selectedElementId } = get();
        if (id === 'root-container') return; // Cannot delete root
        
        const recursiveRemove = (tree) => {
            return tree.filter(node => node.id !== id).map(node => {
                if (node.children) {
                    return { ...node, children: recursiveRemove(node.children) };
                }
                return node;
            });
        };

        const newTree = recursiveRemove(present);
        _saveHistory(newTree);
        if (selectedElementId === id) {
            set({ selectedElementId: null });
        }
    },

    // Undo / Redo Actions
    undo: () => {
        const { past, present, future } = get();
        if (past.length === 0) return;
        
        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);
        
        set({
            past: newPast,
            present: previous,
            future: [present, ...future]
        });
        
        // Auto-save on undo
        localStorage.setItem('builder-state', JSON.stringify(previous));
    },

    redo: () => {
        const { past, present, future } = get();
        if (future.length === 0) return;
        
        const next = future[0];
        const newFuture = future.slice(1);
        
        set({
            past: [...past, present],
            present: next,
            future: newFuture
        });
        
        // Auto-save on redo
        localStorage.setItem('builder-state', JSON.stringify(next));
    },

    // Load from memory (Auto Save recovery)
    loadState: () => {
        try {
            const saved = localStorage.getItem('builder-state');
            if (saved) {
                const parsed = JSON.parse(saved);
                set({ present: parsed, past: [], future: [] });
            }
        } catch (e) {
            console.error("Failed to load saved state", e);
        }
    }
}));
