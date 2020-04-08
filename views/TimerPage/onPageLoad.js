import load_timer from './js/load_timer';
//import init_clock_options from './js/init_clock_options';
import youtube_alarm from './js/youtube_alarm';
import auto_remove_hash from '../../tab-utils/auto_remove_hash';
import {ad_slots} from './ad_slots';
import load_ad from '../../tab-utils/load_ad';

export default onPageLoad;

async function onPageLoad (load_common){
  //const {get_option_value, font_loaded_promise} = init_clock_options();

  //load_clock({get_option_value});
  load_timer();

  auto_remove_hash();

  load_common();

  youtube_alarm();

  load_ad(ad_slots);
}

/* TODO
import deprecate_old_browsers from '../../tab-utils/deprecate_old_browsers';
  deprecate_old_browsers({projectName: 'Timer Tab', email: 'tim'+'ertab@br'+'illout.com'});
*/
