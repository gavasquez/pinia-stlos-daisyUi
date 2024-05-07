<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <!-- Header -->
      <div class="border-b border-blue-500">
        <slot name="header" />
      </div>
      <!-- Body -->
      <div class="my-5">
        <slot name="body" />
      </div>
      <!-- Footer -->
      <div class="border-t border-t-blue-500 pt-2">
        <slot name="footer" />
      </div>
    </div>
  </dialog>
  <div
    v-if="open"
    class="modal-backdrop fixed top-0 left-0 z-10 bg-black opacity-50 w-screen h-screen"
  ></div>
</template>

<script setup lang="ts">
interface Props {
  open?: boolean;
}

withDefaults(defineProps<Props>(), {
  open: false,
});
</script>
