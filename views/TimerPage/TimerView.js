import './css/index.css';
import React from 'react';
import {FullView, MorePanel} from '../../tab-utils/views/FullViewWrapper';
import {SettingsView} from '../../tab-utils/TabSettings/SettingsView';
import {preset_concept_name} from './js/preset_concept_name';
import {ad_slots} from './ad_slots';
import assert from '@brillout/assert';
import {HotNews} from '../HotNews';

export default TimerView;

function TimerView() {
  return <>
    <FullView>
      <FullViewContent />
    </FullView>

    <MorePanel>
      <Ad_BTF />
      <SettingsView preset_concept_name={preset_concept_name} />
      <HotNews />
    </MorePanel>
  </>;
}

function Ad_ATF() {
  const slots = ad_slots.filter(slot => slot.slotName.includes('ATF'));
  assert(ad_slots.length===2);
  assert(slots.length===1);
  return <AdView id="primary-ad" slot={slots[0]} />;
}
function Ad_BTF() {
  const slots = ad_slots.filter(slot => slot.slotName.includes('BTF'));
  assert(ad_slots.length===2);
  assert(slots.length===1);
  return <AdView id="secondary-ad" slot={slots[0]} />;
}

// TODO - move to tab-utils
function AdView({id, slot: {slotName, slotID}}) {
  assert(slotName && slotID);
  return (
    <div id={id}>
      <div className='ad-content-wrapper'>{
        <div id={slotName}>
          <div id={slotID}/>
        </div>
      }</div>
      <a className='ad_remover' href='donate' target="_blank">Remove ad</a>
    </div>
  );
}

function FullViewContent() {
  return (
    <div id='timer_table_scroll_area'>
    <div id='timer_table'>

      <div id='bodypadding'>
        <div id="ad_padder"></div>
      </div>
      <div id='stripH'></div>
      <div id='middletable' style={{width: '100%'}}><div style={{width: '100%', position: 'relative'}}>
        <div id='allcontent'>
          <div>
            <div id='inputs'>
              <div className='tr'>
                <div className='timerInput'>
                  <form id="timerForm">
                    <input type='tel' autoComplete="off" spellCheck="false" min='0' size='1' defaultValue=""  placeholder='h'/><span className='inputSep'></span
                   ><input type='tel' autoComplete="off" spellCheck="false" min='0' size='1' defaultValue="" placeholder='m'/><span className='inputSep s'></span
                   ><input type='tel' autoComplete="off" spellCheck="false" min='0' size='1' defaultValue=""  placeholder='s' className="s"/>
                  <button form='timerForm' id='timerButton' tabIndex='-1' type='submit'></button>
                  </form>
                </div>

                <div className='timerInput'>
                  <form id="alarmForm">
                    <input type='tel' autoComplete="off" spellCheck="false" min='0' max='23' maxLength='2' placeholder='h'/><span className='inputSep'></span
                   ><input type='tel' autoComplete="off" spellCheck="false" min='0' max='59' maxLength='2' placeholder='m'/><span className='inputSep s'></span
                   ><input type='tel' autoComplete="off" spellCheck="false" min='0' max='59' maxLength='2' placeholder='s' className="s" defaultValue=""/>
                   <button form='alarmForm' id='alarmButton' tabIndex='-1' type='submit'></button>
                  </form>
                </div>

                <div className='timerInput'>
                  <form id='stopwForm'>
                    {/*
                    no dummy input, then bugfix needed for chrome:
                      fix for chrome bug that offsets button
                        form#stopwForm > button{ display:block;margin: auto }
                      old bug fix some bug, but that leads to skinny button in IE
                        form#stopwForm { line-height:0; }
                    */}
                    <input type='tel' maxLength='2' style={{display: 'block', position: 'relative', zIndex: -10, visibility: 'hidden'}}/>
                    <button form='stopwForm' id='stopwButton' type='submit'></button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div id='vertical' style={{position: 'relative'}}>
              <div id='stripV'></div>
              <div id='head' style={{width: '100%', height: '100%'}}>
                <div id="counter_wrapper">
                  <div>
                    <div id='counter'></div>
                    <div>
                      <div id='alarmTime'></div>
                      <button type='button' tabIndex='-1' id='pause'></button>
                    </div>
                  </div>
                </div>
                <div id='youtube_wrapper'><div id='youtube_iframe'></div></div>
                <div id='filler' style={{height: '100%', width: '100%'}}></div>
                <div id="verticalBottom" style={{verticalAlign: 'bottom', textAlign: 'center'}}>
                  <a id='time' href='http://www.clocktab.com' tabIndex='-1' target='_blank' >Online Clock</a>
                </div>
              </div>
            </div>
          </div>
        </div>{/* END allcontent */}
      </div></div>{/* END middletable */}
      <Ad_ATF />

    {/* END of <div id='timer_table'> */}
    </div>
    </div>
  );
}
