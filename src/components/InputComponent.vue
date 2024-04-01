<template>
    <input type="text"
           class="w-full py-1 text-lg outline-none bg-transparent border-b-2 transform duration-300 focus:outline-none focus-within:border-indigo-500"
           :value="modelValue"
           @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
           v-bind="$attrs"/>
</template>

<script setup lang="ts">
defineProps<{
    modelValue?: string,
}>();
</script>

<style scoped>

</style>