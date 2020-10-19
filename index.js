main();

let player;
const videoId = "PS5KAEgrtMA";

function main() {
  player = addInitCallback();

  setTimeout(() => {
    playVideo(player);
  }, 2000);
}

function playVideo(player) {
  player.playVideo();
}

let player;
function addInitCallback() {
  window.onYouTubeIframeAPIReady = () => {
    const player = new YT.Player(youtube_iframe, {
      videoId,
      events: {
        onReady: () => {
          console.log("player loaded");
          //resolve(player__loaded);
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
    return player;
  };
}
