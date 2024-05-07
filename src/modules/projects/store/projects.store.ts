import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Project } from '../interfaces/project.interface';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '@vueuse/core';

/* const initialLoad = (): Project[] => {
  return [
    {
      id: uuidv4(),
      name: 'Project 1',
      tasks: [],
    },
    {
      id: uuidv4(),
      name: 'Project 2',
      tasks: [],
    },
  ];
}; */

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(useLocalStorage<Project[]>('projects', []));

  const addProject = (name: string) => {
    if (name.length === 0) return;
    projects.value.push({
      id: uuidv4(),
      name: name,
      tasks: [],
    });
  };

  const addTaskToProject = (projectId: string, taskName: string) => {
    if (taskName.trim().length === 0) return;
    const project = projects.value.find((prjct) => prjct.id === projectId);
    if (!project) return;
    project?.tasks.push({
      id: uuidv4(),
      name: taskName,
    });
  };

  const toogleTask = (projectId: string, taskId: string) => {
    const project = projects.value.find((p) => p.id === projectId);
    if (!project) return;
    const task = project.tasks.find((t) => t.id === taskId);
    if (!task) return;
    task.completedAt = task.completedAt ? undefined : new Date();
  };

  return {
    // Propiedades
    projects,
    // Getters
    projectList: computed(() => [...projects.value]),
    noProjects: computed(() => projects.value.length === 0),
    projectsWithCompletion: computed(() => {
      return projects.value.map((p) => {
        const total = p.tasks.length;
        const completed = p.tasks.filter((t) => t.completedAt).length;
        const complition = total === 0 ? 0 : (completed / total) * 100;
        return {
          id: p.id,
          name: p.name,
          taskCount: total,
          completion: Math.round(complition),
        };
      });
    }),
    // Actions
    addProject,
    addTaskToProject,
    toogleTask,
  };
});
