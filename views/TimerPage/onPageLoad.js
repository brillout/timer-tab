//import load_clock from './js/load_clock';
//import init_clock_options from './js/init_clock_options';
import auto_remove_hash from '../../tab-utils/auto_remove_hash';
import {ad_slots} from './ad_slots';
import load_ad from '../../tab-utils/load_ad';

export default onPageLoad;

async function onPageLoad (load_common){
  //const {get_option_value, font_loaded_promise} = init_clock_options();

  //load_clock({get_option_value});

  auto_remove_hash();

  load_common();

  load_ad(ad_slots);
}
