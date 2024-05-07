<template>
  <div class="overflow-x-auto w-full">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Proyecto</th>
          <th>Tareas</th>
          <th>Favorite Color</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="hover"
          v-for="(project, index) in projectsStore.projectsWithCompletion"
          :key="project.id"
        >
          <th>{{ index + 1 }}</th>
          <td>{{ project.name }}</td>
          <td>{{ project.taskCount }}</td>
          <td>
            <progress
              class="progress progress-primary w-56"
              :value="project.completion"
              max="100"
            ></progress>
            {{ project.completion }}%
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- Modal -->
  <input-modal
    title="Modal"
    sub-title="Press ESC key or click the button below to close"
    :open="modalOpen"
    @close="modalOpen = false"
    @value="projectsStore.addProject"
    placeholder="Ingrese el nombre del proyecto"
  />

  <custom-modal :open="customModalOpen">
    <template #header>
      <h1 class="text-3xl">Titulo modal</h1>
    </template>

    <template #body>
      <p>
        Proident cupidatat do dolore voluptate consectetur nostrud ullamco sit elit ad non. Eiusmod
        ipsum esse culpa quis dolore eu amet. Occaecat pariatur do ullamco nisi et culpa mollit
        veniam amet laboris consequat non. Id ad minim ullamco quis cupidatat mollit minim
        incididunt irure aliquip. Esse excepteur cupidatat incididunt occaecat sunt. Adipisicing
        cupidatat est reprehenderit ut labore cillum Lorem culpa magna proident proident.
      </p>
    </template>

    <template #footer>
      <div class="flex justify-end">
        <button @click="customModalOpen = false" class="btn mr-4">Close</button>
        <button @click="customModalOpen = false" type="submit" class="btn btn-primary">
          Aceptar
        </button>
      </div>
    </template>
  </custom-modal>

  <fab-button @click="modalOpen = true">
    <add-circle />
  </fab-button>

  <fab-button @click="customModalOpen = true" position="bottom-left">
    <modal-icon />
  </fab-button>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import FabButton from '../../common/components/FabButton.vue';
import InputModal from '../../common/components/InputModal.vue';
import AddCircle from '../../common/icons/AddCircle.vue';
import ModalIcon from '../../common/icons/ModalIcon.vue';
import CustomModal from '@/modules/common/components/CustomModal.vue';
import { useProjectsStore } from '../store/projects.store';

const modalOpen = ref(false);
const customModalOpen = ref(false);

const projectsStore = useProjectsStore();
</script>
