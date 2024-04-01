import {createRouter, createWebHistory} from "vue-router";
import CheckInView from "../views/CheckInView.vue";
import AboutView from "../views/AboutView.vue";
import GameView from "../views/GameView.vue";

const routes = [
    {path: "/", name: "CheckIn", component: CheckInView},
    {path: "/game", name: "Game", component: GameView},
    {path: "/about", name: "About", component: AboutView}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;