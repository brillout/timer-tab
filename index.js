const videoId = "PS5KAEgrtMA";
const youtube_div = document.querySelector("#timer-tab-youtube-div");

main();

var player;
async function main() {
  player = await addInitCallback();
  console.log("player loaded");

  setTimeout(() => {
    console.log("sarting video");
    playVideo();
  }, 6000);
}

function playVideo() {
  player.playVideo();
}

function addInitCallback() {
  let resolve;
  window.onYouTubeIframeAPIReady = () => {
    const player = new YT.Player(youtube_div, {
      videoId,
      events: {
        onReady: () => {
          resolve(player);
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
    resolve(player);
  };

  // Uncomment this to get the latest version of the youtube api script
  //load_script("https://www.youtube.com/iframe_api");

  return new Promise((r) => (resolve = r));
}

function onStateChange(event) {
  // `event.data` possible values:
  // -1 – unstarted
  //  0 – ended
  //  1 – playing
  //  2 – paused
  //  3 – buffering
  //  5 – video cued
  console.log("[state-change]", event.data);
}

function load_script(url) {
  const scriptEl = document.createElement("script");
  scriptEl.src = url;
  scriptEl.async = true;
  let resolve;
  const promise = new Promise((r) => (resolve = r));
  scriptEl.onload = resolve;
  document.getElementsByTagName("head")[0].appendChild(scriptEl);
  return promise;
}

