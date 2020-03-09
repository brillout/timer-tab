export {sleep};

function sleep(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds*1000));
}
