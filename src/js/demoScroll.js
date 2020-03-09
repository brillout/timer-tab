import {sleep} from './utils';

export default demoScroll;

async function demoScroll() {
  const scrollEl = document.documentElement;

  await scroll(scrollEl, 110, {smooth: false});
  /*
  await sleep(0.1);
  await scroll(scrollEl, 110, {smooth: false});
  await sleep(1);
  await scroll(scrollEl, 110, {smooth: false});
  */
  await sleep(1);
  await scroll(scrollEl, 0, {smooth: true});
}

async function scroll(scrollEl, top, {smooth}) {
  if( !smooth ) {
    set(top);
    return;
  }

  let resolvePromise;
  const promise = new Promise(resolve => resolvePromise = resolve);

  const currentTop = get();
  const distance = top - currentTop;

  const steps = 50;
  let counter = 0;
  var timer = setInterval(function () {
    set(currentTop + distance * smoothStep(counter++ / steps));
    if (counter > steps)
      clearInterval(timer);
      resolvePromise();
  }, 10);

  return promise;

  function get() {
    return scrollEl.scrollTop;
  }
  function set(val) {
    scrollEl.scrollTop = val;
  }

  function smoothStep(n) {
    return n * n * (3 - 2 * n);
  }
}
