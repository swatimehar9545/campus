import { create } from 'zustand';

export const useAiStore = create((set) => ({
    isGenerating: false,
    lastPrompt: '',
    generatedContent: null,
    history: [],

    setGenerating: (status) => set({ isGenerating: status }),
    
    saveGenerationResult: (prompt, content) => set((state) => ({
        lastPrompt: prompt,
        generatedContent: content,
        history: [{ prompt, content, date: new Date() }, ...state.history].slice(0, 20) // Keep last 20
    })),

    clearHistory: () => set({ history: [] })
}));
