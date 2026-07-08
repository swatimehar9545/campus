import { create } from 'zustand';

export const useProjectStore = create((set) => ({
    projects: [],
    currentProject: null,
    isLoading: false,

    setProjects: (projectsList) => set({ projects: projectsList }),
    
    setCurrentProject: (project) => set({ currentProject: project }),

    addProject: (project) => set((state) => ({ 
        projects: [...state.projects, project] 
    })),

    removeProject: (projectId) => set((state) => ({
        projects: state.projects.filter(p => p.id !== projectId),
        currentProject: state.currentProject?.id === projectId ? null : state.currentProject
    })),
}));
