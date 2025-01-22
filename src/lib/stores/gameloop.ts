import { GLOBAL_FPS } from "$lib/utils/constants";
import MainLoop from "mainloop.js";

type DrawFunction = (interpolationPercentage?: number) => void;
type UpdateFunction = (delta: number) => void;

const draws = new Map<string, DrawFunction>();
const updates = new Map<string, UpdateFunction>();

const loop = MainLoop.setMaxAllowedFPS(GLOBAL_FPS)
  .setDraw((interpolationPercentage: number) =>
    draws.values().forEach((draw) => draw(interpolationPercentage))
  )
  .setUpdate((delta: number) =>
    updates.values().forEach((draw) => draw(delta))
  );

function start() {
  loop.start();
}

function stop() {
  loop.stop();
}

function addDraw(key: string, fn: DrawFunction) {
  draws.set(key, fn);
}

function removeDraw(key: string) {
  draws.delete(key);
}

function addUpdate(key: string, fn: UpdateFunction) {
  updates.set(key, fn);
}

function removeUpdate(key: string) {
  updates.delete(key);
}

const GameLoop = {
  start,
  stop,
  addDraw,
  addUpdate,
  removeDraw,
  removeUpdate,
};

export default GameLoop;
