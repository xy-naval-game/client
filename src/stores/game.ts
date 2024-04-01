import {defineStore} from "pinia";
import axios, {AxiosInstance} from "axios";

const http: AxiosInstance = axios.create({baseURL: "http://localhost:8080/game/"});

export type Cell = {
    destroyed: boolean
    marker: boolean
    ship: boolean
    shot: boolean
}

type Board = {
    grid: [Array<Cell>]
    secret: string
}

type Game = {
    myBoard: Board
    rivalBoard: Board
    secret: string
}

export const useGameStore = defineStore('gameStore', {
    state: () => ({
        game: null as null | Game,
        loading: false,
    }),
    actions: {
        async attack(x: number, y: number) {
            if (this.game === null) {
                throw new Error("game is not created");
            }
            this.loading = true;
            this.game.rivalBoard.grid[y][x].shot = true;
            this.game.rivalBoard.grid[y][x].marker = false;
            this.loading = false;
        },
        async toggleMarker(x: number, y: number) {
            if (this.game === null) {
                throw new Error("game is not created");
            }
            this.loading = true;
            this.game.rivalBoard.grid[y][x].marker = !this.game.rivalBoard.grid[y][x].marker;
            this.loading = false;
        },
        async createGame() {
            this.loading = true;
            this.game = (await http.get("http://localhost:8080/game/create")).data;
            this.loading = false;
        }
    }
})