// @ts-ignore
import assert from "@brillout/assert";
import "./youtubeAlarm.css";
import { notifyUpdate, debugLog } from "./index";
import { AsyncState, IsLastUpdate } from "../../../../tab-utils/AsyncState";

export {
  youtubeStart,
  youtubeStop,
  youtubeIsPlaying,
  youtubeSetUrl,
  youtubeNoUrl,
};

const youtube_wrapper = "youtube_wrapper";
const youtube_iframe = "youtube_iframe";

const { state } = new AsyncState<{ isStarted: true | undefined }>(update);

function youtubeStart() {
  state.isStarted = true;
}
function youtubeStop() {
  state.isStarted = undefined;
}
function update(isLastUpdate: IsLastUpdate) {
  if (state.isStarted === undefined) {
    stop(isLastUpdate);
  }
  if (state.isStarted === true) {
    start(isLastUpdate);
  }
}

async function start(isLastUpdate: IsLastUpdate) {
  debugLog("start youtube");

  const player = await load_player();
  // Abort if `youtubeStart` was called again in the meantime
  if (!isLastUpdate()) return;

  if (youtubeNoUrl()) {
    youtubeStop();
    return;
  }

  playerStart(player);

  document
    .querySelector("#" + youtube_wrapper)
    .classList.add("youtube_alarm_show");

  debugLog("start youtube - finish");
}
function playerStart(player: Player) {
  player.unMute();
  loadVideo(player);
  player.setLoop(true);
}

async function stop(isLastUpdate: IsLastUpdate) {
  debugLog("stop youtube");

  const player = await load_player();
  if (!isLastUpdate()) return;

  document
    .querySelector("#" + youtube_wrapper)
    .classList.remove("youtube_alarm_show");

  playerStop(player);

  debugLog("stop youtube - finish");
}
function playerStop(player: Player) {
  player.mute();
  player.setLoop(false);
}

async function prefetch() {
  const player = await load_player();
  assert(!youtubeNoUrl());
  player.mute();
  player.setLoop(false);
  loadVideo(player);
}

var loadedVideoId: VideoId;
function loadVideo(player: Player) {
  const { video_id, video_start } = video_spec;
  if (video_id !== loadedVideoId) {
    loadedVideoId = video_id;
    player.loadVideoById({
      videoId: video_id,
      startSeconds: video_start,
    });
  } else {
    player.playVideo();
    player.seekTo(video_start);
  }
}

type VideoSpec = {
  video_id: VideoId;
  video_start: VideoStart;
  video_repeat: boolean;
};

let video_spec: VideoSpec;
let resolve__video_spec: (video_spec: VideoSpec) => void;
let wait_for_video_spec = new Promise<VideoSpec>(
  (r) => (resolve__video_spec = r)
);
let last_youtube_url: string;
function youtubeSetUrl(youtube_url: string) {
  assert(youtube_url.constructor === String);
  if (last_youtube_url === youtube_url) {
    return;
  }
  last_youtube_url = youtube_url;

  video_spec = parse_youtube_url(youtube_url);
  resolve__video_spec(video_spec);

  if (!youtubeNoUrl()) {
    prefetch();
  }

  // User has changed the theme or the youtube alarm
  // Update the whole notification logic
  notifyUpdate();
}
function youtubeNoUrl() {
  const { video_id } = video_spec;
  assert(video_id || video_id === null);
  return video_id === null;
}

type VideoId = string & { _brand?: "VideoId" };
type PlayerOptions = {
  // videoId: VideoId;
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
    await wait_for_video_spec;

    const player = new window.YT.Player(youtube_iframe, {
      // videoId: video_spec.video_id,
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

  /*
  const time = new Date().toTimeString().split(" ")[0];
  console.log("[YOUTUBE][" + time + "] event.data", event.data);
  //*/
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
/*
function neverPlayedBefore() {
  // Was the playing state was ever achieved?
  // If not, the prefetching didn't work (/happened yet)
  return stateChanges.includes(1);
}
*/

function parse_youtube_url(url: string) {
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

  const video_spec = {
    video_start,
    video_id,
    video_repeat,
  };

  return video_spec;
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
