export default add_yt_ctrl;

//*/
const DEBUG = true;
/*/
const DEBUG = false;
//*/

function add_yt_ctrl(__iframeEl){
// @author brillout.com
// -coded on behalf of http://www.timer-tab.com
// -why? Because the official YT JS API has flaws: crashes, behavior is not cross browser
// -inspired by Rob W (http://stackoverflow.com/questions/7443578/youtube-iframe-api-how-do-i-control-a-iframe-player-thats-already-in-the-html/7513356#7513356)
// -doesn't support multiple youtube iframes
// -references: http://code.google.com/apis/youtube/js_api_reference.html
// -demos:
//  -http://code.google.com/apis/ajax/playground/?exp=youtube#change_the_playing_video
//  -http://code.google.com/apis/youtube/youtube_player_demo.html
//  -http://stackoverflow.com/questions/7443578/youtube-iframe-api-how-do-i-control-a-iframe-player-thats-already-in-the-html?answertab=votes#tab-top
  if(!typeof window['postMessage']) return false;

  var _frameCtrl={};

  //given by YT: unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5)
  //given by me: onload never called + no state changes (-4), iframe onload called but not a youtube URL (-3), iframe onload called (-2)
  _frameCtrl.state=-4;

  var onNextStateChange;

  const callStack=[];

  //in
  var vidId;
  var bLoaded;
  window.addEventListener("message",function(ev){ 
    console.log('[message received]');
    //if(JSON.parse(ev['data']).event!=='infoDelivery') {
    //  //onsole.log(ev['origin']);
    //  //onsole.log(ev['data']);
    //}
    if(ev && ev['origin'] && ev['origin']==='https://www.youtube.com' && ev.source===__iframeEl.contentWindow && ev['data'])
    {
      //onsole.log(ev.source===__iframeEl || ev.currentTarget===__iframeEl || ev.currentTarget===frames[0] || ev.srcElement===__iframeEl || ev.srcElement===frames[0] || ev.target===__iframeEl || ev.target===frames[0]);//this lines prints false

      var data = JSON.parse(ev['data']);
      DEBUG && console.log('[YT][message]', data);
      if(data['event']==='onReady') {
        isReady=true;
        callCallStack();
      }
      if(data['info'])
      {
        //onstatechange_
        var newState = data['info']['playerState'];
        if(newState!==undefined && newState!==null && newState!==_frameCtrl.state)
        {
          console.log('newState', newState, data.info);
          _frameCtrl.state=newState;
          if(_frameCtrl.onstatechange_) _frameCtrl.onstatechange_(newState);
          if(onNextStateChange)
          {
            //if(newState===1)//for now onNextStateChange is set only by calling play()
            {
              onNextStateChange();
              onNextStateChange=undefined;
            }
          }
        }
        //onload
        var isNewVid;
        if(data['info']['videoData'])
        {
          var vidId_new=data['info']['videoData']['video_id'];
          if(vidId!==vidId_new)
          {
            vidId=vidId_new;
            isNewVid=true;
          }
        }
        var bLoaded_new=data['info']['videoBytesTotal'];
        if(bLoaded_new!==undefined && bLoaded_new!==bLoaded)
        {
          if(bLoaded_new<bLoaded) isNewVid=true;
          bLoaded=bLoaded_new;
        }
        if(isNewVid&&_frameCtrl.onload) _frameCtrl.onload();
      }
      //onError
      if(_frameCtrl.onerror && data['event'] && data['event']==='onError') _frameCtrl.onerror(data['error']);
    }
  },false); 

  var isReady;
  function checkIfReady(){
    if(isReady) return;
    //onsole.log(__iframeEl);
    //onsole.log(__iframeEl.contentWindow);
    if( __iframeEl.contentWindow && __iframeEl.src!=='about:blank' ){
      try{
        //sometimes returns "Uncaught Error: SyntaxError: DOM Exception 12"
        __iframeEl.contentWindow && __iframeEl.contentWindow.postMessage(
          JSON.stringify({'event':'listening','id':1}),
          __iframeEl.src
       // '*'
        );
      }catch(err){
        console.error(err);
      }
    }
    setTimeout(checkIfReady,300);
  }

  __iframeEl.onload=function(){
    _frameCtrl.state=/youtube/.test(__iframeEl.src)?-2:-3;
    isReady=false;
    if(_frameCtrl.state===-2) checkIfReady();
    if(_frameCtrl.onload) _frameCtrl.onload();
  };
  if(__iframeEl.nodeName==="WEBVIEW"){
    __iframeEl.addEventListener('loadstop',__iframeEl.onload);
    delete __iframeEl.onload;
  }
  //i don't remember what the following line was for
  //if(!__iframeEl.src) setTimeout(__iframeEl.onload,1);

  //out
  function callCallStack(){
    ml.assert(isReady);
    ml.assert(__iframeEl.src);
    ml.assert(__iframeEl.contentWindow);
    callStack.forEach(function(c){
      var func = c[0];
      var args = c[1];
      __iframeEl.contentWindow.postMessage(
        JSON.stringify({
          "event": "command",
          "func": func,
          "args": args?[args]:[],
          "id": 1
        }),
        __iframeEl.src
     // '*'
      );
    });
    callStack.length = 0;
  }
  function callPlayer(func, args) { callStack.push([func,args]);if(isReady) callCallStack(); }
  _frameCtrl.mute      =function( ){callPlayer('mute')};
  _frameCtrl.unMute    =function( ){callPlayer('unMute')};
  _frameCtrl.pause     =function( ){callPlayer('pauseVideo')};
//_frameCtrl.play      =function(callback){callPlayer('playVideo');onNextStateChange=callback};//callback only called if state is actually changed
  _frameCtrl.play      =function( ){callPlayer('playVideo')};//callback only called if state is actually changed
  _frameCtrl.seekTo    =function(t){callPlayer('seekTo',[t])};
  _frameCtrl.setQuality=function(t){callPlayer('setPlaybackQuality',t)};
  _frameCtrl.setVolume =function(t){callPlayer('setVolume',t)};

  return _frameCtrl;
}



/*
//youtube notification -- with prefetch
(function(){ 
  var ytCtrl;
  (function(){ 
    //special YT videos
    //-http://www.youtube.com/watch?v=HuHoCa8PAbg -- unavailable in ur country
    //-http://www.youtube.com/watch?v=HGIMpmOTAVo&feature=feedwll&list=WL -- buggy: YT vid plays but playerstate ===2
    //-http://www.youtube.com/watch?v=QDAT5ppaBDQ&feature=player_embedded -- forbidden embeded
    //-http://youtu.be/89mSVGbAGOE

    //by any problems check if following is working http://stackoverflow.com/questions/7443578/youtube-iframe-api-how-do-i-control-a-iframe-player-thats-already-in-the-html
    function add_yt_ctrl(__iframeEl){ 
    // @author brillout.com
    // -coded on behalf of http://www.timer-tab.com
    // -why? Because the official YT JS API has flaws: crashes, behavior is not cross browser
    // -inspired by Rob W (http://stackoverflow.com/questions/7443578/youtube-iframe-api-how-do-i-control-a-iframe-player-thats-already-in-the-html/7513356#7513356)
    // -doesn't support multiple youtube iframes
    // -references: http://code.google.com/apis/youtube/js_api_reference.html
    // -demos:
    //  -http://code.google.com/apis/ajax/playground/?exp=youtube#change_the_playing_video
    //  -http://code.google.com/apis/youtube/youtube_player_demo.html
    //  -http://stackoverflow.com/questions/7443578/youtube-iframe-api-how-do-i-control-a-iframe-player-thats-already-in-the-html?answertab=votes#tab-top
      if(!typeof window['postMessage']) return false;

        var _frameCtrl={};

        //given by YT: unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5)
        //given by me: onload never called + no state changes (-4), iframe onload called but not a youtube URL (-3), iframe onload called (-2)
        _frameCtrl.state=-4;

        var onNextStateChange;

        //in
        var vidId;
        var bLoaded;
        window.addEventListener("message",function(ev){
          //{{{
          //if(JSON.parse(ev['data']).event!=='infoDelivery') {
          //  //onsole.log(ev['origin']);
          //  //onsole.log(ev['data']);
          //}
          if(ev && ev['origin'] && ev['origin']==='http://www.youtube.com' && ev.source===__iframeEl.contentWindow && ev['data'])
          {
            //onsole.log(ev.source===__iframeEl || ev.currentTarget===__iframeEl || ev.currentTarget===frames[0] || ev.srcElement===__iframeEl || ev.srcElement===frames[0] || ev.target===__iframeEl || ev.target===frames[0]);//this lines prints false

            var data = JSON.parse(ev['data']);
            if(data['event']==='onReady') {
              isReady=true;
              callCallStack();
            }
            if(data['info'])
            {
              //onstatechange_
              var newState = data['info']['playerState'];
              if(newState!==undefined && newState!==null && newState!==_frameCtrl.state)
              {
                _frameCtrl.state=newState;
                if(_frameCtrl.onstatechange_) _frameCtrl.onstatechange_(newState);
                if(onNextStateChange)
                {
                  //if(newState===1)//for now onNextStateChange is set only by calling play()
                  {
                    onNextStateChange();
                    onNextStateChange=undefined;
                  }
                }
              }
              //onload
              var isNewVid;
              if(data['info']['videoData'])
              {
                var vidId_new=data['info']['videoData']['video_id'];
                if(vidId!==vidId_new)
                {
                  vidId=vidId_new;
                  isNewVid=true;
                }
              }
              var bLoaded_new=data['info']['videoBytesTotal'];
              if(bLoaded_new!==undefined && bLoaded_new!==bLoaded)
              {
                if(bLoaded_new<bLoaded) isNewVid=true;
                bLoaded=bLoaded_new;
              }
              if(isNewVid) _frameCtrl.onload();
            }
            //onError
            if(_frameCtrl.onerror && data['event'] && data['event']==='onError') _frameCtrl.onerror(data['error']);
          }
          //}}}
        },false);

        var isReady;
        function checkIfReady(){
          if(isReady) return;
          //onsole.log(__iframeEl);
          //onsole.log(__iframeEl.contentWindow);
          __iframeEl.contentWindow&&__iframeEl.contentWindow.postMessage(JSON.stringify({'event':'listening','id':1}),__iframeEl.src);
          setTimeout(checkIfReady,300);
        }

        __iframeEl.onload=function(){
          _frameCtrl.state=/youtube/.test(__iframeEl.src)?-2:-3;
          isReady=false;
          if(_frameCtrl.state===-2) checkIfReady();
          if(_frameCtrl.onload) _frameCtrl.onload();
        };
        //i don't remember what the following line was for
        //if(!__iframeEl.src) setTimeout(__iframeEl.onload,1);

        //out
        callStack=[];
        function callCallStack(){
          ml.assert(isReady);
          ml.assert(__iframeEl.src);
          ml.assert(__iframeEl.contentWindow);
          callStack.forEach(function(c){
            var func = c[0];
            var args = c[1];
            __iframeEl.contentWindow.postMessage(JSON.stringify({
              "event": "command",
              "func": func,
              "args": args?[args]:[],
              "id": 1
            }), __iframeEl.src);
          });
          callStack=[];
        }
        function callPlayer(func, args) { callStack.push([func,args]);if(isReady) callCallStack(); }
        _frameCtrl.mute      =function( ){callPlayer('mute')};
        _frameCtrl.unMute    =function( ){callPlayer('unMute')};
        _frameCtrl.pause     =function( ){callPlayer('pauseVideo')};
      //_frameCtrl.play      =function(callback){callPlayer('playVideo');onNextStateChange=callback};//callback only called if state is actually changed
        _frameCtrl.play      =function( ){callPlayer('playVideo')};//callback only called if state is actually changed
        _frameCtrl.seekTo    =function(t){callPlayer('seekTo',[t])};
        _frameCtrl.setQuality=function(t){callPlayer('setPlaybackQuality',t)};
        _frameCtrl.setVolume =function(t){callPlayer('setVolume',t)};

        return _frameCtrl;
    } 
    var ytframe   = document.createElement('iframe');
    var frameCtrl = add_yt_ctrl(ytframe);
    if(!frameCtrl) return;

    ctYt.onPrefetch=function(){
      if(ctYt.yt_vid_url!=ytframe.src)
      {
        if(ctYt.yt_vid_url) ytframe.src=ctYt.yt_vid_url;
        else ytframe.removeAttribute('src');
      }
    };

    ytCtrl={};
    (function(){ 
      ytframe.style.border='0';
      ytframe.style.position='absolute';
      ytframe.style.left='0';
      ytframe.style.top='0';
      ytframe.style.width ='100%';
      ytframe.style.height='100%';
      ctYt.appendChild(ytframe);

      var cover = ctYt.appendChild(document.createElement('div'));
        cover.style.position='absolute';
        cover.style.left='0';
        cover.style.top='0';
        cover.style.width ='100%';
        cover.style.height='100%';
        cover.style.cursor='pointer';
        cover.onclick=function(){if(ctYt.onclick) ctYt.onclick()};

      var playing;
      ytCtrl.play__=function(){
        ml.assert(/youtu/.test(ytframe.src));
        frameCtrl.unMute();
        frameCtrl.setVolume(100);
        frameCtrl.seekTo(ctYt.vid_start?ctYt.vid_start:0);
        frameCtrl.play();
        playing=true;
        ctYt.show();
      };
      ytCtrl.stop___=function(){
        frameCtrl.pause();
        if(playing) ctYt.hide();
        playing=false;
      };
      ytCtrl.clear=function(){
        ytframe.src='about:blank';
        ctYt.hide();
      };
      //unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5)
      ytCtrl.isPlaying=function(){
        //buggy: YT vid plays but playerstate ===2 -- seem to be the case with http://www.youtube.com/watch?v=HGIMpmOTAVo&feature=feedwll&list=WL
      //return frameCtrl.state===1 || frameCtrl.state===2
        return frameCtrl.state===1;
      };
      ytCtrl.isBuffering=function(){
        return frameCtrl.state===3;
      };
    })(); 

    frameCtrl.onstatechange_=function(newState){
    //{{{
      if(newState===0 && ctYt.repeat_) setTimeout(ytCtrl.play__,100);
    //}}}
    };
    frameCtrl.onload=function(){
    //{{{
      ytCtrl.badYTvid=frameCtrl.state===-3;
      if(ytCtrl.badYTvid) return;
      //frameCtrl.setQuality('small')
      if(frameCtrl.state<0)
      {//trigger_ buffering
        if(ctYt.isHidden()){
          frameCtrl.setVolume(1);//setVolume(0) -> YT buggy noise (ein rauschen)
          frameCtrl.mute();
        }
      //frameCtrl.play(function(){if(ctYt.isHidden()) frameCtrl.pause()});//sometimes YT iframe doesn't send any message back -> callback of play not called -> call this line to increase probability that pause is called
        frameCtrl.play();
        setTimeout(function(){
        if(ctYt.isHidden()) frameCtrl.pause();
        },1000);
        //check if API working -- checks if play succesfully called and if YT iframe as sent a message back
        //if pause called directly after play -> no prefetching and state===-1
        //-> only assume error if state<-1
        setTimeout(function(){if(frameCtrl.state<-1&&ytCtrl.onerror) ytCtrl.onerror()},4000);
      }
    //}}}
    };
    frameCtrl.onerror=function(error){
    //{{{
      if(error===5){
        //YT buggy -- https://developers.google.com/youtube/iframe_api_reference#Events
        ml.assert(false,'YT API buggy');
        return;
      }
      function msg(text) { ml.assert(false,text);alert(text); }
      ytCtrl.badYTvid=true;
      if(error)
      {
        // original description:
        // 2 -- The YouTube URL contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.
        // 100 -- The YouTube video was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.
        // 101,105 -- The owner of the YouTube video does not allow it to be played in embedded players
        if(error==2) msg("The Youtube URL is invalid. For example, the video ID does not have 11 characters, or the video ID contains invalid characters, such as exclamation points or asterisks.");
        else if(error==100) msg("The YouTube video has been removed or is private.");
        else if(error==101 || error==150) msg("The owner of the YouTube video does not allow it to be played in embedded players.");
        else msg("The YouTube video couldn't be loaded"+(error?". Error code: "+error:"")+" A fallback sound will be played.");
      }
      else msg("YouTube threw an error. A fallback sound will be played.");
    //}}}
    };
  })(); 
  (function(){ 
    if(!ytCtrl){
      ctYt.notAvailable=true;
      ring.playYT=function(){return true};
      ring.stopYT=function(){};
      return;
    }
    var playing;
    var ytNotWorking;
    function cancel_(buffering){ 
      if(ytNotWorking && ytNotWorking!==true) window.clearTimeout(ytNotWorking);
      ytNotWorking=buffering?window.setTimeout(function(){ytNotWorking=false},3000):true;
      if(ytNotWorking===true) ytCtrl.clear();
    } 
    ytCtrl.onerror=function(){cancel_()};
    ring.playYT=function(){ 
      if(ytCtrl.badYTvid || ytNotWorking) return true;
      //YT API doesn't cope with flash crashing
      try
      {
        ytCtrl.play__();
        //===make sure that YT vid plays:
        //in case changing CSS of iframe leads the iframe to reaload -- following fix
        playing=true;
        setTimeout(function(){if(playing && !ytCtrl.isPlaying()) ytCtrl.play__()},1500);
        setTimeout(function(){if(playing && !ytCtrl.isPlaying()){notis.ring.stop();cancel_(ytCtrl.isBuffering());notis.ring.play_()}},3000);
      }
      catch(e){
        ml.assert(false,e);
        ytNotWorking=true;
        return true;
      }
    }; 
    ring.stopYT=function(){ 
      playing=false;
      try{
        ytCtrl.stop___();
      }
      catch(e){
        cancel_();
      }
    }; 
  })(); 
})(); 
*/
