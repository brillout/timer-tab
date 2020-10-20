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
import { AsyncState, IsNotLastUpdate } from "../../../../tab-utils/AsyncState";

export { notifyStart, notifyStop, notifyUpdate, debugLog };

const YOUTUBE_TIMEOUT = 5;

/*
const DEBUG_NOTIFY = false;
/*/
const DEBUG_NOTIFY = true;
//*/

const { state, runUpdate } = new AsyncState<{ isStarted: boolean }>(
  { isStarted: false },
  update
);

function notifyStop() {
  debugLog("[notify] notifyStop");
  state.isStarted = false;
}
function notifyStart() {
  debugLog("[notify] notifyStart");
  state.isStarted = true;
}
// For when the user:
//  - changes themes, or
//  - change the YouTube URL
function notifyUpdate() {
  runUpdate();
}

function update(isNotLastUpdate: IsNotLastUpdate) {
  if (!state.isStarted) {
    stop();
  }
  if (state.isStarted) {
    stop();
    start(isNotLastUpdate);
  }
}

function stop() {
  debugLog("[notify] stop");
  youtubeStop();
  audioStop();
}

async function start(isNotLastUpdate: IsNotLastUpdate) {
  debugLog("[notify] start");
  assert(state.isStarted === true);

  const noYoutube = youtubeNoUrl();
  debugLog("[notify] youtubeNoUrl():", noYoutube);
  if (noYoutube) {
    audioStart();
    return;
  }

  youtubeStart();

  await sleep({ seconds: YOUTUBE_TIMEOUT });

  // A more recent call takes over
  if (isNotLastUpdate()) return;

  // Since it is the last call, `isStarted` is left untouched.
  const { isStarted } = state;
  assert(isStarted === true, { isStarted });

  const ytIsPlaying = youtubeIsPlaying();
  debugLog("[notify] youtubeIsPlaying:", ytIsPlaying);
  if (!ytIsPlaying) {
    youtubeStop();
    audioStart();
  }
}

function debugLog(...args: any[]) {
  if (!DEBUG_NOTIFY) return;
  console.log(...args);
}
