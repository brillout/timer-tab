// @ts-ignore
import assert from "@brillout/assert";
import {
  youtubeStart,
  youtubeStop,
  youtubeIsPlaying,
  youtubeNoUrl,
} from "./youtubeAlarm";
import { audioStart, audioStop } from "./audioAlarm";
import { sleep } from "../../../../tab-utils/sleep";
import { AsyncState, IsLastUpdate } from "../../../../tab-utils/AsyncState";

export { notifyStart, notifyStop, notifyUpdate, debugLog };

const YOUTUBE_TIMEOUT = 4;

/*
const DEBUG_NOTIFY = false;
/*/
const DEBUG_NOTIFY = true;
//*/

type State = { isStarted: true | undefined };
const { state, runUpdate } = new AsyncState<State>(update);

function notifyStop() {
  console.log("notifyStop");
  state.isStarted = undefined;
}
function notifyStart() {
  console.log("notifyStart");
  state.isStarted = true;
}
// For when the user:
//  - changes themes, or
//  - change the YouTube URL
function notifyUpdate(): boolean {
  runUpdate();
  return state.isStarted;
}

function update(isLastUpdate: IsLastUpdate) {
  if (state.isStarted === undefined) {
    stop();
  }
  if (state.isStarted === true) {
    stop();
    start(isLastUpdate);
  }
}

function stop() {
  console.log("notify[stop]");
  youtubeStop();
  audioStop();
}

async function start(isLastUpdate: IsLastUpdate) {
  console.log("notify[start]");
  assert(state.isStarted === true);

  const noYoutube = youtubeNoUrl();
  console.log("notify[start] youtubeNoUrl:", noYoutube);

  if (noYoutube) {
    audioStart();
    return;
  }

  youtubeStart();

  await sleep({ seconds: YOUTUBE_TIMEOUT });

  if (!isLastUpdate()) {
    // A more recent call takes over
    return;
  }
  // Since it is the last call, `isStarted` is left untouched.
  const { isStarted } = state;
  assert(isStarted === true, { isStarted });

  const ytIsPlaying = youtubeIsPlaying();
  console.log("notify[start] youtubeIsPlaying:", ytIsPlaying);
  if (!ytIsPlaying) {
    youtubeStop();
    audioStart();
  }
}

function debugLog(...args: any[]) {
  if (!DEBUG_NOTIFY) return;
  console.log(...args);
}
