import load_timer from "./js/load_timer";
import { init_timer_settings } from "./init_timer_settings";
import youtube_alarm from "./js/youtube_alarm";
import auto_remove_hash from "../../tab-utils/auto_remove_hash";
import { ad_slots } from "./ad_slots";
import { load_ads, remove_ads } from "../../tab-utils/load_ad";

export default onPageLoad;

async function onPageLoad(load_common) {
  const { get_option_value } = init_timer_settings();

  //load_clock({get_option_value});
  load_timer();

  auto_remove_hash();

  load_common();

  youtube_alarm();

  //load_ads(ad_slots);
  remove_ads(ad_slots);
}

/* TODO
import deprecate_old_browsers from '../../tab-utils/deprecate_old_browsers';
  deprecate_old_browsers({projectName: 'Timer Tab', email: 'tim'+'ertab@br'+'illout.com'});
*/
