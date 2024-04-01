<template>
    <button class="transform bg-indigo-600 p-2 font-bold duration-300 hover:bg-indigo-400 uppercase disabled:bg-gray-600"
            v-bind="$attrs">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>