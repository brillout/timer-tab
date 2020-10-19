import {
  youtubeStart,
  youtubeStop,
  youtubeIsPlaying,
  youtubeNoUrl,
} from "./youtubeAlarm";
import { audioStart, audioStop } from "./audioAlarm";
import { sleep } from "../../../../tab-utils/sleep";

export { notifyStart, notifyStop, notifyUpdate };

const secondsToWait = 4;

var isStarted: true | undefined;
function notifyStart() {
  console.log("notify-start");
  isStarted = true;

  const noYoutube = youtubeNoUrl();
  console.log("notify-start - youtubeNoUrl:", noYoutube);

  if (noYoutube) {
    audioStart();
    return;
  }

  // We need to asynchronously wait to check if youtube has succesfully loaded
  (async function () {
    await Promise.race([
      youtubeStart(),
      // Timeout if YT didn't load after `secondsToWait` seconds
      sleep({ seconds: secondsToWait }),
    ]);

    const ytIsPlaying = youtubeIsPlaying();
    console.log("notify-start - youtubeIsPlaying:", ytIsPlaying);
    if (!ytIsPlaying) {
      youtubeStop();
      audioStart();
    }
  })();
}

// For when the user:
//  - changes themes, or
//  - change the YouTube URL
function notifyUpdate(): boolean {
  console.log("notify-update", isStarted);
  if (isStarted) {
    stop();
    notifyStart();
    return true;
  } else {
    return false;
  }
}

function notifyStop() {
  isStarted = undefined;
  stop();
}
function stop() {
  youtubeStop();
  audioStop();
}
