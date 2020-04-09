import ml from './js/ml';
import assert from '@brillout/assert';
import {TabSettings} from '../../tab-utils/TabSettings';
import {PRESETS} from './PRESETS';
import {preset_concept_name} from './js/preset_concept_name';
import {set_youtube_url} from './js/youtube_alarm';

export {init_timer_settings};

/*
import {dom_beat} from './load_clock';
import {refresh_big_text_size} from '../../BigText';
*/

function init_timer_settings() {
  const tab_settings = new TabSettings({
    option_spec_list: get_option_list(),
    preset_spec_list: PRESETS,
    on_any_change,
    enable_import_export: true,
    subapp_id: 'timer',
    preset_concept_name,
  });

  const get_option_value = tab_settings.get_option_value.bind(tab_settings);

  tab_settings.generate_dom();

  return {get_option_value};

  function on_any_change({is_initial_run}) {
      update_youtube_url();
      ml.htmlBackgroundListener()
  }

  function update_youtube_url(){
    const youtube_url = get_option_value('timer_youtube_alarm');
    assert(youtube_url, {youtube_url});
    set_youtube_url(youtube_url);
  }
}

function get_option_list() {
  return [
    {
      option_id:'timer_theme',
      option_type: 'preset-input',
      option_description: preset_concept_name,
      option_default: 'classic',
    },
    {
      option_id: 'timer_background_image',
      //option_id: 'bg_url',
      option_type: 'background-image-input',
      option_description: 'Background Image',
      option_default: ''    ,
      option_placeholder: 'Image URL',
      is_creator_option: true,
    },
    {
      option_id: 'timer_background_color',
      option_type: 'background-color-input',
      option_description: 'Background Color',
      option_default: '#ffffff',
      is_creator_option: true,
    },
    {
      option_id: 'timer_youtube_alarm',
      //option_id: 'goto_url',
      option_type: 'text-input',
      option_description: 'YouTube Alarm',
      option_default: ''    ,
      option_placeholder: 'Image URL',
      is_creator_option: true,
    },
  ];
}
