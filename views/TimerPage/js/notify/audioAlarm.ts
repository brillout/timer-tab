// @ts-ignore
import glockenklang from "./glockenklang.ogg";
import { AsyncState } from "../../../../tab-utils/AsyncState";
import { debugLog } from "./index";

const ALARM_DURATION_SECONDS = 50;

export { audioStart, audioStop, audioPrefetch };

// ** Synchronization **
// We need to ensure that `pause` is always waiting on the `play` promise.
// See https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
const { state, runUpdate } = new AsyncState<{ isStarted: Date | false }>(
  { isStarted: false },
  update
);

function audioStart() {
  state.isStarted = new Date();
}
function audioStop() {
  state.isStarted = false;
}
async function update() {
  if (!state.isStarted) {
    stop();
  }
  if (state.isStarted) {
    await start();
  }
}

async function start() {
  debugLog("[audio] start (attempt)");
  install_audio_tag();

  audio_tag.muted = false;
  audio_tag.currentTime = 0;

  let failed = true;
  try {
    await audio_tag.play();
    failed = false;
  } catch (err) {
    // May fail when user hasn't interacted with Timer Tab:
    //   Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD
    console.warn(err);
  }

  debugLog(`[audio] start (${failed ? "failed" : "success"})`);
}

function loop(audio_tag: HTMLAudioElement) {
  audio_tag.onended = () => {
    if (!state.isStarted) return;
    const audioDuration = new Date().getTime() - state.isStarted.getTime();
    if (audioDuration < ALARM_DURATION_SECONDS * 1000) {
      runUpdate();
    }
  };
}

function stop() {
  debugLog("[audio] stop");
  if (!audio_tag) return;
  audio_tag.pause();
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

  loop(audio_tag);
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
