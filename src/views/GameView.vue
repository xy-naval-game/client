<template>
    <h1>Game secret: {{ gameStore.game?.secret }}</h1>
    <h2>Board secret: {{ gameStore.game?.myBoard.secret }}</h2>
    <hr class="my-4">
    <div id="my-field">
        <div class="w-2/5 grid grid-cols-10 gap-1 max-w-md mb-1"
             v-for="(row, y) in gameStore.game?.myBoard.grid"
             :key="y">
            <div class="cell"
                 v-for="(cell, x) in row"
                 :key="x"
                 :class="{ship: cell.ship, shot: cell.shot, destroyed: cell.destroyed}">
            </div>
        </div>
    </div>
    <hr class="my-4">
    <div id="rival-field">
        <div class="m-auto grid grid-cols-10 gap-1 max-w-md mb-1"
             v-for="(row, y) in gameStore.game?.rivalBoard.grid">
            <div class="cell"
                 v-for="(cell, x) in row"
                 :class="{ship: cell.ship, marker: cell.marker, shot: cell.shot, destroyed: cell.destroyed, selected: (x === xy?.x && y === xy.y)}"
                 :data-x="x"
                 :data-y="y"
                 @click="selectCell(x, y)">
                <div v-if="cell.marker" class="marker"></div>
            </div>
        </div>
    </div>
    <modal-component :modalActive="xy !== null" @close-modal="xy = null">
        <div class="grid grid-cols-2 space-x-2">
            <button @click="toggleMarker"
                    class="px-8 py-2 bg-pink-700 border-2 border-white text-white font-bold">
                {{ gameStore.game?.rivalBoard.grid[xy!.y][xy!.x].marker ? "Unmark" : "Mark" }}
            </button>
            <button @click="attack"
                    class="px-8 py-2 bg-orange-600 border-2 border-white text-white font-bold">Attack
            </button>
        </div>
    </modal-component>
</template>

<script setup lang="ts">
import {useGameStore} from "../stores/game.ts";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import ModalComponent from "../components/ModalComponent.vue";

const router = useRouter();
const gameStore = useGameStore();
const xy = ref<null | { x: number, y: number }>(null);

const selectCell = (x: number, y: number) => {
    if (!gameStore.game) {
        throw new Error("game is not created");
    }

    if (!gameStore.game.rivalBoard.grid[y][x].shot && !gameStore.game.rivalBoard.grid[y][x].destroyed) {
        xy.value = {x, y};
    }
}

const attack = async () => {
    if (xy.value !== null) {
        await gameStore.attack(xy.value.x, xy.value.y);
        xy.value = null;
    }
}

const toggleMarker = async () => {
    if (xy.value !== null) {
        await gameStore.toggleMarker(xy.value.x, xy.value.y);
        xy.value = null;
    }
}

onMounted(async () => {
    if (gameStore.game == null) {
        await router.push({name: "CheckIn"});
    }
});
</script>

<style scoped>
.cell {
    @apply grid bg-cyan-700 aspect-square place-items-center md:hover:border-white md:hover:border-2 md:hover:transition-all
}

.cell.selected {
    @apply border-4 border-red-700
}

.cell > .marker {
    @apply bg-pink-700 w-2/6 h-2/6 rounded-full border-2 border-white
}

.cell.ship {
    @apply bg-gray-400;
}

.cell.shot {
    @apply bg-gradient-to-b from-25% from-cyan-700 to-orange-600;
}

.cell.ship.shot {
    @apply bg-gradient-to-b from-25% from-gray-400 to-orange-600;
}

.cell.ship.destroyed {
    @apply bg-gradient-to-b from-25% from-red-700 to-orange-600;
}
</style>