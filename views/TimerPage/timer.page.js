//import './css/clock.css';
import TimerView from './TimerView';
import onPageLoad from './onPageLoad';
import {config} from '../../tab-utils/views/FullViewWrapper';

export default config({
  route: '/',
  view: TimerView,

  // <title>⌛ Online Timer</title>
  title: 'Timer Tab',

  head: [
 // '<meta name="keywords" content="timer, alarm, stopwatch, countdown, alarm clock, online, webapp"/>'
    '<meta name="keywords" content="online timer"/>',

    //  http://stackoverflow.com/questions/5437674/what-utf-8-symbol-is-a-good-mark-of-time
    //  ➡ ➔ ➤ → ⟹  ⟶   •★ ⌚ ⚑ ⌛ ™ ♬ ♩♪♫
    // <meta property="og:description" itemprop="description" name="description" content="★★★★★ Free Online Web App: •Timer Countdown •Alarm Clock •Stopwatch" />
    // <meta property="og:description" itemprop="description" name="description" content="★★★★★ Timer Tab™ is a free online Web App for: ⌛ Timer Countdown, ⌚ Alarm Clock, and ⚑ Stopwatch. Featuring aesthetic & simple Design, 4.6/5 stars on the Web Store." />
    // <meta property="og:description" itemprop="description" name="description" content="⌛ Online Timer Countdown + ⌚ Online Alarm Clock + ⚑ Online Stopwatch" />
    '<meta property="og:description" itemprop="description" name="description" content="Web App: Online Timer Countdown + Online Alarm Clock + Online Stopwatch" />',
  ],
  onPageLoad,
});

