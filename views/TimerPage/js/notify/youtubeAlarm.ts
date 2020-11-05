// @ts-ignore
import assert from "@brillout/assert";
import "./youtubeAlarm.css";
import { notifyUpdate, debugLog } from "./index";
import { AsyncState, IsNotLastUpdate } from "../../../../tab-utils/AsyncState";

export {
  youtubeStart,
  youtubeStop,
  youtubeIsPlaying,
  youtubeSetUrl,
  youtubeNoUrl,
  youtubePrefetch,
  //youtubeDisabled,
};

const YOUTUBE_WRAPPER_ID = "youtube_wrapper";
const YOUTUBE_IFRAME_ID = "youtube_iframe";

const { state } = new AsyncState<{
  isStarted: boolean;
  youtubeUrl: string;
  prefetchEnabled: boolean;
}>({ isStarted: false, youtubeUrl: "", prefetchEnabled: false }, update);

function youtubeStart() {
  state.isStarted = true;
}
function youtubeStop() {
  state.isStarted = false;
}
function youtubeNoUrl() {
  return state.youtubeUrl === "";
}
function youtubeSetUrl(youtubeUrl: string) {
  state.youtubeUrl = youtubeUrl;

  // User has changed the theme or the youtube alarm
  // Update the whole notification logic
  notifyUpdate();
}
function youtubePrefetch() {
  state.prefetchEnabled = true;
}
/*
youtubeDisabled
function neverPlayedBefore() {
  // Was the playing state was ever achieved?
  // If not, the prefetching didn't work (/happened yet)
  return stateChanges.includes(1);
}
*/

function update(isNotLastUpdate: IsNotLastUpdate) {
  assert(state.youtubeUrl.constructor === String);

  if (!state.isStarted) {
    stop(isNotLastUpdate);
    if (state.youtubeUrl && state.prefetchEnabled) {
      prefetch(isNotLastUpdate);
    }
  }

  if (state.youtubeUrl !== "" && state.isStarted) {
    start(isNotLastUpdate);
  }
}

async function start(isNotLastUpdate: IsNotLastUpdate) {
  debugLog("[youtube] start youtube alarm (attempt)");

  const player = await load_player();
  if (isNotLastUpdate()) return;

  playerStart(player);

  document
    .querySelector("#" + YOUTUBE_WRAPPER_ID)
    .classList.add("youtube_alarm_show");

  debugLog("[youtube] start youtube alarm (success)");
}
function playerStart(player: Player) {
  loadVideo(player);
  player.unMute();
  // player.setLoop(true);
}

async function stop(isNotLastUpdate: IsNotLastUpdate) {
  debugLog("[youtube] stop youtube alarm (attempt)");

  const player = await load_player();
  if (isNotLastUpdate()) return;

  document
    .querySelector("#" + YOUTUBE_WRAPPER_ID)
    .classList.remove("youtube_alarm_show");

  playerStop(player);

  debugLog("[youtube] stop youtube alarm (success)");
}
function playerStop(player: Player) {
  player.mute();
  // player.setLoop(false);
}

var lastPrefetch: string;
async function prefetch(isNotLastUpdate: IsNotLastUpdate) {
  debugLog("[youtube] prefetching (attempt)");

  const player = await load_player();
  if (isNotLastUpdate()) return;

  // Once we load a Youtube video we never stop it
  // `stop` only mutes the video, it doesn't actually stop it
  if (lastPrefetch === state.youtubeUrl) return;

  player.mute();
  // player.setLoop(false);
  loadVideo(player);

  lastPrefetch = state.youtubeUrl;

  debugLog("[youtube] prefetching (success)");
}

var loadedVideoId: VideoId;
function loadVideo(player: Player) {
  const { video_id, video_start } = parse_youtube_url(state.youtubeUrl);

  if (video_id !== loadedVideoId) {
    loadedVideoId = video_id;
    player.loadVideoById({
      videoId: video_id,
      startSeconds: video_start,
    });
  } else {
    player.seekTo(video_start);
    player.playVideo();
  }
}

declare global {
  interface Window {
    YT: {
      Player: typeof Player;
    };
    onYouTubeIframeAPIReady: () => {};
  }
}

var player__loaded: Player;
var player__promise: Promise<Player>;
async function load_player() {
  if (player__loaded) {
    return player__loaded;
  }
  if (player__promise) {
    return player__promise;
  }

  let resolve: (player: Player) => void;
  player__promise = new Promise<Player>((r) => (resolve = r));

  window.onYouTubeIframeAPIReady = async () => {
    const player = new window.YT.Player(YOUTUBE_IFRAME_ID, {
      events: {
        onReady: () => {
          player__loaded = player;
          resolve(player__loaded);
        },
        onStateChange,
      },
      height: "150",
      width: "300",
      playerVars: {
        controls: 0,
        modestbranding: 1,
        rel: 0,
        color: "white",
      },
    });
  };
  load_script("https://www.youtube.com/iframe_api");

  return player__promise;
}

var stateChanges: number[];
function onStateChange(event: { data: number }) {
  // `event.data` possible values:
  // -1 – unstarted
  //  0 – ended
  //  1 – playing
  //  2 – paused
  //  3 – buffering
  //  5 – video cued

  const state = event.data;

  stateChanges = stateChanges || [];
  stateChanges.push(state);

  const time = new Date().toTimeString().split(" ")[0];
  debugLog(`[youtube] player state: ${state} (${time})`);
}
function youtubeIsPlaying(): boolean {
  // Ignoring buffering state, is the last state is playing, then `return true`
  for (let i = (stateChanges || []).length - 1; i >= 0; i--) {
    const stateChange = stateChanges[i];
    // Playing
    if (stateChange === 1) {
      return true;
    }
    // Buffering
    if (stateChange === 3) {
      continue;
    }
    return false;
  }

  return false;
}

type VideoSpec = {
  video_id: VideoId;
  video_start: VideoStart;
  video_repeat: boolean;
};

type VideoId = string & { _brand?: "VideoId" };
type PlayerOptions = {
  events: {
    onReady: () => void;
    onStateChange: ({ data: number }) => void;
  };
  height: string;
  width: string;
  playerVars: {
    controls: number;
    modestbranding: number;
    rel: number;
    color: string;
  };
};
type VideoStart = number & { _brand?: "VideoId" };
declare class Player {
  public constructor(elementId: string, opts: PlayerOptions);
  playVideo: () => void;
  seekTo: (time: number) => void;

  loadVideoById: (args: { videoId: VideoId; startSeconds: VideoStart }) => void;

  mute: () => void;
  unMute: () => void;

  setLoop: (val: boolean) => void;
}
function parse_youtube_url(url: string): VideoSpec {
  assert(url.constructor === String);

  //sanetize URL
  url = url.replace(" ", "");

  //retrieve ID
  const video_id: string | null = url_to_id(url);
  assert(video_id || video_id === null);

  //retrieve start & repeat
  const matches = /(?:\?|&)(?:start|t)=([^&#]*)/.exec(url);
  const video_start: number = matches ? parseInt(matches[1], 10) : 0;
  //video_repeat_=/(?:\?|&)(repeat|loop)/.test(url);
  const video_repeat: boolean = /repeat|replay|loop/.test(url);

  return {
    video_start,
    video_id,
    video_repeat,
  };
}
function url_to_id(url: string): string | null {
  //ID chars: /[a-zA-Z0-9-_]+/ --http://stackoverflow.com/questions/830596/what-type-of-id-does-youtube-use-for-their-videos
  //var matches=/youtube\.com.*(?:\?|&)v=([^&#]+)/.exec(url);
  var matches =
    /youtube\.com.*(?:\?|&)v=([a-zA-Z0-9\-_]+)/.exec(url) ||
    /youtu.be\/([a-zA-Z0-9\-_]+)/.exec(url);
  return matches ? matches[1] : null;
}

function load_script(url: string): Promise<void> {
  const scriptEl = document.createElement("script");
  scriptEl.src = url;
  scriptEl.async = true;
  let resolve: () => void;
  const promise = new Promise<void>((r) => (resolve = r));
  scriptEl.onload = () => {
    resolve();
  };
  document.getElementsByTagName("head")[0].appendChild(scriptEl);
  return promise;
}
