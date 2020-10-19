// @ts-ignore
import glockenklang from "./glockenklang.ogg";

import { AsyncState, IsLastUpdate } from "../../../../tab-utils/AsyncState";

import { debugLog } from "./index";

export { audioStart, audioStop, audioPrefetch };

// ** Synchronization **
// We need to ensure that `pause` is always waiting on the `play` promise.
// See https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
type State = { isStarted: true | undefined };
const { state } = new AsyncState<State>(update);

function audioStart() {
  state.isStarted = true;
}
function audioStop() {
  state.isStarted = undefined;
}
async function update() {
  if (state.isStarted === undefined) {
    stop();
  }
  if (state.isStarted === true) {
    await start();
  }
}

async function start() {
  debugLog("start audio - begin");
  install_audio_tag();
  prefetchModeUnset();
  audio_tag.currentTime = 0;
  try {
    await audio_tag.play();
  } catch (err) {
    // May fail when user hasn't interacted with Timer Tab:
    //   Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD
  }
  debugLog("start audio - finish");
}

function stop() {
  debugLog("stop audio");
  if (!audio_tag) return;
  audio_tag.pause();
}

/*
var playPromise: Promise<void>;
function play() {
  let playPromiseNew: Promise<void>;
  try {
    playPromiseNew = audio_tag.play();
  } catch (err) {
    // May fail when user hasn't interacted with Timer Tab:
    //   Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD
  }
  const playPromiseOld = playPromise;
  playPromise = Promise.all([playPromiseOld, playPromiseNew]).then(() => {});
}
function prefetchModeSet() {
  audio_tag.muted = true;
  audio_tag.loop = false;
}
*/
function prefetchModeUnset() {
  audio_tag.muted = false;
  audio_tag.loop = true;
}
function audioPrefetch() {
  install_audio_tag();
  audio_tag.preload = "auto";
  audio_tag.load();
}

var audio_tag: HTMLAudioElement;
function install_audio_tag() {
  if (audio_tag) return;
  audio_tag = document.createElement("audio");
  audio_tag.id = "notify_sound";
  audio_tag.style.display = "none";
  const source_tag = audio_tag.appendChild(document.createElement("source"));
  //source_tag.type="audio/mpeg"; // for .mp3 files
  source_tag.type = "audio/ogg";
  source_tag.src = glockenklang;
  document.body.appendChild(audio_tag);
}

/*
let node, ctx, timeout;
function play_fallback() {
  if (!node) {
    function fadeOut(i, length) {
      return 1 - i / length;
    }
    function fadeIn(i, length) {
      return i / length;
    }
    function fade(i, length) {
      var limit = length / 100;
      return i > limit ? fadeOut(i - limit, length) : fadeIn(i, limit);
    }

    ctx = new AudioContext();

    var SAMPLE_RATE = ctx["sampleRate"];
    var buf_size = 1.35 * 512 * 128;
    var freq = 440;
    var PI_2 = Math.PI * 2;

    var buffer = ctx["createBuffer"](1, buf_size, SAMPLE_RATE);
    var buf = buffer["getChannelData"](0);
    for (let i = 0; i < buf_size; ++i)
      buf[i] = fade(i, buf_size) * Math.sin((freq * PI_2 * i) / SAMPLE_RATE);
    node = ctx["createBufferSource"](0);
    node["buffer"] = buffer;
    node["loop"] = true;
    node["looping"] = true;
    node["start"](ctx["currentTime"]);
  }
  node["con" + "nect"](ctx["destination"]);
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(function () {
    stop_fallback();
  }, 10 * 1000);
}
function stop_fallback() {
  if (node) node["disconnect"]();
}
*/
