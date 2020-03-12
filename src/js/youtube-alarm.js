function urlToId(url){
  //ID chars: /[a-zA-Z0-9-_]+/ --http://stackoverflow.com/questions/830596/what-type-of-id-does-youtube-use-for-their-videos
  //var matches=/youtube\.com.*(?:\?|&)v=([^&#]+)/.exec(url);
  var matches=/youtube\.com.*(?:\?|&)v=([a-zA-Z0-9\-_]+)/.exec(url) || /youtu.be\/([a-zA-Z0-9\-_]+)/.exec(url);
  return matches?matches[1]:null;
}

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
