import load_timer from "./js/load_timer";
import { init_timer_settings } from "./init_timer_settings";
import auto_remove_hash from "../../tab-utils/auto_remove_hash";
import { adSlots } from "./adSlots";
import { audioPrefetch } from "./js/notify/audioAlarm";
import { youtubePrefetch } from "./js/notify/youtubeAlarm";
import { loadAds } from "../../tab-utils/ads/loadAds";

export default onPageLoad;

async function onPageLoad(load_common) {
  init_timer_settings();

  load_timer();

  auto_remove_hash();

  load_common();

  youtubePrefetch();

  audioPrefetch();

  loadAds(adSlots);
}

/* TODO
import deprecate_old_browsers from '../../tab-utils/deprecate_old_browsers';
  deprecate_old_browsers({projectName: 'Timer Tab', email: 'tim'+'ertab@br'+'illout.com'});
*/
