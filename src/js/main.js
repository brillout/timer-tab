//console todo; get seo stats before uploading this version containing mod desc
import 'regenerator-runtime/runtime';
import ml from './ml';
import auto_hide_scrollarea, {scrollToElement} from './auto_hide_scrollarea';
import loadAd from './loadAd';
import load_mobile_message from './load_mobile_message';
import load_timer from './load_timer';

window.onload = () => {
  auto_hide_scrollarea();

  load_timer();

  smoothen_settings_link();

  load_mobile_message();

  ml.loadAnalytics('UA-5263303-6',true);

  setTimeout(() => {
    loadAd();
  }, 1000);
}

function smoothen_settings_link() {
  const link_source = document.querySelector('#settings_link');
  link_source.onclick = ev => {
    scrollToElement('#settings');
    ev.preventDefault();
    return false;
  };
}
