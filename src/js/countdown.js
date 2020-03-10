import ml from './ml';
import add_yt_ctrl from './add_yt_ctrl';

const ctObj = {};

/*
const DEBUG_AUDIO = true;
/*/
const DEBUG_AUDIO = false;
//*/

export default ctObj;

ctObj.TYPES={STOPW:1,TIMER:2,ALARM:3};

(function(){
  function loadDom(inputForm,_type,_callback){ 
    var __getInputs;
    var __setInputs;
    var __isAMPM;
    var __setInputChangeListener;
    function fireCallback(){
      _callback(__getInputs,__setInputs,__isAMPM,__setInputChangeListener);
    }
    var changeListener;
    function __setInputChangeListener(listener){changeListener=listener}
    var __onInputsChange=function(){if(changeListener) changeListener()};

    //get screen size
    //-window.screen.width, window.screen.height
    // -http://stackoverflow.com/questions/4833669/iphone-4-screen-width-reports-320-i-thought-it-was-more
    //get dpi
    //-window.devicePixelRatio
    //-matchMedia("(-webkit-device-pixel-ratio: 1)")
    if(_type!==ctObj.TYPES.STOPW && ml.isTouchDevice() && Math.max(window.screen.width,window.screen.height)<=1100)
  //if(_type!==ctObj.TYPES.STOPW && true)
    //wheel picker
    (function(){ 
      function loadCallback(){ 
        //ressources
        //-http://stackoverflow.com/questions/13170476/make-mobiscroll-height-and-width-responsive
        //-change font-size; .dw-li{ font-size: 2em!important; }
        ml.addCss(".dw,.dwwr,.dwc{border:0!important;padding:0!important;margin:0!important;background:0!important;}",true);
        ml.addCss("form{line-height:.6em}",true);
        ml.addCss(".dw{-webkit-filter:grayscale(1);-moz-filter: grayscale(1);} .dw-li{font-size:2em!important}",true);
        [].slice.call(inputForm.querySelectorAll('input,span')).forEach(function(i){i.parentElement.removeChild(i)});
        var container = document.createElement('div');
        inputForm.insertBefore(container,inputForm.firstChild);
        var wheel = $('#'+inputForm.id+' div');
        var format=ctObj.TYPES.ALARM?'HH:ii':'ii:ss';
        wheel.mobiscroll().time({
            //theme: 'ios',
            theme: 'android-ics light',
            display: 'inline',
            mode: 'scroller',
            timeFormat: format,
            timeWheels: format,
            /*
            height: 24,
            width: 10,
            */
            rows: 3,
            onChange:function(){__onInputsChange()}
        });
        __getInputs=function(){ 
          var vals=wheel.mobiscroll('getValue');
          return {
            h:parseInt(vals[0],10),
            m:parseInt(vals[1],10),
            s:0
          };
        }; 
        __setInputs=function(h,m,s,isPm){
          wheel.mobiscroll('setValue',[h,m],true);
        };

        fireCallback();
      } 
      ml.loadASAP("https://brillcdn.appspot.com/sf/mobiscroll.datetime.ics.css");
      //http://zeptojs.com/zepto.min.js
      ml.loadASAP("https://brillcdn.appspot.com/sf/zepto.min.js",function(){
        ml.loadASAP("https://brillcdn.appspot.com/sf/mobiscroll.datetime.ics.js",loadCallback);
      });
    })(); 
    else
    //<INPUT>
    (function(){ 
      var input_number;
      var input_period;
      var input_all;
      (function(){ 
        function _generateInput(p,max) {
          var input=inputForm.appendChild(document.createElement('input'));
          input.setAttribute('autocomplete','off');
          input.setAttribute('spellcheck','false');
          input.setAttribute('min','0');
          if(max) input.setAttribute('max',''+max);
          input.setAttribute('size','1');
          input.setAttribute('placeholder',p);
        }

        if(!inputForm) {
          inputForm=document.createElement('form');
          _generateInput('h',_type===ctObj.TYPES.ALARM?'23':undefined);
          _generateInput('m',_type===ctObj.TYPES.ALARM?'59':undefined);
          _generateInput('s',_type===ctObj.TYPES.ALARM?'59':undefined);
        }

        if(window['WinJS'] && window['WinJS']['UI'] && window['WinJS']['UI']['TimePicker'] && _type!==ctObj.TYPES.STOPW) { 
        //metro
        //if(winInput) return [function(){ var ret=winInput.current; if(ret<=new Date()) ret.setUTCDate(ret.getUTCDate()+1);return ret}, function(h,m,s){winInput.current=h+":"+m+":"+s}];
          [].slice.call(inputForm.querySelectorAll('input')).forEach(function(i){i.parentElement.removeChild(i)});
          if(_type===ctObj.TYPES.ALARM) {
            var tp=document.createElement('div');
            inputForm.insertBefore(tp,inputForm.firstChild);
            new window['WinJS']['UI']['TimePicker'](tp);
          }
          if(_type===ctObj.TYPES.TIMER) {
            for(var i=0;i<3;i++){
              var sel=document.createElement('select');
              sel.setAttribute('placeholder',i===0&&'h'||i===1&&'m'||i===2&&'s');
              for(var j=0;j<100;j++) {
                var opt=sel.appendChild(document.createElement('option'));
                opt.value=j.toString();
                opt.innerHTML=opt.value;
              }
              inputForm.insertBefore(sel,inputForm.firstChild);
            }
          }
          input_number = [].slice.call(inputForm.getElementsByTagName('select'));
          if(_type===ctObj.TYPES.ALARM) input_period = input_number.pop();
        } 
        else input_number = [].slice.call(inputForm.getElementsByTagName('input'));

        input_all = input_number;
        if(input_period) input_all.push(input_period);
      })(); 

      __getInputs=function(){ 
        var vals = input_number.map(function(i){
          var ret=parseInt(i.value,10);
          if(isNaN(ret)) return undefined;
          if(ret||ret===0) return ret;
          return undefined;
        });
        if(vals.length<2) vals.push(undefined);
        ml.assert(vals.length===3);
        return {
          h:vals[0],
          m:vals[1],
          s:vals[2],
          period:input_period&&input_period.value || undefined
        };
      }; 
      __setInputs=function(h,m,s,isPm){ 
        input_number[0].value=h;
        input_number[1].value=m;
        if(input_number[2]) input_number[2].value=s;
        ml.assert(isPm===undefined || input_period);
        if(input_period) input_period.value=isPm?'PM':'AM';
      }; 

      __isAMPM=!!input_period;

      //addEventListener('input'.. incomplete; isn't fired when value changed programmatically
      input_all.forEach(function(i){i[i.tagName==='SELECT'?('onc'+'hange'):'oninput']=function(){__onInputsChange()}});

      fireCallback();
    })(); 
  } 
  ctObj.input=function(inputForm,_type,_timer){
  //{{{
    //spinning wheel inputs{ 
    //-test; http://jsfiddle.net/KGGdt/
    //-http://demo.mobiscroll.com/datetime/time
    //-http://cubiq.org/spinning-wheel-on-webkit-for-iphone-ipod-touch
    //-native picker
    // -http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.Picker
    //  -"On iOS the size of the picker is fixed at the same size as the iPhone keyboard"
    // -http://stackoverflow.com/questions/1482586/comparison-between-corona-phonegap-titanium
    // -http://stackoverflow.com/questions/11201110/html-5-ios-creating-hybrid-applications
    // -http://stackoverflow.com/questions/6651125/phonegap-to-what-extent-can-i-interact-with-native-ui-components
    // -http://stackoverflow.com/questions/4946919/invoke-native-date-picker-from-web-app-on-ios-android
    // -http://stackoverflow.com/questions/388814/date-picker-for-iphone-web-application
    //} 
    ml.assert(_type===ctObj.TYPES.TIMER || _type===ctObj.TYPES.ALARM || _type===ctObj.TYPES.STOPW);
    ml.assert(!inputForm || inputForm.nodeName&&inputForm.nodeName.toLowerCase()==='form');

    var _onInputsChange;
    var _onLoaded=function(){ 
      //initial _setInputs + _onInputsChange
      if(_type===ctObj.TYPES.STOPW || !_timer.data) return;
      var d=_timer.data.getPreset(_type);
      if(d.hours===undefined && d.minutes===undefined && d.seconds===undefined){
        if(_type===ctObj.TYPES.ALARM){
          var t=ml.date.add(new Date(),0,10,0);
          d.hours=t.getHours();
          d.minutes=t.getMinutes();
        }
        if(_type===ctObj.TYPES.TIMER){
          d.minutes=10;
        }
      }
      function setInit(){_setInputs(d.hours,d.minutes,d.seconds,true)};
      setInit();
      if(window.navigator.userAgent.indexOf('MSIE')!==-1) setTimeout(setInit,1);//IE9 bug fix
      _onInputsChange=function(__inputs){_timer.data.setPreset({hours:__inputs.h,minutes:__inputs.m,seconds:__inputs.s},_type)};
    }; 
    var _setInputs;
    var _getCountdownEnd;
    loadDom(inputForm,_type,function(__getInputs,__setInputs,__isAMPM,__setInputChangeListener){ 
      if(_type===ctObj.TYPES.STOPW){
        _getCountdownEnd=function(){return undefined};
        return;
      }

      var _inputChangeListener;
      (function(){
        var oldVals=__getInputs();
        _inputChangeListener=function(noOnChange){ 
          var newVals=__getInputs();
          if(JSON.stringify(oldVals)!==JSON.stringify(newVals)){
            if(!noOnChange) ml.safe_call.apply(null,[_onInputsChange].concat(newVals));
            oldVals=newVals;
          }
        }; 
        __setInputChangeListener(_inputChangeListener);
      })();

      _setInputs=function(h,m,s,noOnChange){ 
        ml.assert( (h===undefined||h.constructor===Number) &&
                   (m===undefined||m.constructor===Number) &&
                   (s===undefined||s.constructor===Number) );
        if(h===undefined) h='';
        if(m===undefined) m='';
        if(s===undefined) s='';
        var isPm;
        if(__isAMPM && parseInt(h,10)>=12){
          h-=12;
          isPm=true;
        }
        if(!h && _type===ctObj.TYPES.ALARM) h='0';
      //if(!m && _type===ctObj.TYPES.ALARM) m='0';
        if(__isAMPM && parseInt(h,10)===0) h='12';
        if(_type===ctObj.TYPES.ALARM){
          h=ml.date.readablize(h);
          m=ml.date.readablize(m);
          s=ml.date.readablize(s);
          if(!h) h='00';
          if(!m) m='00';
        }
        if(_type===ctObj.TYPES.TIMER){
          if(h) h=parseInt(h,10);
          if(m) m=parseInt(m,10);
          if(s) s=parseInt(s,10);
        }
        __setInputs(h,m,s,isPm);
        _inputChangeListener(noOnChange);
      }; 

      _getCountdownEnd=(function(){ 
        function ___getInputs(){
          var inputs = __getInputs();
          if(inputs.period==='PM' && inputs.h!==12) inputs.h=inputs.h+12;
          if(inputs.period==='AM' && inputs.h===12) inputs.h=inputs.h-12;
          return inputs;
        }
        if(_type===ctObj.TYPES.TIMER) return function(){
          var inputs = ___getInputs();
          var ret =+(ml.date.add(new Date(),inputs.h,inputs.m,inputs.s));
          var MAX_COUNTDOWN = (+new Date())+999999999999;
          if(isNaN(ret) || ret>MAX_COUNTDOWN) return MAX_COUNTDOWN;
          return ret;
        };
        if(_type===ctObj.TYPES.ALARM) return function(){
          var inputs = ___getInputs();
          var ret=new Date();
          ret.setHours(inputs.h||0,inputs.m||0,inputs.s||0,0);
          //don't use setUTCDate to make it work with timezone
          if(ret<=new Date()) ret.setDate(ret.getDate()+1);
          return +ret;
        };
      })(); 

      _onLoaded();
    }); 

    //inputForm.set_     = function(){
    //  ml.assert(_setInputs);
    //  if(_setInputs) _setInputs.apply(null,arguments);
    //};
    //trigger onStart, submitListeners
    inputForm.onsubmit=function(ev){ 
      if(ev) ev.preventDefault();
      ml.assert(_getCountdownEnd);
      if(!_getCountdownEnd) return false;
      ml.safe_call(this.onStart,_getCountdownEnd());
      var that=this;
      ml.safe_call(function(){
        inputForm.submitListeners && inputForm.submitListeners.forEach(function(l){l.call(that)});
      });
      return false;
    }; 
    inputForm.type=_type;
    return inputForm;
  //}}}
  };

})();

ctObj.Timer_dom=(function(){ 
  function Timer_js(initialState){ 
    var that=this;
    that.listen={};
    that.trigger={};
  //that.spark
  //that.kill

    var STATE_CODES={};
    STATE_CODES.STOPED =1;
    STATE_CODES.PAUSED =2;
    STATE_CODES.PLAYING=3;
    STATE_CODES.RINGING=4;

    function triggerStateChangeEvent(ns,action)
    {
      ml.safe_call(that.listen.stateChange,action,ns,STATE_CODES);
      if(action) ml.safe_call(that.listen.dataChange,{state:state.getData(),operation:action});
    }
    function triggerEndChangeEvent(newEnd,oldEnd){
      ml.safe_call(that.listen.endChange,newEnd,oldEnd);
    }

    //define state+public fcts
    var state={};
    //{{{
    (function(){
      //state variables
      var __start  = initialState && initialState.start ,
          __end    = initialState && initialState.end   ,
          __paused = initialState && initialState.paused;

      //state variables readers
      state.isNotStoped=function()
      //{{{
      {
        return __start!==undefined;
      };
      //}}}
      state.isPaused=function()
      //{{{
      {
        return !!__paused;
      };
      //}}}
      function getDiff()
      //{{{
      {
        ml.assert(__paused===undefined || __paused.constructor === Number);
        var ct_date = __paused || +new Date;
        if(__end) return   __end - ct_date;
                  return ct_date - __start;
      }
      //}}}
      //state.getMs=function()
      ////{{{
      //{
      //  return getDiff()%1000;
      //};
      ////}}}
      state.getDelta=function()
      //{{{
      {
        if(__end) return Math.ceil (getDiff()/1000);
                  return Math.floor(getDiff()/1000);
      };
      //}}}
      state.getPercent=function()
      //{{{
      {
        if(!__end) return null;
        ml.assert(__end  ,  '__end=='+__end);
        ml.assert(__start,'__start=='+__start);
        var progress_total   = Math.abs(__end - __start); //if timer set to 0 -> progress_total may be negative
        var progress_current = getDiff();
        var res = progress_total===0?1:Math.min(1-progress_current/progress_total,1);//Math.min(1/0,1)===1 && isNaN(Math.min(0/0,0))
        ml.assert(!isNaN(res),'progress_total=='+progress_total+',progress_current=='+progress_current);
        ml.assert(res>=0 && res<=1,res);
        return res;
      };
      //}}}
      state.isCountdown=function()
      //{{{
      {
        return !!__end;
      };
      //}}}
      state.getData=function()
      //{{{
      {
        return {start:__start,end:__end,paused:__paused};
      };
      //}}}
      state.init__=function()
      //{{{
      {
        ml.assert(!initialState || initialState.end===undefined || initialState.end.constructor===Number);

        //if(initialState && (initialState.end===null || initialState.end>(initialState.paused || new Date)))
        //{
        //  ml.assert(__end!==undefined && __start!==undefined);
        //  triggerStateChangeEvent(__paused?STATE_CODES.PAUSED:STATE_CODES.PLAYING,true);
        //}
        
        var stillRunning = initialState && initialState.start && (initialState.end===undefined || initialState.end>(initialState.paused || +new Date()));

        triggerStateChangeEvent(!stillRunning && STATE_CODES.STOPED || __paused && STATE_CODES.PAUSED || STATE_CODES.PLAYING);

        heartbeat(true);
      };
      //}}}

      that.trigger.start__=function(newEnd)
      //{{{
      {
        ml.assert(newEnd!=='Invalid Date' && (newEnd===undefined || newEnd.constructor===Number && !isNaN(newEnd) && (newEnd-(+new Date()))<=999999999999));
        __start  = +new Date();
        triggerEndChangeEvent(newEnd,__end);
        __end    = newEnd;
        __paused = undefined;

        triggerStateChangeEvent(STATE_CODES.PLAYING,'start');

        heartbeat(true);
      };
      //}}}
      that.trigger.stop__=function()
      //{{{
      {
          if(!state.isNotStoped()) return;
          __start  = undefined;
          triggerEndChangeEvent(undefined,__end);
          __end    = undefined;
          __paused = undefined;
          triggerStateChangeEvent(STATE_CODES.STOPED,'st'+'op');
      };
      //}}}
      that.trigger.togglePause=function()
      //{{{
      {
        ml.assert(__paused===undefined || __paused.constructor === Number);

        if(!__end && !__start) return;//already stoped

        var delta = __paused?new Date()-__paused:0;

        if(__end && (__end+delta)<new Date()) that.trigger.stop__();
        else if(!__paused)
        {
          triggerEndChangeEvent(undefined,__end);
          __paused = +new Date();
          triggerStateChangeEvent(STATE_CODES.PAUSED,'pause');
        }
        else
        {
          ml.assert(__paused.constructor===Number);
          __start = +new Date(__start + delta);
          if(__end){
            var newEnd = +new Date(__end + delta);
            triggerEndChangeEvent(newEnd,undefined);
            __end = newEnd;
          }
          __paused = undefined;
          triggerStateChangeEvent(STATE_CODES.PLAYING,'resume');
        }
      };
      //}}}
      that.trigger.toggleStop=function(newEnd)
      //{{{
      {
        ml.assert(newEnd!=='Invalid Date'); //happens if __end is set too far in the future

        if(state.isNotStoped()) that.trigger.stop__();
        else that.trigger.start__(newEnd);

        heartbeat();
      };
      //}}}
    })();
    //}}}

    var heartbeat=(function()
    //{{{
    {
      var lastDiff;
      var lastStarted;

      return function(reset)
      {
        if(reset){lastDiff=true;lastStarted=true}
        var percent = state.getPercent();
        if(!state.isNotStoped()){
          if(lastStarted) ml.safe_call(that.listen.countdown_,-2,(percent&&1)||percent);
          lastStarted=false
          return;
        }
        lastStarted=true;
        var diff_ = state.getDelta();
        if(lastDiff===undefined || lastDiff!==diff_)
        {
          lastDiff=diff_;
          ml.safe_call(that.listen.countdown_,diff_,percent);
          if(diff_===0 && state.isCountdown()) triggerStateChangeEvent(STATE_CODES.RINGING);
        }
      };
    //}}}
    })();

    (function(){
      var sparking;
      that.spark=function()
      //{{{
      {
        ml.assert(sparking===undefined);
        sparking=true;
        (function fn(){
          if(!sparking)return;
          heartbeat();
          window.setTimeout(fn,300);
        })();
        state.init__();
      };
      //}}}
      that.kill=function()
      //{{{
      {
        sparking=false;
      };
      //}}}
    })();
  } 

  var unity={};
  //*
  ml.safe_call(function(){ 
    var u = window['external'] && window['external']['getUnityObject'] && window['external']['getUnityObject'](1.0);
    (function(){
      if(!u)return;
      var initObj={};
      initObj['name']    = document.querySelector('meta[itemprop=name]').content;
      initObj['iconUrl'] = document.querySelector('link[rel=apple-touch-icon]').href;
      ml.assert(initObj['name']&&initObj['iconUrl']);
      initObj['onInit']  = function(){};
      u['init'](initObj);
    })();
    unity.unityNotification=function(text){
      if(!u) return;
      u['Notification']['showNotification'](text,'',null);
    };
    unity.setProgressBar=function(percent,count,isUrgent){
      if(!u) return;
    //u['Launcher']['clearCount']();
      u['Launcher']['setCount'](count);
      if(percent!==undefined && percent!==null)
        u['Launcher']['setProgress'](percent);
      else
        u['Launcher']['clearProgress']();
      u['Launcher']['setUrgent'](isUrgent);
    };
    unity.setActions=function(ctInputs,pauseBtn){
      if(!u) return;
    //u['removeActions']();
      u['Launcher']['removeActions']();
      if(pauseBtn){
        u['addAction']("/Toggle Pause"                ,function(){pauseBtn.click()});
        u['Launcher']['addAction']("Pause/Resume/Stop",function(){pauseBtn.click()});
//      newState!==STATE_CODES.STOPED && u['Launcher']['addAction'](
//        newState===STATE_CODES.RINGING&&"Stop Ringing"||newState===PLAYING&&"Pause"||newState===PAUSED&&"Resume",
//        function(){PAUSE_ELEM.click()}
//      );
      }
      ctInputs.forEach(function(ctInput){
        var actionName = {};
        actionName[ctObj.TYPES.TIMER]="Countdown";
        actionName[ctObj.TYPES.ALARM]="Alarm Clock";
        actionName[ctObj.TYPES.STOPW]="Stopwatch";
        u['addAction']("/"+actionName[ctInput.type],function(){ctInput.onsubmit()});
        u['Launcher']['addAction']("Start "+actionName[ctInput.type],function(){ctInput.onsubmit()});
      });
    };
  }); 
  //*/

  var notify={};
  (function(){ 
    var NO_DYNAMIC_FAVICONS = /Chrome/.test(navigator.userAgent) && /Chrome[^\s]*/.exec(navigator.userAgent)[0].replace('Chrome/','').split('.').map(function(v,i){return [parseInt(v,10),[22,0,1215,0][i]||0]}).map(function(v){if(v[0]>v[1]) return true;if(v[0]<v[1]) return false;return undefined}).reduce(function(v1,v2){return v1===undefined?v2:v1})===false;
    var IS_METRO_APP = window['Windows'] && window['Windows'] && window['Windows']['UI'] && window['Windows']['UI']['Notifications'] && window['WinJS'] && window['WinJS']['Application'];
    var onPopupClick;
    var NOTI_TEXT   = '';
    var NOTI_TEXT_2 = '';
    var notis={};
    (function(){
    //{{{
      var feature_fcts=[];

      //define metro notifications
      //{{{
      feature_fcts.push(function()
      {
        if(!IS_METRO_APP) return;
        var oldBigText;
        var oldSmallText;
        var lastUpdate;
        var REFRESH_TIME = 60;
        notis.metro.tile=function(diff__)
        //{{{
        {
          var bigText,smallText;
          var newText=[];
          if(diff__>=100*60)
          {
            newText[0]=(diff__/3600)|0;
            newText[1]='Hour'+(newText[0]==1?'':'s')+' '+(((diff__%3600)/60)|0)+' Min';
          }
          else if(diff__>60)
          {
            newText[0]=diff__/60|0;
            newText[1]='Minute'+(newText[0]==1?'':'s');
            if(diff__<60*5)
            {
              var secs=(diff__%60/10)|0;
              newText[1]+=' '+secs+(secs<1?'':'0')+' Sec';
            }
          }
          else
          {
            if(diff__<0) diff__=0;
            newText[0]=diff__;
            newText[1]='Second'+(newText[0]==1?'':'s');
          }
          bigText=newText[0];
          smallText=newText[1];
          
          var limit = new Date().getTime()-1000*(REFRESH_TIME-1);
          if(oldBigText && oldBigText===bigText && oldSmallText && oldSmallText===smallText && lastUpdate && lastUpdate>limit) return;
          oldBigText=bigText;
          oldSmallText=smallText;
          lastUpdate=new Date().getTime();

          var Noti = window['Windows']['UI']['Notifications'];

          var wideTile = Noti['TileUpdateManager']['getTemplateContent'](Noti['TileTemplateType']['tileWideText03']); 
          var tileTextAttributes = wideTile.getElementsByTagName("text");
          tileTextAttributes[0].appendChild(wideTile['createTextNode'](bigText+" "+smallText));

          var squareTile = Noti['TileUpdateManager']['getTemplateContent'](Noti['TileTemplateType']['tileSquareBlock']);
          var tileAttributes = squareTile.getElementsByTagName("text");
          tileAttributes[0].appendChild(squareTile['createTextNode'](bigText));
          tileAttributes[1].appendChild(squareTile['createTextNode'](smallText));

          var node = wideTile.importNode(squareTile.getElementsByTagName("binding").item(0), true);
          wideTile.getElementsByTagName("visual").item(0).appendChild(node);

          var tileNotification = new Noti['TileNotification'](wideTile);
          var expire_ = new Date(new Date().getTime()+1000*REFRESH_TIME);
          tileNotification['expirationTime'] = expire_;
          Noti['TileUpdateManager']['createTileUpdaterForApplication']()['update'](tileNotification);
          //if(lastBadge) badgeNoti(lastBadge,tileNotification['expirationTime']);
          if(lastBadge) badgeNoti(lastBadge,expire_);
        };
        //}}}
        var lastBadge;
        function badgeNoti(badge,expire)
        //{{{
        {
          lastBadge=badge;
          var Noti = window['Windows']['UI']['Notifications'];
          var badgeXml = Noti['BadgeUpdateManager']['getTemplateContent'](Noti['BadgeTemplateType']['badgeNumber']);
          var badgeAttributes = badgeXml.getElementsByTagName("badge");
          badgeAttributes[0].setAttribute("value", badge);
          var badgeXml = new Noti['BadgeNotification'](badgeXml);
          expire = new Date(new Date().getTime()+1000*10);
          if(expire) badgeXml['expirationTime'] = expire;
          Noti['BadgeUpdateManager']['createBadgeUpdaterForApplication']()['update'](badgeXml);
        }
        //}}}
        notis.metro.badge=function(status_,STATE_CODES)
        //{{{
        {
          var map={};
          map[STATE_CODES.PAUSED ]='paused';
          map[STATE_CODES.STOPED ]='paused';
          map[STATE_CODES.PLAYING]='playing';
          map[STATE_CODES.RINGING]='alert';
          badgeNoti(map[status_]);
        };
        //}}}
        notis.metro.toast=function(text_)
        //{{{
        {
          var template = window['Windows']['UI']['Notifications']['ToastTemplateType']['toastText02'];
          var toastXml = window['Windows']['UI']['Notifications']['ToastNotificationManager']['getTemplateContent'](template);
          var toastTextElements = toastXml.getElementsByTagName("text");
          toastTextElements[0].appendChild(toastXml['createTextNode'](text_));
          var toastNode = toastXml['selectSingleNode']("/toast");

          /*
          //var img="ms-appx:///images/redWide.png";
          var img="images/logo.png";
          var image = toastXml['createElement']("image");
          image.setAttribute("src", img);
          image.setAttribute("alt", "red graphic");
          toastNode.appendChild(image);
          */

          var audio = toastXml['createElement']("audio");
          //Notification.Looping.Alarm
          //Notification.Looping.Alarm2
          audio.setAttribute("src", "ms-winsoundevent:Notification.Looping.Alarm");
          audio.setAttribute("loop", "true");
          toastNode.appendChild(audio);

          toastNode.setAttribute("duration", "long");
          //toastNode.setAttribute("launch", '{"type":"toast","param1":"12345","param2":"67890"}');

          var toast = new window['Windows']['UI']['Notifications']['ToastNotification'](toastXml);
          var toastNotifier = window['Windows']['UI']['Notifications']['ToastNotificationManager']['createToastNotifier']();
          toastNotifier['show'](toast);
        };
        //}}}
        //metro_ lock screen
        //{{{
      //      <Extensions>
      //        <Extension Category="windows.backgroundTasks" StartPage="index.html">
      //          <BackgroundTasks>
      //            <Task Type="timer" />
      //          </BackgroundTasks>
      //        </Extension>
      //      </Extensions>
      //
      //http://msdn.microsoft.com/en-us/library/windows/apps/hh700416.aspx
      //http://msdn.microsoft.com/en-us/library/windows/apps/hh779720.aspx

      //var div = document.createElement('div');
      //div.innerHTML='req me';
      //div.onclick=function(){Windows.ApplicationModel.Background.BackgroundExecutionManager.requestAccessAsync().then(function(res){onsole.log(res)})};
      //$('topBox').appendChild(div);
      //}}}
        window['WinJS']['Application']['oncheckpoint']=function()
        {//This application is about to be suspended.
          window['Windows']['UI']['Notifications']['TileUpdateManager']['createTileUpdaterForApplication']()['cle'+'ar']();
          window['Windows']['UI']['Notifications']['BadgeUpdateManager']['createBadgeUpdaterForApplication']()['cle'+'ar']();
        };
      });
      //}}}

      //define webkit notification
      feature_fcts.push(function(){ 
        if(!ml.noti.isAvailable()) return;
        notis.popupNotification=function(timerName){
          if(ml.noti.permission_notAllowed()) return;
          ml.asyncStore.get('disableNotification',function(val){
            if(val) return;
            var cancelFct = ml.noti.fire(
              NOTI_TEXT,
              NOTI_TEXT_2,
              ml.timerIcon(0,1), //returns 16x16px image, but chrome scales it up
            //function(){window.setTimeout(cancelFct,15000)},
              10000,
              function(){
                //window.focus();
                cancelFct();
                if(onPopupClick) onPopupClick();
              }
            );
            notis.popupNotificationCancel=cancelFct;
            //not working on reload:
            //-https://code.google.com/p/chromium/issues/detail?id=40262
            //-http://stackoverflow.com/questions/5971710/how-can-i-close-all-notifications-of-a-page-before-unload-it-without-use-window
            ml.addCloseEvent(cancelFct);

          });
        };
      }); 

      /*
      //define webkit notification
      feature_fcts.push(function(){ 
        if(window.webkitNotifications) notis.webkitNoti=function(timerName)
        {
          if(window.webkitNotifications.checkPermission()!=0) return;
          ml.asyncStore.get('disableNotification',function(val){
            var notii=window.webkitNotifications.createNotification(
              ml.timerIcon(0,1), //returns 16x16px image, but chrome scales it up
              NOTI_TEXT,
              NOTI_TEXT_2
            );

            function canceli(){notii.cancel()}
            notii.ondisplay=function(){window.setTimeout(canceli,8000)};
            notii.onclick  =function(){
              //window.focus();
              canceli();
              if(onPopupClick) onPopupClick();
            };
            //not working on reload:
            //-https://code.google.com/p/chromium/issues/detail?id=40262
            //-http://stackoverflow.com/questions/5971710/how-can-i-close-all-notifications-of-a-page-before-unload-it-without-use-window
            ml.addCloseEvent(canceli);

            notii['sh'+'ow']();
          });
        };
      }); 
      */

      //define unity notifications
      feature_fcts.push(function(){ 
        notis.unityNoti=function(){
          unity.unityNotification(NOTI_TEXT)
        };
      }); 

      //define chrome extension badge notification
      feature_fcts.push(function(){ 
        if(!window['chrome']||!window['chrome']['browserAction']||!window['chrome']['browserAction']['setBadgeText']) return;
        notis.chromeExtensionBadge=function(diff,percent){
          window['chrome']['browserAction']['setBadgeText']({'text':ml.date.readable.getCounter(diff<0?0:diff*1000,'text')});
          var color = percent===undefined||percent===null?[0,0,255]:[parseInt(255*percent,10),parseInt(255*(1-percent),10),0];
          //color.push(0);//array format doesn't seem to work
          color = '#'+color.map(function(v){var ret=v.toString(16);return ret.length===1?'0'+ret:ret}).reduce(function(l,r){return l+r});
          window['chrome']['browserAction']['setBadgeBackgroundColor']({'color':color});
        };
      }); 

      notis.metro={};
      //define IE9 notification
      //{{{
      if(window['external']) notis.IE9Noti=function()
      {
        //window['external']['msSiteModeActivate']===undefined on IE9
        //if(window['external'] && window['external']['msSiteModeActivate'])
        {
          try
          {
            window['external']['msSiteModeActivate']();
          } catch(e){}
        }
      };
  //  function(diff,percent)
  //  {
  //    if(window['external'] && window['external']['msIsSiteMode'])
  //    {
  //        try {
  //            if (window['external']['msIsSiteMode']()) 
  //                //window['external']['msSiteModeSetIconOverlay'](iconURL, '6');
  //                window['external']['msSiteModeSetIconOverlay']('green.ico', 'on');
  //        }
  //        catch (e) {
  //            // Fail silently.
  //        }
  //    }
  //  };
  // if(window['external'])
  // {
  //   window.onload=function()
  //   {
  //      try {
  //         // check if "msIsSiteMode" method exists, then call it
  //         //if (window['external']['msIsSiteMode'] && window['external']['msIsSiteMode']()) {
  //             g_ext = window['external'];
  //             g_ext['msSiteModeCreateJumpList']("My Site");
  //             g_ext['msSiteModeAddJumpListItem']( "Task2", "/users/44324847/task2", "img/icon.ico");
  //             g_ext['msSiteModeAddJumpListItem']( "Task1", "/users/44324847/task1", "img/icon.ico");
  //         //}
  //     } catch(ex) {}
  //   };
  // }
      //}}}

      ml.safe_call(feature_fcts);
    //}}}
    })();
    notify.state=function(ctYt,_onPopupClick){ 
      onPopupClick=_onPopupClick;
      //define ring notifications
      notis.ring={};
      (function(){ 
        var ring={};
        //metro_ notification
        //{{{
        var feature_fcts=[];
        feature_fcts.push(function(){
          //It suffices to have a single audio or video tag with msAudioCategory="media".
          //Unless and until YouTube adds an msAudioCategory="media" tag on their content that you're <iframe>-ing in,
          //you could have an additional audio tag in your app which had the tag
          //(but didn't necessarily actually play any audible audio.)
          //source: http://social.msdn.microsoft.com/Forums/en-US/winappswithhtml5/thread/b37a99cb-395c-473a-a43c-0d3a8764b3cd/
          if(notis.metro.toast) ring.metroToast=function() { notis.metro.toast(NOTI_TEXT); };
        });
        //}}}
        //audio tag notification
        //{{{
        feature_fcts.push(function()
        //sample sounds:
        //- http://media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.mp4
        //- http://media.w3.org/2010/05/sound/sound_5.mp4
        //- http://upload.wikimedia.org/wikipedia/commons/a/a9/Tromboon-sample.ogg
        {
          var RING_REPEATS = 5;
          var ns;
          function pre() { if(!ns) ns=document.getElementById('notify_sound'); if(!ns) return true}

          ring.playFallback=function()
          //{{{
          {
            if(pre()) return true;
            try{
              function playRing()
              {
                ns['currentTime']=0;
                //loads() makes load next sound in src list
                //ns['load']();
                ns['pl'+'ay']();
              }
              playRing();
              var repeatsLeft=RING_REPEATS;
              if(!ns.endedListenerAdded)
              {
                ns.addEventListener('ended',function() {if(ctYt.repeat_ || repeatsLeft--) playRing() },false);
                ns.endedListenerAdded=true;
              }
            }
            catch(e){return true;}
          };
          //}}}

          ring.stopFallback=function()
          {
            pre();
            try{
              ns['pause']();
            }catch(e){}
          };
        });
        //}}}
        //web audio API notification
        //{{{
        //*
        feature_fcts.push(function(){
          var AudioContext = window['AudioContext'] || window['webkitAudioContext'];
          if(!AudioContext) return;
          var node,ctx,timeout;
          ring.playWebAudio=function()
          {
            DEBUG_AUDIO && console.log('DEBUG_AUDIO', 'playing web audio');
            if(!node)
            {
              function fadeOut(i,length) { return 1-i/length }
              function fadeIn (i,length) { return i/length }
              function fade   (i,length) { var limit = length/100;return i>limit?fadeOut(i-limit,length):fadeIn(i,limit)}

              ctx = new AudioContext();

              var SAMPLE_RATE = ctx['sampleRate'];
              var buf_size=1.35*512*128;
              var freq = 440;
              var PI_2 = Math.PI * 2;

              var buffer = ctx['createBuffer'](1, buf_size, SAMPLE_RATE);
                var buf = buffer['getChannelData'](0);
                for (let i = 0; i < buf_size; ++i) buf[i] = fade(i,buf_size)*Math.sin(freq * PI_2 * i / SAMPLE_RATE);
              node = ctx['createBufferSource'](0);
                node['buffer']  = buffer;
                node['loop']    = true;
                node['looping'] = true;
              node['noteOn'](ctx['currentTime']);
            }
            node['con'+'nect'](ctx['destination']);
            if(timeout) clearTimeout(timeout);
            if(!ctYt.repeat_) timeout=setTimeout(function(){node['disconnect']()},120*1000);
          };
          ring.stopWebAudio=function()
          {
            if(node) node['disconnect']();
          };
        });
        //*/
        //}}}
        //youtube/iframe notification
        feature_fcts.push(function(){ 
          if(IS_METRO_APP) return;
        
          //init ctYt (common code to iframe+yt notification)
          var frame={};
          (function(){ 
            ctYt.style.position='relative';
            var isHidden_;
            ctYt.hide=function(){ 
              isHidden_ = true;
              ctYt.style.height   = '1px';
            //ctYt.style.height   = '0px';
              ctYt.style.width    = '1px';//1px width required for vertical mobile layout
              ctYt.style.top      = '-10000px';
            }; 
            ctYt.hide();
            ctYt.show=function(){ 
              isHidden_ = false;
              ctYt.style.height   = '';
              ctYt.style.width    = '';
              ctYt.style.top      = '';
            }; 
            ctYt.isHidden=function(){
              return isHidden_;
            };
            ctYt.parseUrl=function(url){ 
              ml.assert(url.constructor===String);
              function urlToId(url){
                //ID chars: /[a-zA-Z0-9-_]+/ --http://stackoverflow.com/questions/830596/what-type-of-id-does-youtube-use-for-their-videos
                //var matches=/youtube\.com.*(?:\?|&)v=([^&#]+)/.exec(url);
                var matches=/youtube\.com.*(?:\?|&)v=([a-zA-Z0-9\-_]+)/.exec(url) || /youtu.be\/([a-zA-Z0-9\-_]+)/.exec(url);
                return matches?matches[1]:null;
              }

              //sanetize URL
              url=url.replace(' ','');

              //retrieve ID
              ctYt.inputUrl=url;
              ctYt.yt_vid_id=urlToId(url);

              //retrieve start & repeat
              const matches=/(?:\?|&)(?:start|t)=([^&#]*)/.exec(url);
              ctYt.vid_start=matches?matches[1]:null;
            //ctYt.repeat_=/(?:\?|&)(repeat|loop)/.test(url);
              ctYt.repeat_=/repeat|replay|loop/.test(url);

              //set final url
              //options: https://developers.google.com/youtube/player_parameters
            //var options="&rel=0&theme=dark&modestbranding=0&controls=0&showinfo=0&showsearch=0&hd=0&iv_load_policy=0&disablekb=0&autohide=1&html5=1";
              var options="&rel=0&controls=0&hd=0&showinfo=0&html5=1";
              ctYt.yt_vid_url=!ctYt.yt_vid_id?null:"https://www.youtube.com/embed/"+ctYt.yt_vid_id+"?enablejsapi=1"+(ctYt.vid_start?'&start='+ctYt.vid_start:'')+"&origin=https://"+location.host+options;
            }; 
            ctYt.prefetch=function(){
              if(ctYt.onPrefetch) ctYt.onPrefetch();
            };
            (function(){
              var ytframe;
              function generateDom(){ 
                ytframe = document.createElement(ml.isPackagedApp()?'webview':'iframe')
                  ytframe.style.border='0';
                  ytframe.style.position='absolute';
                  ytframe.style.left='0';
                  ytframe.style.top='0';
                  ytframe.style.width ='100%';
                  ytframe.style.height='100%';

                var cover =document.createElement('div');
                  cover.style.position='absolute';
                  cover.style.left='0';
                  cover.style.top='0';
                  cover.style.width ='100%';
                  cover.style.height='100%';
                  cover.style.cursor='pointer';
              //cover.onclick=function(){if(ctYt.onclick) ctYt.onclick()};
                ctYt.appendChild(ytframe);
                ctYt.appendChild(cover);
              } 
              var lastSrc;
              frame.setSrc=function(newSrc){
                if(!ytframe) generateDom();
                if(newSrc!=ytframe.src) ytframe.src=newSrc;
                if(ytframe.nodeName==="WEBVIEW"){
                  //somehow src gets discarded
                  lastSrc=newSrc;
                  setTimeout(function(){
                    if(ytframe.src!=lastSrc) ytframe.src=lastSrc;
                  },0);
                }
                return;
              };
              var ctrl;
              frame.addCtrl=function(){
                if(!ctrl) ctrl=add_yt_ctrl(ytframe);
                return ctrl;
              }
            })();
          })(); 
          //youtube notification
          (function(){ 
            ctYt.onPrefetch=function(){};
            var ytNotWorking;
            var shouldBePlaying;
            ring.playYT=function(){ 
              if(ytNotWorking) return true;
              if(!ctYt.yt_vid_url) return true;
              frame.setSrc('about:blank');
              ctYt.show();
              frame.setSrc(ctYt.yt_vid_url+"&autoplay=1");
              try{frame.addCtrl()}catch(e){ml.assert(false)};
              try{
                var ctrl = frame.addCtrl();
                ctrl.onstatechange_=function(newState){
                  if(newState===0 && ctYt.repeat_) setTimeout(ctrl.play,100);
                };
              }catch(e){ml.assert(false)}
              shouldBePlaying=setTimeout(function(){
                if(!shouldBePlaying) return;
                var isPlaying;
                try{
                  //postMessage doesn't seem to work on webview
                  //-altough: https://groups.google.com/a/chromium.org/forum/?fromgroups=#!searchin/chromium-apps/webview$20postmessage
                  if(ml.isPackagedApp()) isPlaying = frame.addCtrl().state===-2;
                  else isPlaying = frame.addCtrl().state===1;
                }catch(e){}
                if(!isPlaying){
                  ytNotWorking=true;
                  setTimeout(function(){ytNotWorking=false},15000);
                  notis.ring.stop();
                  notis.ring.play_();
                }
              },15000);
              function forcePlay(){
                if(!shouldBePlaying) return;
                try{
                  var ctrl = frame.addCtrl();
                  ctrl.play();
                  ctrl.unMute();
                  ctrl.setVolume(100);
                }catch(e){ml.assert(false)}
              }
              setTimeout(forcePlay,0);
              setTimeout(forcePlay,1000);
              setTimeout(forcePlay,2000);
            }; 
            ring.stopYT=function(){
              ctYt.hide();
              frame.setSrc('about:blank');
              if(shouldBePlaying) window.clearTimeout(shouldBePlaying);
              shouldBePlaying=false;
            };
          })(); 
          //iframe notification
          (function(){ 
            var iframe;
            var playing;
            ring.playIframe=function()
            {
              if(!iframe) {
                iframe=document.createElement('iframe');
                iframe.style.display='none';
                iframe.style.position='absolute';
                iframe.style.border='0';
                iframe.style.width ='100%';
                iframe.style.height='100%';
                iframe.style.left  ='0';
                ctYt.appendChild(iframe);
              }
              var ring_url;
              if(ctYt.yt_vid_id)
                ring_url = 'https://www.youtube.com/embed/'+ctYt.yt_vid_id+'?autoplay=1&autohide=1'+(ctYt.vid_start?'&start='+ctYt.vid_start:'');
              else
              {
                ring_url = ctYt.inputUrl;
                if(!/^(http|ftp)s?:\/\//.test(ring_url)) ring_url = 'https://'+ring_url;
              }
              //won't work if following has been called before
              //YTplayer['mute']();
              //YTplayer['playVideo']();
              //YTplayer['pauseVideo']();
              iframe.src = 'about:blank';//just to make sure that if same url it will reload -- don't know if this is required
              iframe.src = ring_url;
              iframe.style.display='';
              playing=true;
              ctYt.show();
            };
            ring.stopIframe=function()
            {
              if(playing){
                iframe.style.display='none';
                iframe.src='about:blank';
                ctYt.hide();
                playing=false;
              }
            };
          })(); 
        }); 
        //orchestrate notifications
        //{{{
        feature_fcts.push(function()
        {
          var players=[
                       [ring.playYT      ,ring.stopYT],
                       [ring.playWebAudio,ring.stopWebAudio],
                       [ring.playFallback,ring.stopFallback],
                       [ring.playIframe  ,ring.stopIframe]
                      ].filter(function(p){return !!(p[0]&&p[1])});
          var ringing_;
          notis.ring.play_=function()
          {
            if(ring.metroToast && !ring.metroToast()) return;
            players.forEach(function(p){if(!ringing_ && p&&p[0] && !p[0]()) ringing_=true; else p[1]()});
          };
          notis.ring.stop=function()
          {
            if(!ringing_) return;
            players.forEach(function(p){p&&p[1]&&p[1]()});
            ringing_=false;
          };
        });
        //}}}

        ml.safe_call(feature_fcts);
      })(); 
      var onTimesUp=[];
      onTimesUp.push(notis.ring.play_);
      onTimesUp.push(notis.IE9Noti);
      onTimesUp.push(notis.popupNotification);
      onTimesUp.push(notis.unityNoti);

      var lastState;
      return function(state_,STATE_CODES,timerName)
      {
        //state_ === STOPED || PAUSED || PLAYING || RINGING
        ml.i18n.get(function(lang){
          NOTI_TEXT    = (timerName||'timer')+' '+(lang==='de'&&'abgelaufen'||lang==='fr'&&'terminé'||'finished');
          NOTI_TEXT_2  = lang==='de'&&'hier klicken, um das Klingeln zu stoppen'||lang==='fr'&&'cliquez ici pour arrêter la sonnerie'||'click here to st'+'op the alarm bell'
        });
        if(lastState!==state_)
        {
          if(lastState===STATE_CODES.RINGING) {
            ml.safe_call(notis.ring.stop);
            ml.safe_call(notis.popupNotificationCancel);
          }
          if(   state_===STATE_CODES.RINGING) ml.safe_call(onTimesUp,timerName);
          ml.safe_call(notis.metro.badge,state_,STATE_CODES);
        }
        lastState=state_;
      }
    }; 
    notify.tab=(function(){ 
      var _onCountdown=[];

      _onCountdown.push(function(diff,percent){
        unity.setProgressBar(percent,diff<0?0:diff,percent&&diff<=0);
      });

      if(!NO_DYNAMIC_FAVICONS){
        var lastIconURL;
        _onCountdown.push(function(diff,percent){
            var iconURL = ml.timerIcon(diff,percent);
            if(lastIconURL===undefined||lastIconURL!==iconURL){lastIconURL=iconURL;ml.changeIcon(iconURL)}
        });
      }

      _onCountdown.push(function(diff,undefined,postText){
        var newTitle = (diff%2===-1)?'\u266a':ml.date.readable.getCounter(diff<0?0:diff*1000,'text');
        var SEPERATOR = '\u00a0|\u00a0';
        if(postText)           newTitle=newTitle+SEPERATOR+postText;
        if(ml.isPackagedApp()) newTitle=newTitle+'\u00a0'+SEPERATOR+'Timer Tab';
        document.title=newTitle;
      });

      _onCountdown.push(notis.metro.tile);

      _onCountdown.push(notis.chromeExtensionBadge);

      //return function(diff,percent,postText){ml.safe_call(_onCountdown,diff,percent,postText)};
      return function(){ml.safe_call.apply(null,[_onCountdown].concat([].slice.call(arguments)))};

    })(); 
    notify.alarm={};
    notify.alarm.add=function(d){ 
    //no more waking up of timer packaged app
    ////http://developer.chrome.com/apps/alarms.html#type-AlarmCreateInfo
    //notify.alarm.remove(d);
    //d-=3*1000;
    //if(window['chrome'] && window['chrome']['alarms']) window['chrome']['alarms']['create']((+d)+"",{'when':+d});
    }; 
    notify.alarm.remove=function(d){ 
    //no more waking up of timer packaged app
    //d-=3*1000;
    ////clearing a non existent alarm throws execption
    //if(window['chrome'] && window['chrome']['alarms']) try{window['chrome']['alarms']['clear' ]((+d)+"");}catch(e){}
    }; 
  })(); 

  return function(initialState,initialType){ 
    var thisTimer=this;
    thisTimer.dom = {};

    var interface_={};
    (function(){ 
      var setText;
      (function(){ 
        var lastText;
        var IS_METRO_UI = window['WinJS'] && window['WinJS']['UI'];
        function sizeIt(){
          if(!thisTimer.dom.counter) return;
          ml.adjustFontSize(thisTimer.dom.counter,IS_METRO_UI&&['0','1','2','3','4','5','6','7','8','9','-'],true,'00:00',true);
          //avoid infinite resize events loop as extension -- because window's size get's resized as content size's changes
          if(!ml.isExtension()) ml.addResizeTimeoutEvent(sizeIt,100,function(){thisTimer.dom.counter.style.fontSize='0px'});
        }
        function doIt(diff){
          var newText = ml.date.readable.getCounter(diff<0?0:diff*1000,'countdown');
          if(lastText===newText) return;
        //thisTimer.dom.counter.setAttribute('data-text',newText);
        //#counter:before{ content: attr(data-text); }
        //-I don't remember why I used attribute instead of innerHTML
        //-setting counter through attribute is buggy when hovering mouse on plusone button

          thisTimer.dom.counter.innerHTML=newText;
          //__promo images:
          //thisTimer.dom.counter.innerHTML='13:37';
          if(!thisTimer.dom.counter.noFontSizeAdjusting && (!lastText||lastText.length!==newText.length)) sizeIt();
          lastText=newText;
        }
        setText=function(diff){
          if(!thisTimer.dom.counter)return;
          //if(!lastText) doIt();
          //else ml.reqFrame(doIt);
          ml.reqFrame(function(){doIt(diff)});
        }
      })(); 

      var ct__ = new Timer_js(initialState);
      ct__.listen.stateChange=function(){ml.safe_call.apply(null,[interface_.stateChange].concat([].slice.call(arguments)))};
      ct__.listen.dataChange =function(){ml.safe_call.apply(null,[interface_.dataChange ].concat([].slice.call(arguments)))};
      ct__.listen.endChange  =function(){ml.safe_call.apply(null,[interface_.endChange  ].concat([].slice.call(arguments)))};
      ct__.listen.countdown_ =function(diff,percent){
        setText(diff);
        ml.safe_call(interface_.onCountdown,diff,percent);
      };

      interface_.spark       = function(){setText(0);ct__.spark()}
      interface_.start_      = ct__.trigger.start__;
      interface_.stop_       = ct__.trigger.stop__;
      interface_.togglePause = ct__.trigger.togglePause;
      interface_.toggleStop  = ct__.trigger.toggleStop;
      interface_.kill        = ct__.kill;
    })(); 

    var state_notifier;
    interface_.stateChange=function(action,__newState,STATE_CODES){ 
      ml.safe_call(state_notifier,__newState,STATE_CODES,thisTimer.getName&&ml.safe_call(thisTimer.getName,__type));
      __isRinging=__newState===STATE_CODES.RINGING;
      ml.safe_call(thisTimer.onStateChange ,action,__newState,STATE_CODES,__type);
    }; 

    interface_.dataChange =function(d){ 
      if(!thisTimer.data) return;
      if(d.operation==='start') d.type=__type;
      ml.safe_call(function(){thisTimer.data.onDataChange(d)});
    }; 

    function setAlarmTime(_end){ 
      if(__type===ctObj.TYPES.ALARM && _end && thisTimer.dom.alarmTime)
        ml.i18n.isAMPMTime(function(isAMPM){
          thisTimer.dom.alarmTime.innerHTML=ml.date.readable.getTime(_end,isAMPM);
        });
    } 

    interface_.endChange = function(newEnd,oldEnd){ 
      if(newEnd) notify.alarm.add(newEnd);
      if(oldEnd) notify.alarm.remove(oldEnd);
      setAlarmTime(newEnd);
    }; 

    thisTimer.makeTabTimer=function(disconnect){ 
      interface_.onCountdown = disconnect?undefined:function(diff,perc){notify.tab(diff,perc,thisTimer.data&&thisTimer.data.getName())};
      ml.safe_call(function(){ unity.setActions(thisTimer.dom.inputs,thisTimer.dom.pauseBtn) });
    }; 

    var __isRinging;
    var __type=initialType;
    thisTimer.spark       = function(noNotification){ 
      if(thisTimer.dom.youtubeDiv){ 
        thisTimer.dom.youtubeDiv.onclick=interface_.stop_;
        if(!noNotification) state_notifier = notify.state(thisTimer.dom.youtubeDiv,interface_.stop_);
      } 
      if(thisTimer.dom.inputs){ 
        if(thisTimer.dom.inputs.length===1) __type=thisTimer.dom.inputs[0].type;
        thisTimer.dom.inputs.forEach(function(ctInput){ctInput.onStart=function(timerEnd){__type=ctInput.type;interface_.start_(timerEnd);}});
      } 
      if(thisTimer.dom.pauseBtn){
        thisTimer.dom.pauseBtn.onclick=function(){if(__type!==ctObj.TYPES.ALARM||__isRinging) interface_.togglePause()};
      }
      /*
      if(thisTimer.dom.name_input && thisTimer.dom.name_el) { 
        var nameInput = thisTimer.dom.name_input;
        function setNameAttr(){
          thisTimer.dom.name_el.setAttribute('data-name',nameInput.value);
        }
        if(thisTimer.data){
          nameInput.value=thisTimer.data.getName()||'';
          setNameAttr();
        }
        nameInput.onkeyup=function(ev){
          if(ml.getChar(ev)==='enter')
            nameInput.blur();
          else{
            if(thisTimer.data) thisTimer.data.setName(nameInput.value);
            setNameAttr();
          }
        };
      } 
      */
      setAlarmTime(initialState.end);
      interface_.spark();
    }; 

    thisTimer.start       = interface_.start_;
    thisTimer.toggleStop  = interface_.toggleStop;
    thisTimer.kill        = interface_.kill;
  //thisTimer.togglePause = interface_.togglePause;

    return thisTimer;
  }; 
})(); 

(function(){
  ml.load=(function(){ 
    var modules={};
    return function(moduleName,dependancies,module)
    {
      if(moduleName.constructor===Array)
      {
        module=dependancies;
        dependancies=moduleName;
        moduleName=undefined;
      }
      if(!((moduleName&&moduleName.constructor===String||moduleName===undefined) && dependancies&&dependancies.constructor===Array && module&&module.constructor===Function)) throw "wrong usage";
      var ret = module.apply(null,dependancies.map(function(d){return modules[d]||(function(){throw "no module "+d})()}));
      if(moduleName)
      {
        if(!ret||(ret.constructor!==Object&&ret.constructor!==Function)) throw "module should be an object or a function";
        modules[moduleName]=ret;
      }
    }
  })(); 

  ml.load('data',[],function(){ 
//data.init
//data.Countdown
//data.onChange
//data.onExtChange
    var TYPES=ctObj.TYPES;
    function isTime(t) { return t && (t.constructor===Number||t.constructor===String) && t.toString().length===13 && !/[^\d]/.test(t) && (t.constructor===Number || parseInt(t,10).toString()===t)}
    var _ret   = {};
    var __data;
    var __onDataChange;
    _ret.init=function(onRetrieved){ 
      function do_(){
        ml.getPersistedObject('countdowns',function(retrieved){
          __data=retrieved;
          retrieved.addChangeListener(function(){
            __onDataChange();
            ml.safe_call(_ret.onExtChange)
          });
          __onDataChange();
          onRetrieved();
        });
      }
      ml.asyncStore.get('data_version',function(used_version){
        var CURRENT_DATA_VERSION = '5';
        if(used_version!==CURRENT_DATA_VERSION) ml.asyncStore.set('data_version',CURRENT_DATA_VERSION);
        if(used_version && used_version!==CURRENT_DATA_VERSION) ml.asyncStore.clear(do_);
        else do_();
      });
    }; 
    _ret.Countdown=function(__id){ 
      //KEYS
      //{{{
      //required because of google closure compiler
      var __KEY_NAME              = '0';
      var __KEY_TYPE              = '1';
      var __KEY_STATE             = '2';
      var __KEY_STATE_START       = '3';
      var __KEY_STATE_END         = '4';
      var __KEY_STATE_PAUSED      = '5';
      var __KEY_PRESET            = '6';
      var __KEY_PRESET_HOURS      = '7';
      var __KEY_PRESET_MINUTES    = '8';
      var __KEY_PRESET_SECONDS    = '9';
      var __KEY_HISTORY           = 'a';
      var __KEY_HISTORY_OPERATION = 'b';
      var __KEY_HISTORY_TYPE      = 'm';
      var __KEY_HISTORY_TIME      = 'c';
      var __KEY_CREATION_TIME     = 'd';
      var __KEY_MOD               = 'g';
      var __KEY_MOD_REMOVED       = 'i';
      var __KEY_MOD_TS            = 'j';
      var __KEY_MOD_FAKE          = 'k';
      var __KEY_MOD_OPERATION     = 'l';
      var __KEY_OPT               = 'e';
      var __KEY_OPT_RING_YT       = 'f';
      var __KEY_OPT_RING_REPEAT   = 'h';
      var __KEY_TOUCH             = 'n';
      var __KEY_TAGS              = 'o';
      //next available char: 'p'
      var OPERATIONS = ['lap','start','stop','resume','pause'];
      //}}}
      ml.assert(__id===undefined||__id.constructor===Number&&isTime(__id));
      function checkRef(){corEx(__data);
      corEx(__id);
      corEx(__data[__id]);
      corEx(__data[__id][__KEY_CREATION_TIME]===__id) }
      //corEx((getCreationTime()===undefined || ct===__data[getCreationTime()])) 
      function getCt(){checkRef();return __data[__id];}
      function getCreationTime(){var ct=getCt();return ct[__KEY_CREATION_TIME]}
      function _save(newOrRemove)
      {
      //if(!__data[getCreationTime()] && !newOrRemove) return;
        __onDataChange();
        __data.put();
      }
      var creationTime = +new Date();
      function corEx(bool) { if(bool) return;ml.assert(bool,undefined,0); throw 'about to corrupt data'}
      if(!__id) {//create new ct
      //if(__data[getCreationTime()]) throw 'countdown already added';
      //if(!this.getType()) throw 'Add type before adding new countdown';
        __id = (function(){
          var ret = +new Date;
        //var ids = Object.keys(_ret.getAll()).map(function(id){return parseInt(id,10)});
        //var ids = _ret.getAll().map(function(ctI){return ctI.getCreationTime()});
          var ids = Object.keys(__data).map(function(id){return parseInt(id,10)});
          if(ids.constructor !== Array || !ids.indexOf) throw 'avoing infinite loop';
          ml.assert(ret.constructor===Number && (!ids[0] || ids[0].constructor===Number));
          while(ids.indexOf(ret)>=0) ret++;
          corEx(ret.constructor===Number&&isTime(ret));
          corEx(__data[ret]===undefined);
          return ret;
        })();
        __data[__id] = (function(){
          var ret = {};
          ret[__KEY_CREATION_TIME]=__id;
          return ret;
        })();
        _save(true);
      }
      return {
        getName: function() { return undefined;/*var ct=getCt();return ct[__KEY_NAME]*/ },
        getTags: function() { var ct=getCt();return ct[__KEY_TAGS] },
        getType: function() { var ct=getCt();return ct[__KEY_TYPE] },
        setType: function(newVal){var ct=getCt();corEx(newVal&&(newVal===TYPES.STOPW||newVal===TYPES.ALARM||newVal===TYPES.TIMER));ct[__KEY_TYPE]=newVal;_save()},
        setName: function(newVal){var ct=getCt();corEx(newVal===undefined||newVal.constructor===String);ct[__KEY_NAME] =newVal;_save() },
        setTags: function(newVal){var ct=getCt();corEx(newVal===undefined||newVal.constructor===String);ct[__KEY_TAGS] =newVal;_save() },
        getState:function() { var ct=getCt();
                              return {start :ct[__KEY_STATE]&&ct[__KEY_STATE][__KEY_STATE_START],
                                      end   :ct[__KEY_STATE]&&ct[__KEY_STATE][__KEY_STATE_END],
                                      paused:ct[__KEY_STATE]&&ct[__KEY_STATE][__KEY_STATE_PAUSED]}},
        setState:function(newVal) {var ct=getCt();
                             corEx(newVal&&(newVal.start===undefined||newVal.start.constructor===Number&&isTime(newVal.start))
                               //sometimes newVal.start>newVal.end when countdown set to 0
                               && (newVal.   end===undefined||newVal.   end.constructor===Number&&isTime(newVal.   end)/*&&newVal.   end>newVal.start*/)
                               && (newVal.paused===undefined||newVal.paused.constructor===Number&&isTime(newVal.paused)&&newVal.paused>newVal.start)
                               && (!newVal.paused || !newVal.end || newVal.paused<newVal.end));
                                    ml.assert(ct[__KEY_HISTORY]);//first actualize history
                                    if(ct[__KEY_HISTORY]){
                                      var lastHis = ct[__KEY_HISTORY][ct[__KEY_HISTORY].length-1];
                                      //assertions based on assumption that history actualized before state
                                      //-history actualized before state -> avoiding corrupted state
                                      var oldStart = ct[__KEY_STATE]&&ct[__KEY_STATE][__KEY_STATE_START];
                                      var oldPause = ct[__KEY_STATE]&&ct[__KEY_STATE][__KEY_STATE_PAUSED];
                                      ml.assert((lastHis[__KEY_HISTORY_OPERATION]==='stop' ) ===
                                                (newVal.start===undefined&&newVal.paused===undefined&&newVal.end===undefined&&oldStart!==undefined));
                                      ml.assert((lastHis[__KEY_HISTORY_OPERATION]==='pause') ===
                                                (newVal.start!==undefined&&newVal.paused!==undefined&&oldPause===undefined&&oldStart!==undefined));
                                      //too strict for timertab
                                    //ml.assert((lastHis[__KEY_HISTORY_OPERATION]==='start') ===
                                    //          (newVal.start!==undefined&&newVal.paused===undefined&&oldStart===undefined&&oldPause===undefined));
                                      ml.assert(!(lastHis[__KEY_HISTORY_OPERATION]==='start') ||
                                                (newVal.start!==undefined&&newVal.paused===undefined/*&&oldStart===undefined&&oldPause===undefined*/));
                                      //too strict for timertab
                                    //ml.assert((lastHis[__KEY_HISTORY_OPERATION]==='resume') ===
                                    //          (newVal.start!==undefined&&newVal.paused===undefined&&oldStart!==undefined&&oldPause!==undefined));
                                      ml.assert(!(lastHis[__KEY_HISTORY_OPERATION]==='resume') ||
                                                (newVal.start!==undefined&&newVal.paused===undefined&&oldStart!==undefined&&oldPause!==undefined));
                                    }
                                    ct[__KEY_STATE]={};
                                    ct[__KEY_STATE][__KEY_STATE_START ]=newVal.start;
                                    ct[__KEY_STATE][__KEY_STATE_END   ]=newVal.end;
                                    ct[__KEY_STATE][__KEY_STATE_PAUSED]=newVal.paused; _save() },
        getPreset:function(type) { var ct=getCt();
                              if(!type) type=this.getType();
                              ml.assert(type===TYPES.ALARM||type===TYPES.TIMER);
                              if(!ct[__KEY_PRESET] || !ct[__KEY_PRESET][type]) return {};
                              return {hours:  ct[__KEY_PRESET][type][__KEY_PRESET_HOURS],
                                      minutes:ct[__KEY_PRESET][type][__KEY_PRESET_MINUTES],
                                      seconds:ct[__KEY_PRESET][type][__KEY_PRESET_SECONDS]};
                              },
        setPreset:function(newVal,type) { var ct=getCt();
                                    if(!type) type=this.getType();
                                    corEx(type===TYPES.ALARM||type===TYPES.TIMER);
                                    corEx(newVal);
                                  //for(var i in newVal){corEx(newVal[i]===undefined || newVal[i].constructor===Number&&!isNaN(newVal[i])&&newVal[i]>=0 || newVal[i].constructor===String&&newVal[i][0]&&newVal[i][0]==='+');}
                                    for(var i in newVal){corEx(newVal[i]===undefined||newVal[i].constructor===Number&&!isNaN(newVal[i])&&newVal[i]>=0);}
                                    if(!ct[__KEY_PRESET]) ct[__KEY_PRESET]={};
                                    if(!ct[__KEY_PRESET][type]) ct[__KEY_PRESET][type]={};
                                    ct[__KEY_PRESET][type][__KEY_PRESET_HOURS  ]=newVal.hours;
                                    ct[__KEY_PRESET][type][__KEY_PRESET_MINUTES]=newVal.minutes;
                                    ct[__KEY_PRESET][type][__KEY_PRESET_SECONDS]=newVal.seconds;
                                    _save()},
        addHistory:function(d) { var ct=getCt();
                                   if(!ct[__KEY_HISTORY]) ct[__KEY_HISTORY]=[];
                                   var lastHis = ct[__KEY_HISTORY][ct[__KEY_HISTORY].length-1];
                                   corEx(d.time && d.time.constructor===Number && isTime(d.time) && d.time>creationTime
                                         && (!lastHis||d.time>lastHis[__KEY_HISTORY_TIME]));
                                   corEx(OPERATIONS.indexOf(d.operation)!==-1);
                                   /*
                                   if(d.operation==='stop'){
                                     var state = this.getState();
                                     corEx(state.start===undefined&&state.end===undefined&&state.paused===undefined);
                                   }
                                   */
                                 //onsole.print(!lastHis);
                                 //onsole.print(lastHis);
                                 //too strict for timertab
                                 //if(d.operation==='start') ml.assert(!lastHis || lastHis[__KEY_HISTORY_OPERATION]==='stop');
                                   if(d.operation!=='start') for(var i=ct[__KEY_HISTORY].length-1;i>=0;i--)
                                   {
                                     var op = ct[__KEY_HISTORY][i][__KEY_HISTORY_OPERATION];
                                     if(d.operation==='resume')
                                     {
                                       if(op==='pause') break;
                                       ml.assert(op==='lap');
                                     }
                                     ml.assert(op!=='stop');
                                     if(op==='start') break;
                                   }
                                   var o={};
                                   o[__KEY_HISTORY_OPERATION]=d.operation;
                                   if(d.type) o[__KEY_HISTORY_TYPE     ]=d.type;
                                   o[__KEY_HISTORY_TIME]=d.time;
                                   ct[__KEY_HISTORY].push(o);_save()},
        getHistory:function() { var ct=getCt();var ret=[];
                                for(var i in ct[__KEY_HISTORY])
                                {
                                  var r={};
                                  r.operation=ct[__KEY_HISTORY][i][__KEY_HISTORY_OPERATION];
                                  r.time     =ct[__KEY_HISTORY][i][__KEY_HISTORY_TIME];
                                  ret.push(r);
                                }
                                return ret},
        setMods:function(mods) { var ct=getCt();ct[__KEY_MOD]={};
                                   var hisTs = ct[__KEY_HISTORY].map(function(h){return parseInt(h[__KEY_HISTORY_TIME],10)});
                                   corEx(mods);
                                   for(var id in mods)
                                   {
                                     corEx(isTime(id));
                                     corEx(mods[id].mod_ts   ===undefined || mods[id].mod_ts .constructor===Number && isTime(mods[id].mod_ts));
                                     corEx(mods[id].removed  ===undefined || mods[id].removed.constructor===Boolean);
                                     corEx(mods[id].fake     ===undefined || mods[id].fake   .constructor===Boolean);
                                     corEx(mods[id].operation===undefined || OPERATIONS.indexOf(mods[id].operation)!==-1);
                                     corEx(mods[id].fake || hisTs.indexOf(parseInt(id,10))!==-1);
                                     corEx(mods[id].fake===undefined || mods[id].operation);
                                     ct[__KEY_MOD][id] = {};
                                     ct[__KEY_MOD][id][__KEY_MOD_TS       ]=mods[id].mod_ts;
                                     ct[__KEY_MOD][id][__KEY_MOD_REMOVED  ]=mods[id].removed;
                                     ct[__KEY_MOD][id][__KEY_MOD_FAKE     ]=mods[id].fake;
                                     ct[__KEY_MOD][id][__KEY_MOD_OPERATION]=mods[id].operation;
                                   }
                                   _save();
                               },
        getMods:function() { var ct=getCt();var mod = {};
                             for(var i in ct[__KEY_MOD])
                             {
                               mod[i]={};
                               if(ct[__KEY_MOD][i][__KEY_MOD_REMOVED  ]) mod[i].removed  =ct[__KEY_MOD][i][__KEY_MOD_REMOVED  ];
                               if(ct[__KEY_MOD][i][__KEY_MOD_TS       ]) mod[i].mod_ts   =ct[__KEY_MOD][i][__KEY_MOD_TS       ];
                               if(ct[__KEY_MOD][i][__KEY_MOD_FAKE     ]) mod[i].fake     =ct[__KEY_MOD][i][__KEY_MOD_FAKE     ];
                               if(ct[__KEY_MOD][i][__KEY_MOD_OPERATION]) mod[i].operation=ct[__KEY_MOD][i][__KEY_MOD_OPERATION];
                             }
                             return mod;
                           },
        /*
        setOptions:function(opts) { var ct=getCt();ct[__KEY_OPT][__KEY_OPT_RING_YT]     = opts.ring_yt;
                                   corEx(TO-DO)
                                   ct[__KEY_OPT][__KEY_OPT_RING_REPEAT] = opts.ring_repeat;
                                   _save()},
        getOptions:function() { var ct=getCt();return {ring_yt     : ct[__KEY_OPT]&&ct[__KEY_OPT][__KEY_OPT_RING_YT],
                                        ring_repeat : ct[__KEY_OPT]&&ct[__KEY_OPT][__KEY_OPT_RING_REPEAT]}},
        */
        getCreationTime:function() { var ct=getCt();return getCreationTime(); },
        remove:function()
        {
          if(!__data[getCreationTime()]) throw 'Trying to remove a countdown that is not in data';
          delete __data[getCreationTime()];
          _save(true);
        }
      };
    }; 

    (function(){
      //make use of cache because eventually app may use old interface anyways
      var ctInterfaces_cache = {};
      var ctInterfaces       = {};
      var ctInterfacesArr    = [];
      function parseData(){ 
        for(var i in ctInterfaces) delete ctInterfaces[i];
        for(var i in __data)
        {
          ml.assert(i.length===13);
          ml.assert(isTime(i));
          if(!ctInterfaces_cache[i]) ctInterfaces_cache[i]=new _ret.Countdown(parseInt(i,10));
          ml.assert(i===ctInterfaces_cache[i].getCreationTime().toString());
          ctInterfaces[i]=ctInterfaces_cache[i];
        }

        ctInterfacesArr.splice(0);
        var ids_sorted = Object.keys(ctInterfaces).sort();
        for(var i in ids_sorted) ctInterfacesArr.push(ctInterfaces[ids_sorted[i]]);
      }; 
      __onDataChange=function(){
        parseData();
        ml.safe_call(_ret.onChange,ctInterfacesArr)
      };
    })();

    return _ret;
  }); 

  (function(){
    function data2timerObj(timerData){ 
      var initState = timerData.getState();
      var timerDom  = new ctObj.Timer_dom(initState,timerData.getType()); 
      timerDom.data = {};
      (function(){
        var cumulatedData={};
        timerDom.data.onDataChange=function(newData){ 
          if(newData.operation){
            newData.history={};
            newData.history.operation=newData.operation;
            newData.history.time=+new Date;
            if(newData.operation==='start'){
              ml.assert(newData.type)
              newData.history.type=newData.type;
            }
            newData.save=true;
            delete newData.operation;
          }
          for(var i in newData) cumulatedData[i]=newData[i];
          if(newData.save)
          {
            var doRefresh;
            if(cumulatedData.remove){timerData.remove();doRefresh=true}
            else
            {
              if(cumulatedData.history !== undefined){timerData.addHistory(cumulatedData.history);if(cumulatedData.history.operation==='lap') doRefresh=true}
            //if(cumulatedData.name    !== undefined){timerData.setName(cumulatedData.name);  doRefresh=true}
              if(cumulatedData.type    !== undefined){timerData.setType(cumulatedData.type);  doRefresh=true}
              if(cumulatedData.state   !== undefined){timerData.setState(cumulatedData.state);doRefresh=true}
            //if(cumulatedData.input   !== undefined){timerData.setPreset(cumulatedData.input);doRefresh=true}
              if(cumulatedData.mods    !== undefined){timerData.setMods(cumulatedData.mods)  ;doRefresh=true}
            }
            cumulatedData={};
          }
        }; 
      })();
      timerDom.data.id=timerData.getCreationTime();
      timerDom.data.expired=!initState.start || initState.end<+new Date;
      timerDom.data.removeData=function(){       timerData.remove()};
      timerDom.data.getTags   =function(){return timerData.getTags()};
      timerDom.data.setTags   =function(){       timerData.setTags  .apply(timerData,arguments)};
      timerDom.data.getName   =function(){return timerData.getName()};
      timerDom.data.setName   =function(){       timerData.setName  .apply(timerData,arguments)};
    //timerDom.data.setType   =function(){       timerData.setType  .apply(timerData,arguments)};
      timerDom.data.setPreset =function(){       timerData.setPreset.apply(timerData,arguments)};
      timerDom.data.getPreset =function(){return timerData.getPreset.apply(timerData,arguments)};

      return timerDom;
    } 
    ctObj.timers={};
    ml.load(['data'],function(data){ 
      data.onChange=function(ret){
        ctObj.timers.all=ret.map(data2timerObj);
      };
      ctObj.timers.create=function(_type,callback){
        var newTimer = new data.Countdown();
        newTimer.setType(_type);
        data2timerObj(newTimer).start();
        callback();
      };
      ctObj.timers.setChangeListener=function(listener){
        data.onExtChange = listener;
      };
      ctObj.timers.init=function(callback){data.init(callback)};
    }); 
  })();
})();
