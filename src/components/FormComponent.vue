<template>
    <h2 v-if="title" class="mb-4">{{ title }}</h2>
    <form class="w-full space-y-4"
          action="#"
          v-bind="$attrs"
          @submit.prevent>
        <slot></slot>
    </form>
</template>

<script setup lang="ts">
defineProps<{
    title?: string
}>()
</script>

<style scoped>
</style>