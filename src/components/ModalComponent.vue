<template>
    <div v-show="modalActive"
         class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 px-8 text-black flex justify-center">
        <div v-if="modalActive"
             class="p-4 bg-black bg-opacity-75 mt-32 max-w-screen-md space-y-2 self-start">
            <div class="flex">
                <slot/>
            </div>
            <div class="flex">
                <button class="bg-gray-700 py-2 w-full text-white" @click="$emit('close-modal')">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineEmits(["close-modal"])
defineProps({
    modalActive: {
        type: Boolean,
        default: false,
    }
});
</script>

<style scoped>

</style>