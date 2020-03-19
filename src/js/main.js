//console todo; get seo stats before uploading this version containing mod desc
import 'regenerator-runtime/runtime';
import ml from './ml';
import more_panel from 'tab-utils/more_panel';
import load_ad from './load_ad';
import load_timer from './load_timer';
import auto_remove_hash from 'tab-utils/auto_remove_hash';
import deprecate_old_browsers from 'tab-utils/deprecate_old_browsers';
import youtube_alarm from './youtube_alarm';

window.onload = () => {
  deprecate_old_browsers({projectName: 'Timer Tab', email: 'tim'+'ertab@br'+'illout.com'});

  more_panel();

  load_timer();

  auto_remove_hash({INCLUDE_LIST: ['#roadmap']});

  ml.loadAnalytics('UA-5263303-6',true);

  youtube_alarm();

  setTimeout(() => {
    load_ad();
  }, 1000);
}
