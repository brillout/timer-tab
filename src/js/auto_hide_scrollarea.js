import {sleep} from './utils';

const scroll_el = document.getElementById('auto_hide_scrollarea');

export {getScroll, setScroll};

//*
const DEBUG = true;
/*/
const DEBUG = false;
//*/

const scroll_bar_width = get_scroll_bar_width();
document.documentElement.style.setProperty('--scroll-bar-width', scroll_bar_width+'px');
document.documentElement.classList.add('scroll-bar-width_is_available');

/*
function get_scroll_bar_width() {
  const scroll_el = document.createElement('div');
  hide_el(scroll_el);
  scroll_el.style.overflow = 'scroll'
  scroll_el.style.width = '100%';

  const inner_el = document.createElement('div');
  inner_el.style.width = '100%';
  inner_el.style.height = '100px';
  inner_el.style.backgroundColor = 'red';
  scroll_el.appendChild(inner_el);

  const anchor_el = document.body;

  anchor_el.appendChild(scroll_el);

  const width_1 = get_computed_width(inner_el);
  DEBUG && console.log({width_1});
  inner_el.style.width = '100vw';
  const width_2 = get_computed_width(inner_el)
  DEBUG && console.log({width_2});
  const scroll_bar_width = width_2 - width_1;

  anchor_el.removeChild(scroll_el);

  return scroll_bar_width;
}
*/

function get_scroll_bar_width() {

  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;

}

function hide_el(dummy_el) {
  dummy_el.style.position='absolute';
  dummy_el.style.top='9px';
  dummy_el.style.left='9px';
  /*
  dummy_el.style.top='-9999px';
  dummy_el.style.zIndex='-9999';
  dummy_el.style.visibility='hidden';
  dummy_el.style.opacity=0;
  */
}

function get_computed_width(el) {
  return el.offsetWidth;
}

/*
function getComputedStyle(el, prop) {
//return document.defaultView.getComputedStyle(that,null).getPropertyValue(styleProp);
}
*/


setTimeout(() => {
  document.documentElement.classList.add('inactive_state');
}, 2000)
/*
const INACTIVITY_TIME = 2*1000;
let lastActivity;
let checker;
function check() {
  if( checker ) return;
  checker = (
    setInterval(
      () => {
        if( isOlderThan(lastActivity, INACTIVITY_TIME) ){
          document.documentElement.classList.add('inactive_state');
          clearInterval(checker);
          checker = null;
        }
      },
      500,
    )
  );
}

function activityListener() {
  document.documentElement.classList.remove('inactive_state');
  lastActivity = new Date();
  check();
}
onActivity(activityListener);
function onActivity(activityListener) {
  activityListener();
  [
    'keydown',
    'wheel',
    'mousewheel',
    'touchstart',
    'touchmove',
    'mousedown',
    'mousemove',
  ].forEach(evName => {
    document.addEventListener(
      evName,
      () => {
     // DEBUG && console.log({evName});
        activityListener();
      },
      {passive: true}
    );
  });
}
*/

function isOlderThan(date, timespan1) {
  const now = new Date();
  const timespan2 = now - date;
  return timespan2 > timespan1;
}

onScroll();
scroll_el.addEventListener('scroll', onScroll, {passive: true});

function onScroll() {
  if( getScroll() === 0 ) {
    document.documentElement.classList.add('is_on_top');
  } else {
    document.documentElement.classList.remove('is_on_top');
  }
}

function getScroll() {
  return scroll_el.scrollTop;
}
function setScroll(newTop) {
  scroll_el.scrollTop = newTop;
}
