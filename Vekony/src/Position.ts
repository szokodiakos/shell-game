﻿module ShellGame {
    export class Position {
        private x: number;
        private y: number;

        get X(): number {
            return this.x;
        }
        set X(x: number) {
            this.x = x;
        }
        get Y(): number {
            return this.y;
        }
        set Y(y: number) {
            this.y = y;
        }
        toString(): string {
            return "{x: " + this.x + ", y: " + this.y + "}";
        }

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    }
} 