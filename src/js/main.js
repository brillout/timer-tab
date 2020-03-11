//console todo; get seo stats before uploading this version containing mod desc
import 'regenerator-runtime/runtime';
import ml from './ml';
import auto_hide_scrollarea, {scrollToElement} from './auto_hide_scrollarea';
import load_ad from './load_ad';
import load_timer from './load_timer';
import auto_remove_hash from 'tab-utils/auto_remove_hash';
import deprecate_old_browsers from 'tab-utils/deprecate_old_browsers';

window.onload = () => {
  deprecate_old_browsers({projectName: 'Timer Tab', email: 'tim'+'ertab@br'+'illout.com'});

  load_timer();

  auto_hide_scrollarea();

  auto_remove_hash({INCLUDE_LIST: ['#settings', '#roadmap']});

  smoothen_settings_link();

  ml.loadAnalytics('UA-5263303-6',true);

  setTimeout(() => {
    load_ad();
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
