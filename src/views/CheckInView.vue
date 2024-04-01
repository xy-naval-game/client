<template>
    <h1 class="text-center text-4xl font-medium mb-24">XY-Naval Game</h1>
    <section class="space-y-10">
        <button-component class="w-full" @click.prevent="create">Create Game</button-component>
        <h2>OR</h2>
        <form-component class="text-center" @submit.prevent="join">
            <input-component class="w-8/12" placeholder="Game Secret" v-model="secret"/>
            <button-component class="w-4/12" :disabled="!secret">Join</button-component>
        </form-component>
    </section>
</template>

<script setup lang="ts">
import InputComponent from "../components/InputComponent.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import FormComponent from "../components/FormComponent.vue";
import {Client} from "@stomp/stompjs";
import {useGameStore} from "../stores/game.ts";
import {useRouter} from "vue-router";

const router = useRouter();
const gameStore = useGameStore();
const secret = defineModel("secret");
const client = new Client({brokerURL: 'ws://localhost:8080/ws'});
client.onConnect = () => {
    console.log("connected")
    client.subscribe('/game/greetings', message =>
            console.log(`Received: ${message.body}`)
    );
}
client.activate();

const create = async () => {
    await gameStore.createGame();
    if (gameStore.game != null) {
        await router.push({name: 'Game'});
    }
}

const join = (e: SubmitEvent) => {
    console.log(e);
}

</script>

<style scoped>
</style>
