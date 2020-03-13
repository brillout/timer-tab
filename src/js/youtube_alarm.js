import assert from '@brillout/assert';

export {play_youtube_alarm, stop_youtube_alarm, set_youtube_url};

export default youtube_alarm;

//*/
const DEBUG = true;
/*/
const DEBUG = false;
//*/

const youtube_wrapper = 'youtube_wrapper';
const youtube_iframe = 'youtube_iframe';

async function youtube_alarm() {
  add_style();
  enable_prefetch();
}


let state;

async function play_youtube_alarm() {
  if( state==='STARTED' ) return;
  const player = await load_player();
  player.seekTo(video_spec.start_time);
  player.unMute();
  player.playVideo();
  document.querySelector('#'+youtube_wrapper).classList.add('youtube_alarm_show');
  state = 'STARTED';
}

async function stop_youtube_alarm() {
  if( state==='STOPED' ) return;
  const player = await load_player();
  document.querySelector('#'+youtube_wrapper).classList.remove('youtube_alarm_show');
  player.mute();
  state = 'STOPED';
}


async function prefetch() {
  const player = await load_player();
  player.loadVideoById(video_spec.video_id);
  if( state==='STARTED' ) return;
  player.mute();
  player.seekTo(video_spec.start_time);
  player.playVideo();
}

let resolve__prefetch_enable;
let wait_for_prefetch_enable = new Promise(r => resolve__prefetch_enable = r);
function enable_prefetch() {
  resolve__prefetch_enable();
}

let video_spec;
let resolve__video_spec;
let wait_for_video_spec = new Promise(r => resolve__video_spec = r);
async function set_youtube_url(youtube_url) {
  video_spec = parse_youtube_url(youtube_url);
  resolve__video_spec();

  await wait_for_prefetch_enable;

  prefetch();
}


let player__loaded;
let player__promise;
async function load_player() {
  if( player__loaded ){
    return player__loaded;
  }
  if( player__promise ){
    return player__promise;
  }

  let resolve;
  player__promise = new Promise(r => resolve = r);

  window.onYouTubeIframeAPIReady = async () => {
    await wait_for_video_spec;

    const player = new YT.Player(youtube_iframe, {
      videoId: video_spec.video_id,
      events: {
        onReady: () => {
          player__loaded = player;
          resolve(player__loaded);
        },
        onStateChange,
      },
      height: '150', width: '300',
      playerVars: {
        controls: 0,
        loop: 1,
        modestbranding: 1,
        rel: 0,
        color: 'white',
      },
    });
  };
  load_script('https://www.youtube.com/iframe_api');

  return player__promise;

  function onStateChange(event) {
    if( !DEBUG ) return;
    const time = (new Date()).toTimeString().split(' ')[0];
    console.log('[YOUTUBE]['+time+'] event.data', event.data);
  }
}

function parse_youtube_url(url) {
  assert(url.constructor===String);

  //sanetize URL
  url=url.replace(' ','');

  const video_spec = {};

  //retrieve ID
  video_spec.video_id = url_to_id(url);

  //retrieve start & repeat
  const matches=/(?:\?|&)(?:start|t)=([^&#]*)/.exec(url);
  video_spec.video_start = matches?matches[1]:null;
//video_repeat_=/(?:\?|&)(repeat|loop)/.test(url);
  video_spec.video_repeat = /repeat|replay|loop/.test(url);

  return video_spec;
}
function url_to_id(url){
  //ID chars: /[a-zA-Z0-9-_]+/ --http://stackoverflow.com/questions/830596/what-type-of-id-does-youtube-use-for-their-videos
  //var matches=/youtube\.com.*(?:\?|&)v=([^&#]+)/.exec(url);
  var matches=/youtube\.com.*(?:\?|&)v=([a-zA-Z0-9\-_]+)/.exec(url) || /youtu.be\/([a-zA-Z0-9\-_]+)/.exec(url);
  return matches?matches[1]:null;
}


function load_script(url) {
  const scriptEl = document.createElement('script');
  scriptEl.src= url;
  scriptEl.async = true;
  let resolve;
  const promise = new Promise(r => resolve=r);
  scriptEl.onload = resolve;
  document.getElementsByTagName('head')[0].appendChild(scriptEl);
  return promise;
}

function add_style() {
  const CSS = (
`
#${youtube_wrapper}:not(.youtube_alarm_show) {
  position: absolute;
  z-index: -999999;
  visibility: hidden;
  height: 0px;
}
#${youtube_wrapper} {
  height: 150px;
  overflow: hidden;
  transition: height 0.7s;
}

/* transparent click-protecting cover */
#${youtube_wrapper} {
  position: relative;
}
#${youtube_wrapper}:before {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  cursor: pointer;
  content: "";
  display: block;
}
`
  );
  add_css(CSS);
}

function add_css(content) {
  const el=document.createElement("style");
  el.appendChild(document.createTextNode(content));
  el.setAttribute("type", "text/css");
  document.getElementsByTagName("head")[0].appendChild(el);
}

/*
let node,ctx,timeout;
function play_web_audio_fallback() {
  console.log(11);
  if(!node)
  {
    function fadeOut(i,length) { return 1-i/length }
    function fadeIn (i,length) { return i/length }
    function fade   (i,length) { var limit = length/100;return i>limit?fadeOut(i-limit,length):fadeIn(i,limit)}

    ctx = new AudioContext();

    var SAMPLE_RATE = ctx['sampleRate'];
    var buf_size=1.35*512*128;
    var freq = 440;
    var PI_2 = Math.PI * 2;

    var buffer = ctx['createBuffer'](1, buf_size, SAMPLE_RATE);
      var buf = buffer['getChannelData'](0);
      for (let i = 0; i < buf_size; ++i) buf[i] = fade(i,buf_size)*Math.sin(freq * PI_2 * i / SAMPLE_RATE);
    node = ctx['createBufferSource'](0);
      node['buffer']  = buffer;
      node['loop']    = true;
      node['looping'] = true;
    node['start'](ctx['currentTime']);
  }
  node['con'+'nect'](ctx['destination']);
  if(timeout) clearTimeout(timeout);
  if(!ctYt.repeat_) timeout=setTimeout(function(){node['disconnect']()},120*1000);
  console.log(22);
}
function stop() {
  if(node) node['disconnect']();
}
*/
