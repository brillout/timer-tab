//NOTES on closure compiler behavior
//{{{
//-var p=Date.prototype;p.neverCalled=function..;// --> neverCalled isn't removed
//-window.neverCalled=function..;// --> neverCalled isn't removed
//}}}

const ml = window.ml = {};

ml.t1 = 32;

export default ml;

//shim
(function(){ 
  if(typeof document === "undefined") return;//=> called as metro background task

  if(document.head===undefined) document.head = document.getElementsByTagName('head')[0];
  if(document.body===undefined) document.body = document.getElementsByTagName('body')[0];

  //classList
  //{{{
  //required for IE9
  //use ['classList'] instead of .classList because of google closure compiler
  //Please note that this shim does not work in Internet Explorer versions less than 8.
  (function () {

  var classListProp = "classList";

  if (!Element.prototype.hasOwnProperty(classListProp)) {
    var trim = /^\s+|\s+$/g,
    setClasses = function (elem, classes) {
      elem.className = classes.join(" ");
    },
    checkAndGetIndex = function (classes, token) {
      if (token === "") {
        throw "SYNTAX_ERR";
      }
      if (/\s/.test(token)) {
        ml.assert(false);
        throw "INVALID_CHARACTER_ERR";
      }
      
      return classes.indexOf(token);
    },
    classListGetter = function () {
      var elem = this,
      classes  = elem.className.replace(trim, "").split(/\s+/);
      return {
        'length': classes.length,
        'item': function (i) {
          return classes[i] || null;
        },
        'contains': function (token) {
          return checkAndGetIndex(classes, token) !== -1;
        },
        'add': function (token) {
          if (checkAndGetIndex(classes, token) === -1) {
            classes.push(token);
            this['length'] = classes.length;
            setClasses(elem, classes);
          }
        },
        'remove': function (token) {
          var index = checkAndGetIndex(classes, token);
          if (index !== -1) {
            classes.splice(index, 1);
            this['length'] = classes.length;
            setClasses(elem, classes);
          }
        },
        'toggle': function (token) {
          if (checkAndGetIndex(classes, token) === -1) {
            this['add'](token);
          } else {
            this['remove'](token);
          }
        },
        'toString': function () {
          return elem.className;
        }
      };
    };
    
    if (Object['defineProperty']) {
      Object['defineProperty'](Element.prototype, classListProp, { 'get': classListGetter });
    } else if (Object.prototype['__defineGetter__']) {
      Element.prototype['__defineGetter__'](classListProp, classListGetter);
    }
  }

  })();
  //}}}

  /*
  //btoa atob for unicode chars
  //{{{
  (function()
  {
    try
    {
      window.btoa('语กǵ');
    }
    catch(e)
    {
      var Base64 =
      //{{{
      {
        //
        //
        //Base64 encode / decode
        //http://www.webtoolkit.info/
        //
        //
       
        // private property
        _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
       
        // public method for encoding
        encode : function (input) {
          var output = "";
          var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
          var i = 0;
       
          input = Base64._utf8_encode(input);
       
          while (i < input.length) {
       
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
       
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
       
            if (isNaN(chr2)) {
              enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
              enc4 = 64;
            }
       
            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
       
          }
       
          return output;
        },
       
        // public method for decoding
        decode : function (input) {
          var output = "";
          var chr1, chr2, chr3;
          var enc1, enc2, enc3, enc4;
          var i = 0;
       
          input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
       
          while (i < input.length) {
       
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
       
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
       
            output = output + String.fromCharCode(chr1);
       
            if (enc3 != 64) {
              output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
              output = output + String.fromCharCode(chr3);
            }
       
          }
       
          output = Base64._utf8_decode(output);
       
          return output;
       
        },
       
        // private method for UTF-8 encoding
        _utf8_encode : function (string) {
          string = string.replace(/\r\n/g,"\n");
          var utftext = "";
       
          for (var n = 0; n < string.length; n++) {
       
            var c = string.charCodeAt(n);
       
            if (c < 128) {
              utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
              utftext += String.fromCharCode((c >> 6) | 192);
              utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
              utftext += String.fromCharCode((c >> 12) | 224);
              utftext += String.fromCharCode(((c >> 6) & 63) | 128);
              utftext += String.fromCharCode((c & 63) | 128);
            }
       
          }
       
          return utftext;
        },
       
        // private method for UTF-8 decoding
        _utf8_decode : function (utftext) {
          var string = "";
          var i = 0;
          var c = c1 = c2 = 0;
       
          while ( i < utftext.length ) {
       
            c = utftext.charCodeAt(i);
       
            if (c < 128) {
              string += String.fromCharCode(c);
              i++;
            }
            else if((c > 191) && (c < 224)) {
              c2 = utftext.charCodeAt(i+1);
              string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
              i += 2;
            }
            else {
              c2 = utftext.charCodeAt(i+1);
              c3 = utftext.charCodeAt(i+2);
              string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
              i += 3;
            }
       
          }
       
          return string;
        }
      };
      //}}}
      window.btoa=function(str){return Base64.encode(str)};
      window.atob=function(str){return Base64.decode(str)};
  //
  //    //alternative implementation:
  //    //{{{
  //      function base64_encode (data) {
  //      // http://kevin.vanzonneveld.net
  //      // +   original by: Tyler Akins (http://rumkin.com)
  //      // +   improved by: Bayron Guevara
  //      // +   improved by: Thunder.m
  //      // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //      // +   bugfixed by: Pellentesque Malesuada
  //      // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //      // -    depends on: utf8_encode
  //      // *     example 1: base64_encode('Kevin van Zonneveld');
  //      // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
  //      // mozilla has this native
  //      // - but breaks in 2.0.0.12!
  //      //if (typeof this.window['atob'] == 'function') {
  //      //    return atob(data);
  //      //}
  //      var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  //      var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
  //          ac = 0,
  //          enc = "",
  //          tmp_arr = [];
  //
  //      if (!data) {
  //          return data;
  //      }
  //
  //      data = this.utf8_encode(data + '');
  //
  //      do { // pack three octets into four hexets
  //          o1 = data.charCodeAt(i++);
  //          o2 = data.charCodeAt(i++);
  //          o3 = data.charCodeAt(i++);
  //
  //          bits = o1 << 16 | o2 << 8 | o3;
  //
  //          h1 = bits >> 18 & 0x3f;
  //          h2 = bits >> 12 & 0x3f;
  //          h3 = bits >> 6 & 0x3f;
  //          h4 = bits & 0x3f;
  //
  //          // use hexets to index into b64, and append result to encoded string
  //          tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  //      } while (i < data.length);
  //
  //      enc = tmp_arr.join('');
  //
  //      switch (data.length % 3) {
  //      case 1:
  //          enc = enc.slice(0, -2) + '==';
  //          break;
  //      case 2:
  //          enc = enc.slice(0, -1) + '=';
  //          break;
  //      }
  //
  //      return enc;
  //    }
  //    function base64_decode (data) {
  //      // http://kevin.vanzonneveld.net
  //      // +   original by: Tyler Akins (http://rumkin.com)
  //      // +   improved by: Thunder.m
  //      // +      input by: Aman Gupta
  //      // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //      // +   bugfixed by: Onno Marsman
  //      // +   bugfixed by: Pellentesque Malesuada
  //      // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //      // +      input by: Brett Zamir (http://brett-zamir.me)
  //      // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //      // -    depends on: utf8_decode
  //      // *     example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
  //      // *     returns 1: 'Kevin van Zonneveld'
  //      // mozilla has this native
  //      // - but breaks in 2.0.0.12!
  //      //if (typeof this.window['btoa'] == 'function') {
  //      //    return btoa(data);
  //      //}
  //      var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  //      var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
  //          ac = 0,
  //          dec = "",
  //          tmp_arr = [];
  //
  //      if (!data) {
  //          return data;
  //      }
  //
  //      data += '';
  //
  //      do { // unpack four hexets into three octets using index points in b64
  //          h1 = b64.indexOf(data.charAt(i++));
  //          h2 = b64.indexOf(data.charAt(i++));
  //          h3 = b64.indexOf(data.charAt(i++));
  //          h4 = b64.indexOf(data.charAt(i++));
  //
  //          bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
  //
  //          o1 = bits >> 16 & 0xff;
  //          o2 = bits >> 8 & 0xff;
  //          o3 = bits & 0xff;
  //
  //          if (h3 == 64) {
  //              tmp_arr[ac++] = String.fromCharCode(o1);
  //          } else if (h4 == 64) {
  //              tmp_arr[ac++] = String.fromCharCode(o1, o2);
  //          } else {
  //              tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
  //          }
  //      } while (i < data.length);
  //
  //      dec = tmp_arr.join('');
  //      dec = this.utf8_decode(dec);
  //
  //      return dec;
  //    }
  //    function utf8_encode (argString) {
  //    // http://kevin.vanzonneveld.net
  //    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
  //    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //    // +   improved by: sowberry
  //    // +    tweaked by: Jack
  //    // +   bugfixed by: Onno Marsman
  //    // +   improved by: Yves Sucaet
  //    // +   bugfixed by: Onno Marsman
  //    // +   bugfixed by: Ulrich
  //    // *     example 1: utf8_encode('Kevin van Zonneveld');
  //    // *     returns 1: 'Kevin van Zonneveld'
  //      var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  //      var utftext = "",
  //          start, end, stringl = 0;
  //   
  //      start = end = 0;
  //      stringl = string.length;
  //      for (var n = 0; n < stringl; n++) {
  //          var c1 = string.charCodeAt(n);
  //          var enc = null;
  //   
  //          if (c1 < 128) {
  //              end++;
  //          } else if (c1 > 127 && c1 < 2048) {
  //              enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);
  //          } else {
  //              enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);
  //          }
  //          if (enc !== null) {
  //              if (end > start) {
  //                  utftext += string.slice(start, end);
  //              }
  //              utftext += enc;
  //              start = end = n + 1;
  //          }
  //      }
  //   
  //      if (end > start) {
  //          utftext += string.slice(start, stringl);
  //      }
  //   
  //      return utftext;
  //    }
  //    //}}}
    }
  })();
  //}}}
  */

/* not sure what browser doesn't support splice
if(!String.prototype.splice)
  String.prototype.splice = function(index, howManyToDel, newEl, moreNew) //unlike array, returns new string
  //{{{
  {
    ml.assert(!moreNew,'implement it');
    var a=[];
    for(var i=0;i<that.length;i++)
      a.push(that[i])
    if(newEl)
      a.splice(index, howManyToDel, newEl); //splice(index, howManyToDel, undefined) !== splice(index, howManyToDel)
    else
      a.splice(index, howManyToDel);
    var ret = '';
    for(var i=0;i<a.length;i++)
      ret +=a[i];
    return ret;
  };
  //}}}
*/
})(); 

ml.date={};
(function(){ 
  ml.date.readablize=function(str){ 
    if(str===undefined||str==='') return '';
    if(str.constructor===String) str=parseInt(str,10);
    return (str<10?'0':'')+str;
  }; 
  var weekday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
  var month  =new Array("January","February","March","April","May","June","July","August","September","October","November","December");
  ml.date.getWeek = function(that) 
  //{{{
  {
      /* False
      var determinedate = new Date();
      determinedate.setFullYear(that.getFullYear(), that.getMonth(), that.getDate());
      var D = determinedate.getDay();
      if(D == 0) D = 7;
      determinedate.setDate(determinedate.getDate() + (4 - D));
      var YN = determinedate.getFullYear();
      var ZBDoCY = Math.floor((determinedate.getTime() - new Date(YN, 0, 1, -6)) / 86400000);
      var WN = 1 + Math.floor(ZBDoCY / 7);
      return WN;
      */


  /**
   * Returns the week number for that date.  dowOffset is the day of week the week
   * "starts" on for your locale - it can be from 0 to 6. If dowOffset is 1 (Monday),
   * the week returned is the ISO 8601 week number.
   * @param int dowOffset
   * @return int
   */
  //Date.prototype.getWeek = function (dowOffset) {
  /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

    dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 0; //default dowOffset to zero
    var newYear = new Date(that.getFullYear(),0,1);
    var day = newYear.getDay() - dowOffset; //the day of week the year begins on
    day = (day >= 0 ? day : day + 7);
    var daynum = Math.floor((that.getTime() - newYear.getTime() - 
    (that.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
    var weeknum;
    //if the year starts before the middle of a week
    if(day < 4) {
      weeknum = Math.floor((daynum+day-1)/7) + 1;
      if(weeknum > 52) {
        nYear = new Date(that.getFullYear() + 1,0,1);
        nday = nYear.getDay() - dowOffset;
        nday = nday >= 0 ? nday : nday + 7;
        /*if the next year starts before the middle of
          the week, it is week #1 of that year*/
        weeknum = nday < 4 ? 1 : 53;
      }
    }
    else {
      weeknum = Math.floor((daynum+day-1)/7);
    }
    return weeknum;
  //};

  }
  //}}}
  ml.date.add = function(that,h,m,s,ms) //time -> time + h + m + s
  //{{{
  {
    if(ms===undefined) ms=0;
    if( s===undefined)  s=0;
    if( m===undefined)  m=0;
    if( h===undefined)  h=0;
    var newMs=that.getMilliseconds()+ms;
    //var newS=that.getSeconds()+s+1;
    var newS=that.getSeconds()      +s+newMs/1000;
    var newM=that.getMinutes()      +m+newS /60;
    var newH=that.getHours()        +h+newM /60;
    //new Date(year, month, day, hours, minutes, seconds, milliseconds)
    //setHours(hours, [minutes], [seconds], [millisec])
    that.setHours(newH%24, newM%60, newS%60, newMs%1000);
    that.setUTCDate(that.getUTCDate()+newH/24);
    return that;
  };
  //}}}
  ml.date.getDayBegining=function(date) { 
    var d = new Date(+date);
    var ret = +new Date(d.getFullYear(),d.getMonth(),d.getDate());
    ret += (d.getTimezoneOffset() - new Date(ret).getTimezoneOffset())*60*1000;
    return ret;
  }; 
  ml.date.readable={};
  ml.date.readable.getHours= function(that,twelveClock)
  //{{{
  {
    var ret=that.getHours();
    if(twelveClock)
    {
      ret %= 12;
      if(ret==0) ret=12;
    }
    return ml.date.readablize(ret);
  };
  //}}}
  ml.date.readable.getMinutes= function(that)
  //{{{
  {
    return ml.date.readablize(that.getMinutes());
  };
  //}}}
  ml.date.readable.getSeconds= function(that)
  //{{{
  {
    return ml.date.readablize(that.getSeconds());
  };
  //}}}
  ml.date.readable.getDate= function(that)
  //{{{
  {
    return ml.date.readablize(that.getDate());
  };
  //}}}
  ml.date.readable.getDay=function(that)
  //{{{
  {
    return weekday[that.getDay()];
  };
  //}}}
  ml.date.readable.getMonth=function(that)
  //{{{
  {
    return month[that.getMonth()];
  };
  //}}}
  ml.date.readable.getTime=function(that,withPeriod){ 
    ml.assert(arguments.length===2);
    ml.assert(withPeriod.constructor===Boolean);

    var diff = that - ml.date.getDayBegining(that);
    if(withPeriod) {
      var MID_DAY = 12*60*60*1000;
      var isPm = diff>=MID_DAY;
       if(isPm)  diff-=MID_DAY;
    }
    var ret = ml.date.readable.getCounter(diff,withPeriod?'periodclock':'alarmclock');
    if(withPeriod) ret+=' '+(isPm?'PM':'AM');
    return ret;
  }; 
  ml.date.readable.getCounter=function(diff,preset){ 
    ml.assert(arguments.length===2);

    var PRESETS = {
      'text':'%hv?%mv?%0sv?',
      //'text_verbose':'%hv? %mv? %sv',
      'countdown':'%0h:?%0m:?%0s',
      'alarmclock':'%0h:%0m',
      'periodclock':'%h%:0m?'
    };
    const format=PRESETS[preset];
    ml.assert(format);

    var digits=format.match(/%:?0?(h|s|m)v?\s?:?\??/g);
    ml.assert(digits);

    var data = {
      'ms':diff%1000      |0,
      's' :diff/1000%60   |0,
      'm' :diff/1000/60%60|0,
      'h' :diff/1000/60/60|0 
    };

    digits=digits.map(function(d){
      if(d[0]!=='%') return d;
      d=d.substring(1);
      if(d[d.length-1]==='?'){
        var optional=true;
        d=d.substring(0,d.length-1);
      }
      for(var i in data) if(d.indexOf(i)!==-1){
        if(optional){
          if(i==='h' && !data['h'] ||
             i==='m' && !data['h'] && !data['m'] ||
             i==='s' &&  data['h']
            )
          return '';
        }
        return d.replace(new RegExp('(0?)'+i),(data[i]<10?'$1':'')+data[i]).replace('v',i);
      }
      ml.assert(false);
    });

    return digits.join('');
  }; 
  /*
  ml.date.readable.getTime=function(s,format,digitShift,shiftTodo){ 
    //random info about epoch
    //1000000000000 ms ~= 31 years
    //1000000000000    ~= Sep 2001
    //1300000000000    -= March 2011
    //10000000000000   -= Nov 2286
    ml.assert(s!==undefined && s.constructor === Number);
    ml.assert(digitShift===undefined || digitShift.constructor===Number);
    ml.assert( shiftTodo===undefined ||  shiftTodo.constructor===Number);
    if(!format&&s.toString().length>12) format='time12_pretty';
    ml.assert(['timer','time12','time12_pretty','time24_pretty','countdown','data'].indexOf(format)!==-1);

    if(format==='time12' || format==='time12_pretty' || format==='time24_pretty' || format==='data'){
      ml.assert(digitShift===undefined&&shiftTodo===undefined);
      digitShift=0;
      shiftTodo=2;
    }
    else {
      if(digitShift===undefined) digitShift = 1;
      if(shiftTodo ===undefined) shiftTodo  = 0;
    }

    var verbose = format==='timer';
    var cutHead = format==='timer' || format==='countdown';
    var cutTail = verbose;
    var makeAMPM = format==='time12' || format==='time12_pretty';

    //epoch digit length won't change until year 2200
    //13 digit number interpretend as milliseconds correspond to > 30 years
    if(s.toString().length>12)
    {
      ml.assert(format==='time12' || format==='time12_pretty' || format==='data' || 'time24_pretty');
      //onsole.log(new Date(s));
      //onsole.log(new Date(new Date(s).getFullYear(),new Date(s).getMonth(),new Date(s).getDate()));
      s = s - ml.date.getDayBegining(s);
      //onsole.log(s);
    }
    if(makeAMPM) {
      var mid_day = 12*60*60*1000;
      var isPm = s>=mid_day;
      if(isPm) s-=mid_day;
    }

    var DEFAULT_PARTITION   = 100;//needed to add trailing zeros
    var DIGITS_PARTITION    = [1000,60,60];
    var DIGITS_ABBREVATION  = ['ms','s','m','h'];

    //=====do shift
    // failed attempt to determine digitShift (with current input information, it's not possible)
    //var MAX_EPOCH_LENGTH = 13;
    //var digitShift = 0;
    //while((DIGITS_PARTITION.slice(0,digitShift).reverse().concat([1]).reverse().reduce(function(a,b){return a*b})*s).toString().length<MAX_EPOCH_LENGTH && digitShift<=DIGITS_PARTITION.length) digitShift++;
    //ml.assert(digitShift<=DIGITS_PARTITION.length);
    digitShift+=shiftTodo;
    ml.assert(digitShift<=DIGITS_PARTITION.length);
    while(shiftTodo--) s /= DIGITS_PARTITION[digitShift-(shiftTodo+1)];
    s=parseInt(s,10);
    DIGITS_PARTITION  .splice(0,digitShift);
    DIGITS_ABBREVATION.splice(0,digitShift);

    //====compute digits
    var d = [];
    for(var i=0;i<DIGITS_PARTITION.length+1;i++)
    {
      var digitValue = s;
      for(var j=i-1;j>=0;j--) digitValue /= DIGITS_PARTITION[j];
      d.push((digitValue % (DIGITS_PARTITION[i] || Infinity))|0);
    }

    if(cutHead) while(d[d.length-1]===0 && d.length>1) d.pop();
    if(makeAMPM) if(d[d.length-1]===0) d[d.length-1]=12;

    if(cutTail)
    {
      var trailCut = d.length;
      while(d[0]===0 && d.length>1) d.shift();
      trailCut -= d.length;
    }

    if(!verbose)
      for(var i=0;i<d.length;i++) d[i]='00'.substring(0,((DIGITS_PARTITION[i] || DEFAULT_PARTITION)-1).toString().length-d[i].toString().length)+d[i];

    if(verbose)
    {
      DIGITS_ABBREVATION.splice(0,trailCut);
      for(var i=0;i<d.length;i++) d[i]+=DIGITS_ABBREVATION[i];
    }

    //onsole.log(d.slice().reverse().join(verbose?' ':':'));
    //onsole.log('');
    d.reverse();
    if(format==='data') return d;
    d = d.join(verbose?' ':':');
    //3:00 PM ~> 3 PM
    if(format==='time12_pretty') d = d.replace(/:00$/,'');
    if(format==='time12_pretty' || format==='time24_pretty') d = d.replace(/^0/,'');
    if(makeAMPM) d = d+' '+(isPm?'PM':'AM');
    return d;
  }; 
  */
  ml.date.readable.getDateRelative=function(that,verbose){ 
    ml.assert(that);
    that = new Date(that);
    var todayEnd = new Date();
      todayEnd.setHours(23);
      todayEnd.setMinutes(59);
      todayEnd.setSeconds(59);
      todayEnd.setMilliseconds(999);
  //ml.assert(todayEnd>that);
    var daysAgo = (todayEnd-that)/(1000*60*60*24);
    var ret;
    if(daysAgo<1)        return "today";
    else if(daysAgo<2)   ret = "yesterday";
    else if(daysAgo<15)  ret = (daysAgo|0)+" days ago";
    else if(daysAgo<31)  ret = ((daysAgo/7)|0)+" weeks ago";
    else {
      var months = ((daysAgo/30.5)|0);
      if(daysAgo<356) ret = months+" month"+(months>1?"s":"")+" ago";
      else {
        var years = ((daysAgo/356.24)|0);
        ret = years+" year"+(years>1?"s":"")+" ago";
      }
    }
    if(!verbose) return ret;
    return ret+", "+ml.date.readable.getDay(that)+(daysAgo<8?'':(" "+that.getDate()+"."+ml.date.readable.getMonth(that)))+(!years?'':('.'+that.getFullYear()));
  }; 
})(); 

ml.element={};
ml.element.getStyle=function(that,styleProp)
//{{{
{
  return document.defaultView.getComputedStyle(that,null).getPropertyValue(styleProp);
};
//}}}
ml.element.getPosition=function(that)
//{{{
{
  var curleft = 0;
  var curtop  = 0;
  var e=that;
  do
  {
    curleft += e.offsetLeft;
    curtop += e.offsetTop;
  } while (e = e.offsetParent);
  return {x: curleft, y: curtop};
};
//}}}
ml.element.removeFromDOM=function(that){ 
  ml.assert(that);
  that.parentElement.removeChild(that);
}; 
ml.element.create=function(type,props){ 
  var newEl = document.createElement(type);
  var insertToDom;
  if(props.appendTo) {
    insertToDom=function(){
      hook.appendChild(newEl);
    };
    var hook=props.appendTo;
    delete props.appendTo;
  }
  if(props.prependTo) {
    insertToDom=function(){
      if(!hook.firstChild)
        hook.appendChild(newEl);
      else
        hook.insertBefore(newEl,hook.firstChild);
    };
    var hook=props.prependTo;
    delete props.prependTo;
  }
  if(props.childs) {
    for(var i in props.childs) newEl.appendChild(props.childs[i]);
    delete props.childs;
  }
  for(var i in props) newEl[i]=props[i];
  if(insertToDom) insertToDom();
  return newEl;
}; 

(function(){
  function getDummy(tagName) { 
    var dummy = document.createElement(tagName||'div');
    dummy.style.display='inline-block';
    dummy.style.position='absolute';
    dummy.style.top='0';
    dummy.style.top='-9999px';
    dummy.style.zIndex='-9999';
    dummy.style.visibility='hidden';
    return dummy;
  } 
  function getWidestChar(chars) { 
    var widestChar;
    var widestSize=-1;
    var dummy = document.body.appendChild(getDummy());
    for(var i=0;i<chars.length;i++) {
      dummy.innerHTML=chars[i];
      var charWidth=parseInt(ml.element.getStyle(dummy,'width'),10);
      if(charWidth>widestSize)
      {
        widestSize=charWidth;
        widestChar=chars[i];
      }
    }

    //window.bla=window.bla||0;
    //if(window.bla!==2&&window.bla!==0) document.body.removeChild(dummy);
    //window.bla++;

    //dummyinspect
    //onsole
    document.body.removeChild(dummy);
    ml.assert(widestChar);
    return widestChar;
  } 
  function getData(el,width,height,possibleChars,minTextLength){ 
    var dummyContent=(el.getAttribute('data-text')||'')+el.innerHTML;
      if(dummyContent.length<(minTextLength&&minTextLength.length)) dummyContent=minTextLength;
      if(dummyContent.length<1) dummyContent='y';
      if(possibleChars) //if possibleChars not given we then assume that all char have same width
      {
        ml.assert(el.children.length===0);
        var widestChar = getWidestChar(possibleChars);
        var dummyTextLength = dummyContent.length;
        dummyContent = '';
        for(var i=0;i<dummyTextLength;i++) dummyContent+=widestChar;
      }

    var dummy= getDummy(el.tagName);
      dummy.style.fontFamily=ml.element.getStyle(el,'font-family');
      dummy.style.fontFamily=ml.element.getStyle(el,'font-family');
      dummy.style.fontSize=DUMMY_SIZE+'px';
      dummy.style.whiteSpace='nowrap';//should el be equal to el.getStyle('white-space')?
      dummy.style.letterSpacing=ml.element.getStyle(el,'letter-spacing');

    dummy.innerHTML=dummyContent;
    document.body.appendChild(dummy);
    //dummyinspect
    //onsole
    /*
    if(!window.bla)window.bla=0;
    window.bla++;
    var c = window.bla;
    onsole.log('t0');
    onsole.log(c);
    onsole.log(ml.element.getStyle(dummy,'font-family'));
    onsole.log(ml.element.getStyle(dummy,'width'));
    setTimeout(function(){
    onsole.log('t1');
    onsole.log(c);
    onsole.log(ml.element.getStyle(dummy,'font-family'));
    onsole.log(ml.element.getStyle(dummy,'width'));
    },0);
    setTimeout(function(){
    onsole.log('t2');
    onsole.log(c);
    onsole.log(ml.element.getStyle(dummy,'font-family'));
    onsole.log(ml.element.getStyle(dummy,'width'));
    },100);
    setTimeout(function(){
    onsole.log('t3');
    onsole.log(c);
    onsole.log(ml.element.getStyle(dummy,'font-family'));
    onsole.log(ml.element.getStyle(dummy,'width'));
    },1000);
    setTimeout(function(){
    onsole.log('t4');
    onsole.log(c);
    onsole.log(ml.element.getStyle(dummy,'font-family'));
    onsole.log(ml.element.getStyle(dummy,'width'));
    },5000);
    */
    var  width_dummy =  width&&parseInt(ml.element.getStyle(dummy,'width' ),10);
    var height_dummy = height&&parseInt(ml.element.getStyle(dummy,'height'),10);
    var ratio = Math.min(height?(height/height_dummy):Infinity,
                          width?( width/ width_dummy):Infinity);
    document.body.removeChild(dummy);
    return {fontSize:ratio*DUMMY_SIZE,width:ratio*width_dummy,height:ratio*height_dummy};
  } 
  var DUMMY_SIZE=100;//intuitively: the bigger the font-size the more precise the approximation
  var boxSizingPropName=null;
  ml.adjustFontSize=function(el,possibleChars,noHeight,minTextLength,isInsideATable) { 
    /* to reuse cache; clear it when box size changes
    //using cache -> assumption is made that font familly and box size doesn't change
    //based on assumption that width of a text is approx proportional to its fontSize
    //notes
    //-absolute font-size is equally precise as percentage font-size
    //-possibleChars is used for fonts with variable char width
    var textLength = ((el.getAttribute('data-text')||'')+el.innerHTML).length;
    if(textLength===el._oldTextLength) return;
    el._oldTextLength=textLength;
    if(!el._ml_textSizeRatioCache) el._ml_textSizeRatioCache={};
    if(el._ml_textSizeRatioCache[textLength]) return el._ml_textSizeRatioCache[textLength];
    */

    //noHeight computed automatically using getMatchedCSSRules
    //-http://stackoverflow.com/questions/2952667/find-all-css-rules-that-apply-to-an-element
    //-but only implemented in webkit: https://bugzilla.mozilla.org/show_bug.cgi?id=438278
    //-gecko polyfill: https://gist.github.com/3033012

    function getSize(el,prop){return parseInt(ml.element.getStyle(el,prop)||0,10)};

    if(isInsideATable){
      //-alternatively & easier: temporarely set fontSize to 0px
      //-to avoid following: adjust font size ~> text length increases => el size increases
      //-using el.style.overflow='hidden' doesn't work for procentual width
      var oldInnerHTML= el.innerHTML;
      var oldDataText = el.getAttribute('data-text');
      el.innerHTML='';
      el.removeAttribute('data-text');
    }
    var width  = getSize(el,'width');
    var height;
    if(!noHeight) height = getSize(el,'height');
    if(isInsideATable){
      el.innerHTML=oldInnerHTML;
      if(oldDataText) el.setAttribute('data-text',oldDataText);
    }

    if(boxSizingPropName===null) boxSizingPropName = ['box-sizing','-moz-box-sizing','-o-box-sizing','-ms-box-sizing','-webkit-box-sizing']
                                         .filter(function(p){return document.createElement('div').style[p]!==undefined})[0];
    if(boxSizingPropName&&ml.element.getStyle(el,boxSizingPropName)==='border-box') {
       width -= getSize(el,'border-left')+getSize(el,'border-right' )+getSize(el,'padding-left')+getSize(el,'padding-right' );
      if(height)
      height -= getSize(el,'border-top' )+getSize(el,'border-bottom')+getSize(el,'padding-top' )+getSize(el,'padding-bottom');
    }

    
    el.style.fontSize=Math.floor(getData(el,width,height,possibleChars,minTextLength).fontSize)+'px';

    ml.assert(ml.element.getStyle(el,'display')==='block' || ml.element.getStyle(el,'display')==='inline-block' || ml.element.getStyle(el,'display')==='table-cell',"ml.element.getStyle(el,'display')=="+ml.element.getStyle(el,'display'),1);

    //following assert fails with browser zoom
    //ml.assert(ml.element.getStyle(el,'font-size')===el.style.fontSize);

    //good enough without refinment?
    //note: will break minTextLength option
    //******** Refinment ********
    /*
    ml.assert(!minTextLength);
    var max=100;
    ml.assert(width!==0&&height!==0);
    while( ml.element.getStyle(el, 'width')<( width||0       ) &&
           ml.element.getStyle(el,'height')<(height||0       )  &&--max) el.style.fontSize=parseInt(el.style.fontSize,10)+2+'px';
    while((ml.element.getStyle(el, 'width')>( width||Infinity) ||
           ml.element.getStyle(el,'height')>(height||Infinity)) &&--max) el.style.fontSize=parseInt(el.style.fontSize,10)-1+'px';
    ml.assert(max>0,'max===0');
    */
  }; 
  ml.getTextSize=function(el,w,h){return getData(el,w,h)};
})();

ml.showBrowserHint=function(name,additionalText)
//{{{
{
  var browserDetect = {
  //{{{
    init: function () {
      //this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
      this.browser = this.searchString(this.dataBrowser);
      this.version = this.searchVersion(navigator.userAgent)
        || this.searchVersion(navigator.appVersion)
        ;//|| "an unknown version";
      //this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function (data) {
      for (var i=0;i<data.length;i++)	{
        var dataString = data[i].string;
        var dataProp = data[i].prop;
        this.versionSearchString = data[i].versionSearch || data[i].identity;
        if (dataString) {
          if (dataString.indexOf(data[i].subString) != -1)
            return data[i].identity;
        }
        else if (dataProp)
          return data[i].identity;
      }
    },
    searchVersion: function (dataString) {
      var index = dataString.indexOf(this.versionSearchString);
      if (index == -1) return;
      return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },
    dataBrowser: [
      {
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
      },
      { 	string: navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb"
      },
      {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
      },
      {
        prop: window.opera,
        identity: "Opera"
      },
      {
        string: navigator.vendor,
        subString: "iCab",
        identity: "iCab"
      },
      {
        string: navigator.vendor,
        subString: "KDE",
        identity: "Konqueror"
      },
      {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
      },
      {
        string: navigator.vendor,
        subString: "Camino",
        identity: "Camino"
      },
      {		// for newer Netscapes (6+)
        string: navigator.userAgent,
        subString: "Netscape",
        identity: "Netscape"
      },
      {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer",
        versionSearch: "MSIE"
      },
      {
        string: navigator.userAgent,
        subString: "Gecko",
        identity: "Mozilla",
        versionSearch: "rv"
      },
      { 		// for older Netscapes (4-)
        string: navigator.userAgent,
        subString: "Mozilla",
        identity: "Netscape",
        versionSearch: "Mozilla"
      }
    ],
    dataOS : [
      {
        string: navigator.platform,
        subString: "Win",
        identity: "Windows"
      },
      {
        string: navigator.platform,
        subString: "Mac",
        identity: "Mac"
      },
      {
           string: navigator.userAgent,
           subString: "iPhone",
           identity: "iPhone/iPod"
        },
      {
        string: navigator.platform,
        subString: "Linux",
        identity: "Linux"
      }
    ]
  };
  //}}}

  browserDetect.init();

  var str="<div style='padding: 30px'>";
  var instruction='in order to use '+name+' download the latest version of your browser at <a target="_blank" href=';
  if(browserDetect.browser)
  {
    var browser=browserDetect.browser;
    if(browser==='Chrome')
    {
      browser='Google Chrome';
      instruction+="'http://www.google.com/chrome/'>www.google.com/chrome</a>";
    }
    else if(browser==='Firefox')
    {
      instruction+="'http://www.mozilla.com/firefox/'>www.mozilla.com/firefox</a>";
    }
    else if(browser==='Safari')
    {
      instruction+="'http://www.apple.com/safari/download/'>www.apple.com/safari/download</a>";
    }
    else if(browser==='Explorer')
    {
      browser='Internet Explorer';
      instruction="in order to use "+name+" install the Google Chrome Frame plug-in at <a target='_blank' href='http://code.google.com/chrome/chromeframe/'>http://code.google.com/chrome/chromeframe</a>";
    }
    else
      instruction=null;


    str+="you are using the browser "+browser;
    if(browserDetect.version)
      str+=" "+browserDetect.version;
    str+="<br><br>";
    if(instruction)
      str+=instruction+'.<br><br>';
  }
  str+=name+" supports following browsers:<br> \
    <ul> \
      <li><b>Internet Explorer</b> with the <b>Google Chrome Frame</b> plug-in</li> \
      <li><b>Firefox 3.5</b> or higher</li> \
      <li><b>Safari 5</b> or higher</li> \
      <li><b>Google Chrome 4</b> or higher</li> \
    </ul> \
    ";

  if(additionalText) str+='<br>'+additionalText;

  str+="</div>";

  document.body.innerHTML=str;
}
//}}}

ml.out=function(){ 
  window['co'+'nsole']&&window['co'+'nsole']['log']&&window['co'+'nsole']['log'].apply(window['co'+'nsole'],arguments);
}; 
if(typeof window !== "undefined" && window['co'+'nsole']){
  window['co'+'nsole'].print=function(obj) //nice print for objects
  //{{{
  {
    //return JSON.stringify(obj);
    window['co'+'nsole'].log(JSON.stringify(obj));
    /*
    function to_str(foo)
    {
      if(foo===undefined)
        return 'undefined';
      if(foo.constructor===Object)
      {
        var str='';
        for(key in foo)
          str+=','+key+':'+to_str(foo[key]);
        str = '{'+str.substring(1)+'}';
        return str;
      }
      return foo.toString();
    }
    if(window['co'+'nsole'] && window['co'+'nsole'].log)
      window['co'+'nsole'].log(to_str(obj));
    */
  };
  //}}}
  window['co'+'nsole'].printStack=function()
  //{{{
  {
    if(window['co'+'nsole'] && window['co'+'nsole'].log)
    {
      //http://stackoverflow.com/questions/2060272/while-debugging-javascript-is-there-a-way-to-alert-current-call-stack
      window['co'+'nsole'].log(new Error().stack);
      /*
      try{wontwork}
      catch(e){
        window['co'+'nsole'].log(e.stack);
        return e.stack;
        }
        */
    }
  };
  //}}}
}
ml.assert=function(bool,msg,skipCallFcts,api_error){ 
//works properly in webkit only
  if(typeof window === "undefined") return;
  if(!bool)
  {
    var errorStack = new Error().stack;
    var errorStr = (function()
    {
      if(!skipCallFcts) skipCallFcts=0;
      skipCallFcts++;
      if(ml.browser().usesGecko && window['co'+'nsole'] && window['co'+'nsole'].log) window['co'+'nsole'].log(errorStack);
      if(errorStack)
      {
        do
        {
          errorStack = errorStack.replace(/.*[\s\S]/,'');
        //fct=fct.caller;
        }while(skipCallFcts--)
        var fctLine = /[^\/]*$/.exec(errorStack.split('\n')[0]).toString().replace(/\:[^\:]*$/,'');
        //return 'assertion fail at '+scriptSource+':'+(fct.name?fct.name:'(anonymous)')+':'+/[^:]*(?=:(?!.*:.*))/.exec(fctLine);
      }
      return 'assertion fail at '+fctLine;
    })();
    if(msg!==undefined) errorStr+=' ('+(msg.join&&msg.join(',')||msg)+')';
    if(api_error)
    {
      throw errorStr;
    //return;//returns anyways since throw
    }

    //*
    var HARD=false;
    /*/
    var HARD=window.location.hostname==='localhost';
    //*/

    if(window.navigator.userAgent.indexOf('MSIE')!==-1) return; //fix for stupid IE9 bug: window['co'+'nsole'].log is defined but shoudn't be called
    if(window['co'+'nsole'] && window['co'+'nsole'].log && !HARD)
    {
      window['co'+'nsole'].log(errorStr);
      //if(cwindow['co'+'nsole']onsole['assert']) window['co'+'nsole']['assert'](false);
    }
    for(var i=3;i<arguments.length;i++)
    {
      if(window['co'+'nsole'] && window['co'+'nsole'].log) window['co'+'nsole'].log(arguments[i]);
      else errorStr += arguments[i]+'\n';
    }
    if(HARD)    window.alert(errorStr+'\n'+errorStack);
    window['co'+'nsole'].log(errorStr+'\n'+errorStack);
    if(HARD) throw(errorStr);
  }
/*
var scriptSource =
//{{{
  //source:
    // http://stackoverflow.com/questions/984510/what-is-my-script-src-url
    // http://stackoverflow.com/questions/1865914/can-javascript-file-get-its-ows-name
(function() 
{
    var scripts = document.getElementsByTagName('script'), 
        script = scripts[scripts.length - 1]; 

    //No need to perform the same test we do for the Fully Qualified
    return script.getAttribute('src', 2); //this works in all browser even in FF/Chrome/Safari
}());
//}}}
*/
}; 

var tact;
var tactFcts=[];
ml.addTactFct=function(fct)
//{{{
{
  tactFcts.push(fct);
  if(!tact)
    tact=window.setInterval(function()
    {
      for(var i in tactFcts)
        (tactFcts[i])();
    },150);
};
//}}}

ml.hash={};
//{{{
//never use location.hash, instead use ml.hash
ml.hash.get=function()
{
  var ret = location.hash.substring(1);
  if(ml.browser().isSafari) ret = ret.replace(/%23/g,'#'); //better: escape #/%23
  return ret;
};
ml.hash.set=function(h)
{
  if(h[0] && h[0]==='#')
    h='#'+h; //leading # will collapse with default # thus adding one
  location.hash=h;
};
ml.hash.isClear=function()
{
  return ml.hash.get()==='';
};
ml.hash.clear=function() //always user hash.clear instead of location.hash='###'
{
  if(scrollY===0 && scrollX===0)
    location.hash='#';
  else
  {
    if(!this.listenerAdded)
    {
      //may not work if other listener clear hash before this listener is called
      ml.addHashListener(function()
      {
        var acHash=ml.hash.get();
        //%23%23 for safari
        if(acHash==='##' || acHash==='%23%23')
        {
          var tmp=[scrollX,scrollY];
          location.hash='#';
          scrollTo(tmp[0],tmp[1]);
        }
      });
      this.listenerAdded=true;
    }
    location.hash='###';
  }
};
//}}}
ml.addHashListener=function(fct,runOnInit)
//{{{
{
  if(window.onhashchange!==undefined)
  {
    //window.onhashchange=function(){
    //  fct();
    //};
    //window.addEventListener('hashchange',fct,false);
    window.addEventListener('hashchange',function(){fct()},false);
  }
  else
  {
    var actualHash=location.hash;
    ml.addTactFct(function()
    {
      if(location.hash!=actualHash)
      {
        actualHash=location.hash;
        fct();
      }
    });
  }
  if(runOnInit) fct();
};
//}}}

ml.getKeyNum=function(ev)
//{{{
{
  //depecrated -- don't use cose keyCode!==charKey
  if(ev.mlKeyCode)
    return ev.mlKeyCode; //mylib keycode -- used when creating keyboard events
	if(window.event) // IE
 		return ev.keyCode;
	if(ev.which) // Netscape/Firefox/Opera
 		return ev.which;
	if(ev.keyCode)
		return ev.keyCode;
};
//}}}
ml.controlKeyPressed=function(ev)
//{{{
{
  return ev.ctrlKey || ev.altKey || ev.metaKey;
};
//}}}


var faviconEl;
ml.changeIcon=function(url)
//{{{
{
  var createNewEl=ml.browser().usesGecko;
  if(!faviconEl || createNewEl)
  {
  //var REL = 'shortcut icon';
    var REL = 'icon';
    var oldlinks=document.getElementsByTagName('link');
    for(var i=0;i<oldlinks.length;i++){
      var rel = oldlinks[i].getAttribute('rel');
      if(rel && rel.toLowerCase()==REL)
        document.head.removeChild(oldlinks[i]);
   }

    faviconEl      = document.createElement('link');
    faviconEl.rel  = REL;
    faviconEl.type = 'image/png'; //needed for webkit dynamic favicon
    document.head.appendChild(faviconEl);
  }
  faviconEl.href=url;

  /*
  if(!faviconEl)
  {
  //var REL = 'shortcut icon';
    var REL = 'icon';
    var oldlinks=document.getElementsByTagName('link');
    for(var i=0;i<oldlinks.length;i++)
      if(oldlinks[i].getAttribute('rel').toLowerCase()==REL)
        document.head.removeChild(oldlinks[i]);

    faviconEl      = document.createElement('link');
    faviconEl.rel  = REL;
    faviconEl.type = 'image/png'; //needed for webkit dynamic favicon
    document.head.appendChild(faviconEl);
  }
  faviconEl.href=url;
  */
  /*
  //var REL = 'shortcut icon';
  var REL = 'icon';
  if(!faviconEl)
  {
    var oldlinks=document.getElementsByTagName('link');
    for(var i=0;i<oldlinks.length;i++)
      if(oldlinks[i].getAttribute('rel').toLowerCase()==REL)
        document.head.removeChild(oldlinks[i]);
  }
  else
    {try{document.head.removeChild(faviconEl);}catch(e){}}

  faviconEl      = document.createElement('link');
  faviconEl.rel  = REL;
  faviconEl.href = url;
  faviconEl.type = 'image/png'; //needed for webkit dynamic favicon
  if(!window.stopi) document.head.appendChild(faviconEl);
  //*/
};
//}}}
ml.canvasIcon=function(ctxTsf)
//{{{
{
  var canvas=document.createElement('canvas');
  canvas.height=32;
  canvas.width=32;
  var ctx=canvas.getContext('2d');

  ctx=ctxTsf(ctx);

  ml.changeIcon(canvas.toDataURL());
  //if(firstTime) //chrome bug fix
    //ml.changeIcon(canvas.toDataURL());
}
//}}}
ml.timeIcon = function(scale,color,twelveClock)
//{{{
{
  if(!scale) scale=1;
  if(!color) color='black'
  var d= new Date();
  var canvas=document.createElement('canvas');
  canvas.height=32/scale;
  canvas.width =32/scale;
  var ctx=canvas.getContext('2d');

  ctx.fillStyle=color;
  ctx.font=Math.floor(15/scale)+'pt arial';
  ctx.fillText(ml.date.readable.getHours(d,twelveClock)  ,0,ml.browser().usesGecko?15/scale:14/scale);
  ctx.font=16/scale+'pt arial';
  ctx.fillText(ml.date.readable.getMinutes(d),5/scale,32/scale);

  return canvas.toDataURL();
};
//}}}
ml.doneIcon = function(d,color1,color2)
//{{{
{
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var h=d;
  var w=d;
  canvas.height=h;
  canvas.width=w;
  ctx.clearRect(0,0,w,h);
  //var lingrad=ctx.createLinearGradient(0,0,0,150);
  var lingrad=ctx.createLinearGradient(0,0,0,h);
  lingrad.addColorStop(0, color2);
  lingrad.addColorStop(1, color1);
  ctx.fillStyle = lingrad;

  ctx.beginPath();

  var delta=[w/20,-h/4];

  var p1  =[0,h/2];
  var p2  =[w/10,h/2];
  //var p3  =[w/4,h/2+h/5+h/10];
  var p3 = [w/4,h-h/4];
  var p4  =[w-w/10,0];
  var p5  =[w,0];
  var p6  =[w,h/10];
  var p7  =[w/4,h];
  var p6a =[p7[0]+delta[0]+w/10,p7[1]+delta[1]-h/10];
  var p6b =[p7[0]+w/10,p7[1]-h/10];
  var p8  =[0,h/2+h/10];

  var p3a =[p7[0]-w/10,p7[1]-h/10];
  var p3a =[p3a[0]+w/40,p3a[1]-h/40];
  var p3b =[p3[0]+delta[0],p3[1]+delta[1]];
  //var p3b =[p3a[0]+delta[0]+w/10,p3a[1]+delta[1]-h/10];

  function grad()
  {
    ctx.moveTo(p1[0],p1[1]);
    ctx.lineTo(p2[0],p2[1]);
    ctx.lineTo(p3[0],p3[1]);
    ctx.lineTo(p3a[0],p3a[1]);  
    //ctx.lineTo(p3b[0],p3b[1]);
    //ctx.lineTo(p4[0],p4[1]);
    ctx.quadraticCurveTo(p3b[0],p3b[1],p4[0],p4[1]);
    ctx.lineTo(p5[0],p5[1]);
    ctx.lineTo(p6[0],p6[1]);
    //ctx.lineTo(p6b[0],p6b[1]);
    //ctx.lineTo(p6a[0],p6a[1]);
    //ctx.quadraticCurveTo(p6a[0],p6a[1],p6b[0],p6b[1]);
    ctx.quadraticCurveTo(p6a[0],p6a[1],p7[0],p7[1]); 
    ctx.lineTo(p7[0],p7[1]);
    ctx.lineTo(p8[0],p8[1]);
    ctx.lineTo(p1[0],p1[1]);
  }

  grad();

  ctx.fill();
  //ctx.stroke();

  return canvas.toDataURL();
};
//}}}
const cache__colorImageUrls = {};
ml.getColorImageURL=function(color,scale)
//{{{
{
  if(!scale) scale=1;

  if(!cache__colorImageUrls[color])
  {
    var canvas=document.createElement('canvas');
    canvas.height=32/scale;
    canvas.width=32/scale;
    var ctx=canvas.getContext('2d');

    ctx.scale(1/scale,1/scale);

    ctx.fillStyle = color;
    ctx.fillRect(0,0,300,150);

    cache__colorImageUrls[color] = canvas.toDataURL();
  }
  return cache__colorImageUrls[color];
};
//}}}
ml.timerIcon = function(diff,percent,scale,color)
//{{{
{
  ml.assert(scale===undefined);
  ml.assert(color===undefined);

//var FILL_DONE='#faa';
//var FILL_LEFT='#0f0';
//var FILL_FINISH='red';
//var FILL_STOPW='transparent';

  var FILL_DONE='#aaf';
  var FILL_LEFT='#eee';
//var FILL_LEFT='transparent';
  var FILL_FINISH='#e11';
  var FILL_STOPW=FILL_LEFT;
//FILL_FINISH=FILL_DONE;
//var TEXT_COLOR="#444";
  var TEXT_COLOR="black";
//var TEXT_COLOR="#111";

  var ICON_SIZE = 16;

  if(diff<=0 && percent) return ml.getColorImageURL(Math.abs(diff)%2===0?FILL_FINISH:'transparent',32/ICON_SIZE);
  if(diff<=0) diff=0;
  
  var canvas=document.createElement('canvas');
  canvas.height = ICON_SIZE;
  canvas.width  = ICON_SIZE;
  var ctx=canvas.getContext('2d');

  var hours   = diff/3600|0;
  var minutes = diff/60|0;
  var seconds = diff%60;
  var minutesOnBot=minutes>59;
  if(minutesOnBot)
    minutes = minutes % 60;
  var top=minutesOnBot?hours:minutes;
  var bot=minutesOnBot?minutes:seconds;

  //background
  if(percent!==undefined && percent!==null) { 
    ml.assert(percent<=1 && percent>=0,'percent==='+percent);
    var h=canvas.height;
    var w=canvas.width;

    ctx.fillStyle=FILL_LEFT;
    ctx.fillRect(0,0,w,h);

    ctx.moveTo(w/2,0);
    var borderPos = (2*h+2*w)*percent;
    if(borderPos<=w/2)
      borderPos=[w/2+borderPos,0];
    else
    {
      ctx.lineTo(w,0);   
      if(borderPos<=w/2+h)
        borderPos=[w,borderPos-w/2];
      else
      {
        ctx.lineTo(w,h);
        if(borderPos<=w/2+h+w)
          borderPos=[w-(borderPos-w/2-h),h];
        else
        {
          ctx.lineTo(0,h);
          if(borderPos<=w/2+h+w+h)
            borderPos=[0,h-(borderPos-w/2-h-w)];
          else
          {
            ml.assert(borderPos<=w/2+h+w+h+w/2,percent);
            ctx.lineTo(0,0);
            borderPos=[borderPos-(w/2+h+w+h),0];
          }
        }
      }
    }
    ctx.lineTo(borderPos[0],borderPos[1]);
    ctx.lineTo(w/2,h/2);
    ctx.fillStyle=FILL_DONE;
    //ctx.fillStyle='rgba(255,0,0,1)';
    ctx.fill();
  } 
  else { 
    ctx.fillStyle = FILL_STOPW;
    ctx.fillRect(0,0,ctx.canvas.height,ctx.canvas.width);
  } 

  //text
  ctx.fillStyle=TEXT_COLOR;
  if(top>0) {
    ctx.font='7pt arial';
    ctx.fillText(ml.date.readablize(top),0,7);
    ctx.font='9pt arial';
    ctx.fillText(ml.date.readablize(bot),2,16);
    /*
    ctx.font='8pt arial';
    ctx.fillText(ml.date.readablize(top),1,8);
    ctx.font='8pt arial';
    ctx.fillText(ml.date.readablize(bot),1,17);
    */
  } else {
    ctx.font='10pt arial';
    ctx.textAlign='center';
    ctx.fillText(bot,
                8+(bot.length===1?1:0),
                12+(ml.browser().usesGecko?1:0));
  }

  return canvas.toDataURL();

  // old code
  //{{{
//====background color with time gradient
//  function getColor()
//  {
//    //G: 255 -> 180
//    //R: 0 -> 255
//    //G: 180 -> 0
//    var green=255;
//    var red=0;
//    var GREEN_STOP = 180;
//    ml.assert(percent<=1,'percent==='+percent);
//    var delta = 255*2*percent;
//    green = Math.max(255-delta,GREEN_STOP);
//    delta -= 255-GREEN_STOP;
//    if(delta>0)
//    {
//      red = Math.min(delta,255);
//      delta -= 255;
//    }
//    if(delta>0)
//    {
//      green = GREEN_STOP-delta;
//      delta -= GREEN_STOP;
//    }
//    ml.assert(delta<=0);
//    return 'rgb('+parseInt(red)+','+parseInt(green)+',0)';
//  }
//  ctx.fillStyle = percent===undefined?getColor():'#00F';
//  ctx.fillRect(0,0,ctx.canvas.height,ctx.canvas.width);

//====icon generation with scaling
//  canvas.height=32/scale;
//  canvas.width=32/scale;
//  ctx.scale(1/scale,1/scale);
//
////ctx.fillStyle=percent===undefined || percent===null?'white':'black';
//  ctx.fillStyle=TEXT_COLOR;
//  if(top>0)
//  {
//    ctx.font='15pt arial';
//    ctx.fillText(ml.date.readablize(top),0,ml.browser().usesGecko?15:14);
//    ctx.font='16pt arial';
//    ctx.fillText(ml.date.readablize(bot),5,32);
//  }
//  else
//  {
//    ctx.font='20pt arial';
//    ctx.textAlign='center';
//    ctx.fillText(bot,
//                16+(scale&&bot.length===1?1:0),
//                24+(scale>1);
//  }
    //}}}

};
//}}}
ml.circleIcon = function(imgs,d,offset)
//{{{
{
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
   var h=d;
   canvas.height=h;
   var w=d;
   canvas.width=w;
   /*
   ctx.clearRect(0,0,w,h);
   var lingrad=ctx.createLinearGradient(0,0,0,150);
   lingrad.addColorStop(0, '#333');
   lingrad.addColorStop(1, '#000');
   ctx.fillStyle = lingrad;
  // ctx.fillStyle = 'white';
  // ctx.fillRect(0,0,300,150);
   */

  function makeIconCircle(dim,offset)
  {
    //determine center, radius, perimeter
    var cX=(w-1)/2;
    var cY=(h-1)/2;
    var r=h/2-dim/2; //assume h==w

    for(var i in imgs)
    {
      var angle = 2*Math.PI*i/imgs.length;
      var X=Math.cos(angle)*r -dim/2 + cX + offset[0];
      var Y=Math.sin(angle)*r -dim/2 + cY + offset[1];
      ctx.drawImage(imgs[i],X,Y,dim,dim);
    }
  }

  if(!offset)
    offset=[-4,0];

  var dim = imgs.length>4?d/3
           :imgs.length==1?d
           :d/2;
  makeIconCircle(dim,offset);
  var ret = canvas.toDataURL();
  return ret;
};
//}}}
ml.dooityRandColor = function(gray,n)
//{{{
{
  function undim(color)
  //{{{
  //equivalent to 0.5 alpha with white background
  {
    function do_(n)
    {
      return parseInt(n+(255-n)/2,10);
      //opposite operation: dim
      //return parseInt(n/2,10);
    }
    return [do_(color[0]),do_(color[1]),do_(color[2])];
  }
  //}}}

  function to_str(c)
  //{{{
  {
    return 'rgb('+c[0]+','+c[1]+','+c[2]+')';
  }
  //}}}

  var COLORS=
  [
    [[71,183,230],[181,226,245]],
    [[43,171,51]],
    //[[115,194,255]],
    //[[163,36,36]],
    //[[64,128,64]],
    [[250, 27, 228]],
    //[[31, 210, 255]],
    [[29, 189, 207]],
    [[191, 82, 255]],
    [[174, 82, 255]],
    [[223,45,0]],
    [[237,85,85]] //trailing coma treated as fatal error for google closure
  ]; 

  if(gray)
    COLORS = [[[100,100,100]]];

  var candidates = COLORS.slice(); //one-level deep copy

  function getOne()
  {
    var color1;
    var color2;
    if(candidates.length===0)
      color1 = COLORS[0][0];
    else
    {
      var i=Math.floor(Math.random()*candidates.length);
      //i=3;
      color1 = candidates[i][0];
      color2 = candidates[i][1];
      candidates.splice(i,1);
    }

    if(!color2)
      color2 = undim(color1);

    return [to_str(color1),to_str(color2)];
  }

  if(!n)
    return getOne();
  else
  {
    var ret = [];
    while(n--)
      ret.push(getOne());
    return ret;
  }
}
//}}}

ml.getUrlVars=function(){ 
    // Read a page's GET URL variables and return them as an associative array.
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        //vars[hash[0]] = hash[1];
        // use of decodeURIComponent: http://stackoverflow.com/questions/747641/what-is-the-difference-between-decodeuricomponent-and-decodeuri
        vars[hash[0]] = window['decodeURIComponent'](hash[1]);
    }
    return vars;
}; 

ml.deleteCookies=function()
//{{{
{
  var c=document.cookie.split(";");
  for(var i=0;i<c.length;i++)
  {
    var e=c[i].indexOf("=");
    var n=e>-1?c[i].substr(0,e):c[i];
    document.cookie=n+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};
//}}}

//offline stuff
ml.loadASAP=function(url,onsuccess){ 
  var isCSS = /\.css$/.test(url);
  var tagName = isCSS?'link':'script';
  var srcName = isCSS?'href':'src';
  var head = document.getElementsByTagName('head')[0];

  var alreadyLoading = head.getElementsByTagName(tagName);
  for(var i in alreadyLoading) if(alreadyLoading[i][srcName]===url){
    if(onsuccess){
      if(alreadyLoading[i].loadListeners) alreadyLoading[i].loadListeners.push(onsuccess);
      //!alreadyLoading[i].loadListeners ~= not loaded with loadASAP ~= synchronously loaded => already loaded
      if(alreadyLoading[i].loaded || !alreadyLoading[i].loadListeners) onsuccess();
    }
    return;
  }
   
  var attempts = 0;
  function do_(){
    //using same loader el => onerror doesn't get called again in chrome
    var loader= document.createElement(tagName);
        loader[srcName]= url;
        loader['type'] = 'text/'+(isCSS?'css':'javascript');
        if(isCSS) loader['rel'] = 'stylesheet';
        loader.onerror = function(){
          head.removeChild(loader);
          setTimeout(do_,Math.min(Math.pow(2,attempts)*1000,60000));
        };
        //proxy redirects url => onload called but code not loaded
        //-no way founded to catch this
        loader.loadListeners = [];
        loader.onload = function(){
          loader.loaded=true;
          loader.loadListeners.forEach(function(l){l()});
          if(onsuccess) onsuccess();
        };
    attempts++;
    head.appendChild(loader);
  }
  do_();
  /* old code --  use loadASAP instead
  ml.loadScript=function(url,onload)
  //{{{
  {
    var script= document.createElement('script');
    script.src= url;
    if(onload) script.onload = onload;
    //script.type= 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
  };
  //}}}
  ml.loadCss=function(url)
  //{{{
  {
    var link=document.createElement("link")
    link.setAttribute("rel", "stylesheet")
    link.setAttribute("type", "text/css")
    link.setAttribute("href", url)
    document.getElementsByTagName('head')[0].appendChild(link);
  };
  //}}}
  */
}; 
(function(){
  var cssS={};
  ml.addCss=function(content,useCache)
  //{{{
  {
    if(!useCache || !cssS[content])
    {
      var fileref=document.createElement("style");
      fileref.appendChild(document.createTextNode(content));
      fileref.setAttribute("type", "text/css");
      document.getElementsByTagName("head")[0].appendChild(fileref);
      if(useCache) cssS[content]=true;
    }
  };
  //}}}
})();

(function(){
  var browser=null;
  ml.browser=function(){ 
    if(!browser)
    {
      browser={};

      var vendor   = window.navigator.vendor   || "";
      var platform = window.navigator.platform || "";
      var UA       = window.navigator.userAgent.toLowerCase() || "";

      if(UA.indexOf('googlebot')>-1 || UA.indexOf('msnbot')>-1 || UA.indexOf('slurp')>-1)
        browser.isBot=true;
      else if(UA.indexOf("webkit")>-1) //applewebkit instead of webkit?
        browser.usesWebkit=true;
      else if(UA.indexOf('gecko')>-1)
        browser.usesGecko=true;

      if(!/\bchrome\b/.test(UA) && /safari/.test(UA))
        browser.isSafari=true;

      if(/Win/.test(platform))
        browser.isWindows=true;
      else if(/Mac/.test(platform))
        browser.isMac=true;

      if(window['opera']) browser.isOpera=true;

      /* todel
      //typeof window === "undefined" => metro background task
      var vendor   = typeof window !== "undefined" && window.navigator.vendor   || "";
      var platform = typeof window !== "undefined" && window.navigator.platform || "";
      var UA       = typeof window !== "undefined" && window.navigator.userAgent.toLowerCase() || "";

      if(UA.indexOf('googlebot')>-1 || UA.indexOf('msnbot')>-1 || UA.indexOf('slurp')>-1)
        browser.isBot=true;
      else if(UA.indexOf("webkit")>-1) //applewebkit instead of webkit?
        browser.usesWebkit=true;
      else if(UA.indexOf('gecko')>-1)
        browser.usesGecko=true;

      if(!/\bchrome\b/.test(UA) && /safari/.test(UA))
        browser.isSafari=true;

      if(platform === "" || /Win/.test(platform))
        browser.isWindows=true;
      else if(/Mac/.test(platform))
        browser.isMac=true;

      if(typeof window !== "undefined" && window['opera']) browser.isOpera=true;
      */
    }
    return browser;
  //ml.browser={};
  //(function(){ 
  //  var vendor = navigator.vendor || "";
  //  var UA = navigator.userAgent.toLowerCase();
  //
  //  if(UA.indexOf('googlebot')>-1 || UA.indexOf('msnbot')>-1 || UA.indexOf('slurp')>-1)
  //    ml.browser.isBot=true;
  //  else if(UA.indexOf("webkit")>-1) //applewebkit instead of webkit?
  //    ml.browser.usesWebkit=true;
  //  else if(UA.indexOf('gecko')>-1)
  //    ml.browser.usesGecko=true;
  //})(); 
  //(function(){ 
  //  var vendor = navigator.vendor || "";
  //  var UA = navigator.userAgent.toLowerCase();

  //  if(UA.has('googlebot') || UA.has('msnbot') || UA.has('slurp'))
  //    ml.browser.isBot=true;
  //  else if(window.opera !==undefined)
  //    ml.browser.name='opera';
  //  else if(UA.has("webkit")) //applewebkit instead of webkit?
  //  {
  //    ml.browser.usesWebkit=true;
  //    if(UA.has("chrome"))
  //      ml.browser.name='chrome';
  //    else if(vendor.has("Apple Computer, Inc."))
  //      window.safari=true;
  //  }
  //  else if(UA.has('gecko'))
  //  {
  //    ml.browser.usesGecko=true;
  //    //ml.browser.geckoVersion=;
  //    if(UA.has("firefox"))
  //      ml.browser.name='firefox';
  //    else if(UA.has("iceweasel"))
  //      ml.browser.name='iceweasel';
  //  }
  //})(); 
  }; 
})();

ml.escapeHTML=function(html)
//{{{
{
  //Shortest way to escape HTML (even works in non-HTML documents!): new Option(html).innerHTML
  //alternativly create a text node
  return html.replace(/((<)|(>)|(&))/g,function(matchStr,p1,p2,p3,p4){if(p2) return '&lt;'; if(p3) return '&gt;'; if(p4) return '&amp;'});
};
//}}}

//DOM stuff
ml.setLoader=function(canvas,color)
//{{{
{
  ml.assert(canvas && canvas.getContext('2d'));

  var h=parseInt(ml.element.getStyle(canvas,'height'),10) || parseInt(canvas.style.height,10) || canvas.height;
  var w=parseInt(ml.element.getStyle(canvas,'width' ),10) || parseInt(canvas.style.width ,10) || canvas.width ;
  ml.assert(w && h && w===h,'! width===height');
  canvas.height=h;
  canvas.width=w;
  
  var ctx = canvas.getContext('2d');

  var lingrad=ctx.createLinearGradient(0,0,w,h);
  lingrad.addColorStop(0, color?color:'#888');
  lingrad.addColorStop(1, color?color:'#555');
  ctx.strokeStyle = lingrad;

  var lineWidth=w/8;
  ctx.lineWidth=lineWidth;

  function draw(delta)
  {
    ctx.clearRect(0,0,w,h);
    ctx.beginPath();
    delta = delta/(Math.PI*6);
    var begin = 0-Math.PI/4;
    var end   = Math.PI/2;
    ctx.arc(w/2,h/2,w/2-lineWidth/2,begin+delta,end+delta,false);
    ctx.stroke();
  }

  var delta=0;
  function frame()
  {
    draw(delta++)
    setTimeout(frame,10);
  }
  frame();
};
//}}}
ml.getEventSource=function(ev)
//{{{
{
  var ret=null;

  if(ev.target)
    ret=ev.target;
  else if(ev.srcElement)
    ret=ev.srcElement;

  if(ret.nodeType==3)
    ret=ret.parentNode;

  return ret;
};
//}}}
ml.isChildOf=function(child,parent_)
//{{{
{
  ml.assert(child.parentElement!==undefined);
  do{if(child===parent_)return true}while(child=child.parentElement)
  return false;
};
//}}}
ml.getChar=function(event)
//{{{
{
  if(event.type === 'keypress')
  //{{{
  {
    //charCode seem to correspond to ascii -- http://www.asciitable.com/
    var map=
    {
      10 :'enter', //ctrl+enter
      13 :'enter',

      32 :' '    ,
      37 :'left' , 
      38 :'up'   , 
      39 :'right', 
      40 :'down' , 
      43 :'+'    ,
      45 :'-'    ,
      47 :'/'    ,

      48 :'0'    ,
      49 :'1'    ,
      50 :'2'    ,
      51 :'3'    ,
      52 :'4'    ,
      53 :'5'    ,
      54 :'6'    ,
      55 :'7'    ,
      56 :'8'    ,
      57 :'9'    ,

      63 :'?'    ,

      65 :'A'    ,
      66 :'B'    ,
      67 :'C'    ,
      68 :'D'    ,
      69 :'E'    ,
      70 :'F'    ,
      71 :'G'    ,
      72 :'H'    ,
      73 :'I'    ,
      74 :'J'    ,
      75 :'K'    ,
      76 :'L'    ,
      77 :'M'    ,
      78 :'N'    ,
      79 :'O'    ,
      80 :'P'    ,
      81 :'Q'    ,
      82 :'R'    ,
      83 :'S'    ,
      84 :'T'    ,
      85 :'U'    ,
      86 :'V'    ,
      87 :'W'    ,
      88 :'X'    ,
      89 :'Y'    ,
      90 :'Z'    ,

      97 :'a'    ,
      98 :'b'    ,
      99 :'c'    ,
      100:'d'    ,
      101:'e'    ,
      102:'f'    ,
      103:'g'    ,
      104:'h'    ,
      105:'i'    ,
      106:'j'    ,
      107:'k'    ,
      108:'l'    ,
      109:'m'    ,
      110:'n'    ,
      111:'o'    ,
      112:'p'    ,
      113:'q'    ,
      114:'r'    ,
      115:'s'    ,
      116:'t'    ,
      117:'u'    ,
      118:'v'    ,
      119:'w'    ,
      120:'x'    ,
      121:'y'    ,
      122:'z'    ,


      666:'comma dummy'
    };
    if(event.mlKeyCode) return map[event.mlKeyCode];
    if(event.charCode===0)
    {
      //firefox sets charCode===0 && keyCode===13 on enter press
      //ml.assert(event.keyCode,event); uncomment this since windows keypress triggers an event with keyCode===0 && charCode===0
      return map[event.keyCode];
    }
    ml.assert(event.charCode);
    return map[event.charCode];
  }
  //}}}
  else if(event.type === 'keydown' || event.type === 'keyup' || event.type === 'change')
  //{{{
  {
    //http://www.foreui.com/articles/Key_Code_Table.htm
    //keyCode seem to correspond to http://www.mediaevent.de/javascript/Extras-Javascript-Keycodes.html
    var map=
    {
      13 :'enter',
      27 :'esc'  , 
      32 :' '    , 
      37 :'left' , 
      38 :'up'   , 
      39 :'right', 
      40 :'down' , 

      48 :'0'    ,
      49 :'1'    ,
      50 :'2'    ,
      51 :'3'    ,
      52 :'4'    ,
      53 :'5'    ,
      54 :'6'    ,
      55 :'7'    ,
      56 :'8'    ,
      57 :'9'    ,

      65 :'a'    ,
      66 :'b'    ,
      67 :'c'    ,
      68 :'d'    ,
      69 :'e'    ,
      70 :'f'    ,
      71 :'g'    ,
      72 :'h'    ,
      73 :'i'    ,
      74 :'j'    ,
      75 :'k'    ,
      76 :'l'    ,
      77 :'m'    ,
      78 :'n'    ,
      79 :'o'    ,
      80 :'p'    ,
      81 :'q'    ,
      82 :'r'    ,
      83 :'s'    ,
      84 :'t'    ,
      85 :'u'    ,
      86 :'v'    ,
      87 :'w'    ,
      88 :'x'    ,
      89 :'y'    ,
      90 :'z'    ,

      //numpad numbers
      96 :'0'    ,
      97 :'1'    ,
      98 :'2'    ,
      99 :'3'    ,
      100:'4'    ,
      101:'5'    ,
      102:'6'    ,
      103:'7'    ,
      104:'8'    ,
      105:'9'    ,

      187:'+'    ,
      189:'-'    ,

      666:'comma dummy'
    };
    if(event.mlKeyCode) return map[event.mlKeyCode];
    return map[event.keyCode];
  }
  //}}}
  else ml.assert(false);
};
//}}}
ml.reqFrame=(function(){ 
  function f(fct){fct()}
  if(typeof window === "undefined") return f;
  var lastReq={};
  var req    =       window['requestAnimationFrame'] ||       window['webkitRequestAnimationFrame'] ||       window['mozRequestAnimationFrame'] ||       window['msRequestAnimationFrame'];
  var cancel = window['cancelRequestAnimationFrame'] || window['webkitCancelRequestAnimationFrame'] || window['mozCancelRequestAnimationFrame'] || window['msCancelRequestAnimationFrame'];
//if(!req || !cancel) return function(fct){fct()};
  if(!req || !cancel) return f;
  return function(fct)
  {
    //lastReq[fct]===lastReq[fct.toString()]
    if(lastReq[fct]) cancel(lastReq[fct]);
    //cpu
    lastReq[fct]=req(fct);
  };
})(); 
ml.safe_call=safe_call;
function safe_call(fct){ 
  if(!fct) return;
  if(fct.constructor===Array)
  {
    if(fct.filter) fct=fct.filter(function(f){return !!f});//V8 bugfix
    for(var i=0;i<fct.length;i++)
    {
      var args = Array().slice.call(arguments);
      Array().splice.call(args,0,1,fct[i]);
      safe_call.apply(null,args);
    }
    return;
  }
  if(window.location.hostname==='localhost')
    return fct.apply(null,Array().slice.call(arguments,1));
  else try{
    return fct.apply(null,Array().slice.call(arguments,1));
  }catch(e){ml.assert(false,e,1)}
}; 

//features
ml.asyncStore=(function(){ 
  var ret = {};
//var CS = window['chrome']&&window['chrome']['storage']&&window['chrome']['storage']['sync'];
  var CS = window['chrome']&&window['chrome']['storage']&&window['chrome']['storage']['local'];
  if(CS){
    ret.set   = function(key,val){
      ml.assert(key.constructor===String&&(val===undefined||val.constructor===String));
      var o={};
      o[key]=val;
      CS['set'](o);
    };
    ret.get   = function(key,callback){ml.assert(key.constructor===String&&callback);CS['get'](key,function(o){callback(o[key])})};
    ret.clear = function(callback){CS['clear'](function(){if(callback) callback()})};
    window['chrome']&&window['chrome']['storage']['onChanged']['addListener'](function(changes){onChange(Object.keys(changes))});
  }
  else if(window['localStorage']){
    ret.set   = function(key,val){
      ml.assert(key.constructor===String&&(val===undefined||val.constructor===String));
      if(val) window['localStorage'][key]=val;
      else delete window['localStorage'][key];
    };
    ret.get   = function(key,callback){ml.assert(key.constructor===String&&callback);callback(window['localStorage'][key])};
    ret.clear = function(callback){window['localStorage']['clear']();if(callback) callback()};
    window.addEventListener('storage',function(ev){onChange([ev['key']])});
  }
  if(!ret.get) ml.assert(false);
  var onChange;
  (function(){
    var changeListeners=[];
    ret.addChangeListener=function(listener){changeListeners.push(listener)};
    onChange=function(changedKeys){
      changeListeners.forEach(function(listener){listener(changedKeys)});
    };
  })();
  return ret;
})(); 
ml.getPersistedObject=function(key,callback)
//{{{
//put won't actualize other variables with same key -> use only one variable for each key
{
  function retrieve(callback){
    ml.asyncStore.get(key,function(val){
      callback(JSON.parse(val||"{}"));
    });
  }

  retrieve(function(ret){
    ml.assert(ret.constructor===Object);
    //google closure trick works:
    //-http://closure-compiler.appspot.com/home
    //-var o={};Object.defineProperty(o,Object.keys({puthe:true})[0],{value:'hey'});alert(o.puthe);
    Object.defineProperty(ret,Object.keys({put:true}),{value:function(){ml.asyncStore.set(key,JSON.stringify(ret))}});
    (function(){
      var changeListeners=[];
      Object.defineProperty(ret,Object.keys({addChangeListener :true}),{value:function(listener){changeListeners.push(listener)}});
      var timeout;
      var changedKeys=[];
      ml.asyncStore.addChangeListener(function(newChangedKeys){
        ml.assert(newChangedKeys);
        changedKeys=changedKeys.concat(newChangedKeys);
        clearTimeout(timeout);
        timeout=setTimeout(function(){
          if(changedKeys.indexOf(key)>-1) retrieve(function(newRet){
            for(var i in ret) if(newRet[i]===undefined) delete ret[i];
            for(var i in newRet) ret[i]=newRet[i];
            ml.safe_call(changeListeners.forEach(function(listener){ml.safe_call(listener)}));
          });
          changedKeys=[];
        },300);//known issue: buggy if changes between tabs happens inbetween these 300ms
      });
    })();
    callback(ret);
  });

   // function moveWithReferences(newObj,obj) {
   // //doesn't keep Array references
   //   ml.assert(obj instanceof Object && newObj instanceof Object);
   //   for(var i in obj) if(newObj[i]===undefined) delete obj[i];
   //   for(var i in newObj)
   //   {
   //     if(!(obj[i] instanceof Array) && !(newObj[i] instanceof Array) &&
   //          obj[i] instanceof Object &&   newObj[i] instanceof Object) moveWithReferences(newObj[i],obj[i]);
   //     else obj[i]=newObj[i];
   //   }
   // }
};
//}}}
ml.optionInput=function(id,default_,listener,opts){ 
  //opts: possibleValues,keyUpDelay,noFirstListenerCall,storageObject
  ml.assert(default_!==undefined&&id!==undefined&&listener!==undefined);
  if(!opts) opts={};
  var isListInput,
      isBinaryInput,
      isColorInput,
      isTextInput;
  if(opts.possibleValues)
    isListInput=true;
  else if(default_===true||default_===false)
    isBinaryInput =true;
  else if(default_.constructor===String&&default_[0]==='#')
    isColorInput  =true;
  else if(default_.constructor===String)
    isTextInput   =true;
  else ml.assert(false);

  var el = document.getElementById(id)||document.createElement(isListInput?'select':'input');
  el.id=id;
  if(isTextInput)   el.type='text';
  if(isColorInput)  el.type='color';
  if(isBinaryInput) el.type='checkbox';
//if(opts.placeholder) el.setAttribute("placeholder",opts.placeholder);
  el.setAttribute("tabindex",'-1');
  var lastTimeout;
  ['change','keyup'].forEach(function(evName){el.addEventListener(evName,function(){
    window.clearTimeout(lastTimeout);
    lastTimeout=window.setTimeout(function()
    {
      var newVal = isBinaryInput?(el['checked']?"true":""):el['value'];
      ml.asyncStore.get(id,function(oldVal){
        if(oldVal!==newVal) {
          ml.asyncStore.set(id,newVal);
          if(listener) listener(isBinaryInput?!!newVal:newVal);
        }
      });
    },isTextInput?500:0);
  },false)});

  ml.asyncStore.get(id,function(val){
    //var val = window.localStorage.getItem(id)!==null?window.localStorage[id]:default_;//opera's hasOwnProperty allways return true
    if(!val) val = default_;
    if(isBinaryInput) val=!!val;
  //if(el.nodeName==='SELECT' && el.childNodes.length===0) el.innerHTML='<option>'+val+'</option>';
    el[isBinaryInput?'checked':'value']=val;
  //if(listener && !noFirstListenerCall) listener(val);
    listener(val);
  });

  return el;
}; 

ml.htmlBackgroundListener=function(default_){ 
//tricky bg images to test:
//-http://static.panoramio.com/photos/original/3719338.jpg
//-cover test: http://cdn.techpp.com/wp-content/uploads/2008/10/gmail_logo.jpg
//black floor: http://img.wallpaperstock.net:81/black-floor-wallpapers_6854_1680x1050.jpg
//http://lh6.googleusercontent.com/-AAQe-KJXX-w/TcRrpukjk6I/AAAAAAAACwE/-7gmjOI-ctQ/IMG_2649mod.jpg
//http://www.a-better-tomorrow.com/blog/wp-content/wallpaper_abt1.jpg
//http://www.gowallpaper.net/wp-content/uploads/2011/04/Windows-7-3d-wide-wallpaper-1280x800.jpg
//http://vistawallpapers.files.wordpress.com/2007/03/vista-wallpapers-69.jpg
  //TODO: replace with http://i.imgur.com/cvyOo.gif
  var LOAD_IMG_URL = 'http://i.imgur.com/zqG5F.gif';

  var BG_EL=document.documentElement;
  var LOAD_IMG = 'url('+LOAD_IMG_URL+')';

  //following 2 styles used for auto sized background for loading gif
  BG_EL.style['backgroundRepeat'] = 'no-repeat';
  BG_EL.style['backgroundPosition'] = 'center';
  //fixed because no way found to set BG_EL's size to scroll size of window
  //-http://stackoverflow.com/questions/7540418/css-setting-an-elements-size-to-the-scroll-size-of-the-page
  BG_EL.style['backgroundAttachment'] = 'fixed';
  //make sure size is at least size of window
  BG_EL.style['min-height']='100%';
  BG_EL.style['min-width']='100%';
  if(ml.metro){
    document.body.style['background']='transparent';
    document.body.style['backgroundColor']='transparent';
  }

  var setBg;
  (function(){
  //{{{
    var color;
    var img;
    function setCss()
    {
      BG_EL.style.backgroundColor=color; //style.background='' => Opera discareds fixed and cover style
      BG_EL.style.backgroundImage=img;
      BG_EL.style['backgroundSize'] = img===LOAD_IMG?'auto':'cover';
    }

    setBg=function(newUrl)
    {
      //to test: resize image to screen.width and screen.height using canvas and webworkers
      //window.screen.width;
      //window.screen.height;
      if(newUrl.indexOf('.')!==-1 || /^data:image/.test(newUrl))
      {
        var imgEl=document.createElement('img');
        var loaded;
        imgEl.onload=function() {
          var w=this.width;
          var h=this.height;
          if(w*h>4000000) alert('The provided image has a size of '+w+'*'+h+' pixels. Large images are likely to slow down your machine. Thus only images of maximal 4 000 000 pixels -- e.g. 2500*1600 pixels -- are allowed.');
          else if(img==='url("'+newUrl+'")') setCss();
          loaded=true;
        };
        imgEl.onerror=function()
        {
          if(img===LOAD_IMG && img==='url("'+newUrl+'")')
          {
            img='none';
            setCss();
          }
        };
        window.setTimeout(function()
        {
          if(!loaded && img==='url("'+newUrl+'")')
          {
            color='';
            img=LOAD_IMG;
            setCss();
            color='';
            img='url("'+newUrl+'")';
          }
        },50);
        color='';
        img='url("'+newUrl+'")';
        imgEl.src=newUrl;
      }
      else
      {
        if(newUrl==='')
        {
          color='';
          img='none';
        }
        else if(newUrl.indexOf('gradient')!==-1)
        {
          color='';
          img=newUrl;
        }
        else
        {
          color=newUrl;
          img='none';
        }
        setCss();
      }
    }
  //}}}
  })();

  return setBg;

  //// not needed when backgroundAttachment == fixed
  //BG_EL.style['minHeight']            = '100%';
  //BG_EL.style['minWidth ']            = '100%';

/*
ml.htmlBackground=function(inputName,default_)
//{{{
//tricky bg images to test:
//-http://static.panoramio.com/photos/original/3719338.jpg
//-cover test: http://cdn.techpp.com/wp-content/uploads/2008/10/gmail_logo.jpg
//black floor: http://img.wallpaperstock.net:81/black-floor-wallpapers_6854_1680x1050.jpg
//http://lh6.googleusercontent.com/-AAQe-KJXX-w/TcRrpukjk6I/AAAAAAAACwE/-7gmjOI-ctQ/IMG_2649mod.jpg
//http://www.a-better-tomorrow.com/blog/wp-content/wallpaper_abt1.jpg
//http://www.gowallpaper.net/wp-content/uploads/2011/04/Windows-7-3d-wide-wallpaper-1280x800.jpg
//http://vistawallpapers.files.wordpress.com/2007/03/vista-wallpapers-69.jpg
{
  //TODO: replace with http://i.imgur.com/cvyOo.gif
  var LOAD_IMG_URL = 'http://i.imgur.com/zqG5F.gif';

  var BG_EL=document.documentElement;
  var LOAD_IMG = 'url('+LOAD_IMG_URL+')';

  //following 2 styles used for auto sized background for loading gif
  BG_EL.style['backgroundRepeat'] = 'no-repeat';
  BG_EL.style['backgroundPosition'] = 'center';
  //fixed because no way found to set BG_EL's size to scroll size of window
  //-http://stackoverflow.com/questions/7540418/css-setting-an-elements-size-to-the-scroll-size-of-the-page
  BG_EL.style['backgroundAttachment'] = 'fixed';
  //make sure size is at least size of window
  BG_EL.style['min-height']='100%';
  BG_EL.style['min-width']='100%';
  if(ml.metro){
    document.body.style['background']='transparent';
    document.body.style['backgroundColor']='transparent';
  }

  var setBg;
  (function(){
  //{{{
    var color;
    var img;
    function setCss()
    {
      BG_EL.style.backgroundColor=color; //style.background='' => Opera discareds fixed and cover style
      BG_EL.style.backgroundImage=img;
      BG_EL.style['backgroundSize'] = img===LOAD_IMG?'auto':'cover';
    }

    setBg=function(newUrl)
    {
      //to test: resize image to screen.width and screen.height using canvas and webworkers
      //window.screen.width;
      //window.screen.height;
      if(newUrl.indexOf('.')!==-1 || /^data:image/.test(newUrl))
      {
        var imgEl=document.createElement('img');
        var loaded;
        imgEl.onload=function() {
          var w=this.width;
          var h=this.height;
          if(w*h>4000000) alert('The provided image has a size of '+w+'*'+h+' pixels. Large images are likely to slow down your machine. Thus only images of maximal 4 000 000 pixels -- e.g. 2500*1600 pixels -- are allowed.');
          else if(img==='url("'+newUrl+'")') setCss();
          loaded=true;
        };
        imgEl.onerror=function()
        {
          if(img===LOAD_IMG && img==='url("'+newUrl+'")')
          {
            img='none';
            setCss();
          }
        };
        window.setTimeout(function()
        {
          if(!loaded && img==='url("'+newUrl+'")')
          {
            color='';
            img=LOAD_IMG;
            setCss();
            color='';
            img='url("'+newUrl+'")';
          }
        },50);
        color='';
        img='url("'+newUrl+'")';
        imgEl.src=newUrl;
      }
      else
      {
        if(newUrl==='')
        {
          color='';
          img='none';
        }
        else if(newUrl.indexOf('gradient')!==-1)
        {
          color='';
          img=newUrl;
        }
        else
        {
          color=newUrl;
          img='none';
        }
        setCss();
      }
    }
  //}}}
  })();

  ml.optionInput(inputName,default_||'',setBg);
  return setBg;

  //// not needed when backgroundAttachment == fixed
  //BG_EL.style['minHeight']            = '100%';
  //BG_EL.style['minWidth ']            = '100%';
};
//}}}
*/
}; 

ml.zoomToElement=function(el,unzoom,opts){ 
  //TODO
  //-listen change to: element size change + window size change
  // -just add resize listener and onDiffChange listener
  //-listen to counter changing position (happens when using arrow keys to change countdown)
  //-fallback in case no transition&transform
  opts=opts||{};
  var TRANSITION_DURATION = 600;

  //set transition + determine right css prefix
  var cssPrefix=(function(){ 
    var prefixes=['-webkit-','-moz-','-ms-','-o-',''];
    //in firefox: document.createElement('div').style['-moz-transition']!==document.createElement('div').style['MozTransition'];
    var omPrefixes=['WebkitT','MozT','msT','OT','t'];//reference: modernizr

    //test if browser support required features
    var rightPre;
    for(var i=0;i<omPrefixes.length;i++)
    {
      var pre=omPrefixes[i];
      if(document.documentElement.style[pre+'ransition']!==undefined && document.documentElement.style[pre+'ransform']!==undefined) {
        document.documentElement.style[pre+'ransition']=opts.noTransition?'none':(prefixes[i]+'transform '+(TRANSITION_DURATION/1000)+'s ease-in-out');
        if(document.documentElement.style[pre+'ransition']) rightPre=pre;
      }
    }
    return rightPre;
  })(); 
  if(!cssPrefix) return false;

  function zoomIn(){ 
    function doZoomIn(){
      var data=(function(){ 
        var ret={};
        function boxSize(elem){ 
          function getI(prop){return parseInt(ml.element.getStyle(elem,prop),10)||0}
          var h=getI('height');
          var w=getI('width');
          //gecko's computed values ignores box-sizing:border-box
          var isBorderBox = !ml.browser().usesGecko && ['-webkit-','-moz-','-ms-','-o',''].reduce(function(p1,p2){return ml.element.getStyle(elem,p1+'box-sizing')||ml.element.getStyle(elem,p2+'box-sizing')})==='border-box';
          function getTotal(d){return d.map(function(di){
            return (isBorderBox?0:(getI('padding-'+di)+getI('border-'+di)))+getI('margin-'+di)
          }).reduce(function(i1,i2){return i1+i2}) }
          h+=getTotal(['top','bottom']);
          w+=getTotal(['left','right']);
          return {height:h,width:w};
        } 

        var sizes = boxSize(el);
        var elWidth   = sizes.width;
        var elHeight  = sizes.height;
        var botPad    = !opts.bottomElements?0:opts.bottomElements.map(function(elem){return boxSize(elem).height}).reduce(function(i1,i2){return i1+i2});
        var elPos     = ml.element.getPosition(el);

        //crop top padding
        var elPadTop  = parseInt(ml.element.getStyle(el,'padding-top'),10);
        elPos.y += elPadTop;
        elHeight-= elPadTop;

        //When zooming: innerHeight/parseInt(ml.element.getStyle(document.documentElement,'height')) === document.documentElement.style.zoom
        //var winWidth   = window.innerWidth;
        //var winHeight  = window.innerHeight;
        var winWidth   = parseInt(ml.element.getStyle(document.documentElement,'width' ));
        var winHeight  = parseInt(ml.element.getStyle(document.documentElement,'height'));
        var viewWidth  = elWidth;
        var viewHeight = elHeight+botPad;

        var ret={};
        ret.scale = Math.min(winHeight/viewHeight,winWidth/viewWidth,opts.maxScale||Infinity);
        ret.offset_to_middle = [winWidth-2*(elPos.x+viewWidth/2),winHeight-2*(elPos.y+viewHeight/2)];
        ret.scale_offset = ret.scale/2; //divide by 2 because scale crops top overflow

        return ret;
      })(); 
      document.documentElement.style[cssPrefix+'ransform']='translate('+data.scale_offset*data.offset_to_middle[0]+'px,'+data.scale_offset*data.offset_to_middle[1]+'px) scale('+data.scale+')';
    }

    if(el.fullscreenZoomed) {ml.assert(false);return;}
    el.fullscreenZoomed={};
    el.fullscreenZoomed.overflow_orginial=document.documentElement.style['overflow'];
    el.fullscreenZoomed.zoomFct=doZoomIn;
    window.addEventListener('resize',el.fullscreenZoomed.zoomFct);
    if(opts.posChangeListeners) opts.posChangeListeners.push(el.fullscreenZoomed.zoomFct);
    document.documentElement.style['overflow']='hidden';

    doZoomIn();
  } 
  function zoomOut(){ 
    if(!el.fullscreenZoomed) {ml.assert(false);return;}
    window.removeEventListener('resize',el.fullscreenZoomed.zoomFct);
    if(opts.posChangeListeners) opts.posChangeListeners.forEach(function(l){if(l===el.fullscreenZoomed.zoomFct) opts.posChangeListeners.splice(opts.posChangeListeners.indexOf(l),1)});
    var overflow_orginial = el.fullscreenZoomed.overflow_orginial;
    delete el.fullscreenZoomed;

    document.documentElement.style[cssPrefix+'ransform']='';
    //timeout makes transition of zoom counter smoother
    setTimeout(function(){document.documentElement.style['overflow']=overflow_orginial},TRANSITION_DURATION+100);
  } 
  unzoom?zoomOut():zoomIn();
}; 

ml.fullscreenElement=function(el,keybinding,zoomOpts)
//{{{
{
  var fullscreen_toggle;
  var hashListener;
  //{{{
  (function(){
    var FULLSCREEN_HASH = 'fullscreen';

    function isFullscreen(){return location.hash==='#'+FULLSCREEN_HASH}
    el.unfullscreen=function(){if(isFullscreen()) location.hash=''};

    /* too disruptive
    function dom_fullscreen_toggle()
    //{{{
    {
    // http://updates.html5rocks.com/2011/10/Let-Your-Content-Do-the-Talking-Fullscreen-API?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+html5rocks+%28HTML5Rocks%29&utm_content=Google+Reader
    // http://www.thecssninja.com/javascript/fullscreen
      if(isFullscreen())
      {
        if(document.documentElement['webkitRequestFullScreen']) document.documentElement['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']);
        if(document.documentElement['mozRequestFullScreen'])    document.documentElement['mozRequestFullScreen']();
      }
      else
      {
        if(document['webkitCancelFullScreen']) document['webkitCancelFullScreen']();
        if(document['mozCancelFullScreen'])    document['mozCancelFullScreen']();
      }
    }
    //}}}
    */

    fullscreen_toggle=function()
    //{{{
    {
      location.hash=isFullscreen()?'':FULLSCREEN_HASH;
    //dom_fullscreen_toggle();
    };
    //}}}

    (function(){
      var isFs;
      hashListener=function(){
        ml.reqFrame(function(){
          var shouldBeFs = isFullscreen();
        //if(shouldBeFs!=isFs) dom_fullscreen_toggle();
          zoomOpts.noTransition=isFs===undefined;
          //false!=undefined === true
          if((!!shouldBeFs)!==(!!isFs)) ml.zoomToElement(el,!shouldBeFs,zoomOpts);
          isFs=shouldBeFs;
        });
      }
    })();
  })();
  //}}}

  el.addEventListener('click',fullscreen_toggle,false);
  if(keybinding) window.addEventListener('keydown',function(ev)
  //{{{
  {
    ev = ev || window.event;
    if(ml.controlKeyPressed(ev)) return;
    var targetType = ml.getEventSource(ev).type;
    if(targetType==='text' || targetType==='url') return;
    if(ml.getChar(ev)===keybinding) fullscreen_toggle();
  },false);
  //}}}

  hashListener();
  ml.addHashListener(hashListener);
  window.addEventListener('resize',function() { setTimeout(hashListener,1); },false);
  return hashListener;
};
//}}}

(function(){
  var els={};
  ml.getElementByIdStatic=function(id)
  //{{{
  {
    if(!els[id]) els[id]=document.getElementById(id);
    return els[id];
  };
  //}}}
//window['$']=ml.getElementByIdStatic;
})();

ml.isTouchDevice=function(){ 
  //source: http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
  return !!('ontouchstart' in window);
}; 

ml.isExtensionBackground=function(){
  try{//try block seems to solve a bug of chrome 25
        return !!(window['chrome']&&window['chrome']['browserAction']&&window['chrome']['extension']&&window['chrome']['extension']['getBackgroundPage']&&window['chrome']['extension']['getBackgroundPage']()===window);
    }catch(e){return false}
};
ml.isPackagedApp=function(){
  try{//attempt to solve an unfound bug on old chrome versions
      return !!(window['chrome']&&window['chrome']['app']&&window['chrome']['app']['window']);
  }catch(e){return false}
};
ml.isPackagedBackground=function(){ 
  try{//attempt to solve an unfound bug on old chrome versions
      if(!window['chrome']||!window['chrome']['app']||!window['chrome']['app']['runtime'])
        return false;
      var hasWindow;
      try{hasWindow=chrome.app.window.current()}catch(e){}
      return !hasWindow;
  }catch(e){return false}
}; 
ml.isExtension=function(){ 
  try{//attempt to solve an unfound bug on old chrome versions
      return !!(window['chrome']&&window['chrome']['browserAction']&&window['chrome']['extension']);
  }catch(e){return false}
}; 

ml.addCloseEvent=function(listener){ 
  if(window['chrome']&&window['chrome']['runtime']&&window['chrome']['runtime']['onSuspend']
    && ml.isPackagedApp() //need for hosted app
  )
    window['chrome']['runtime']['onSuspend']['addListener'](listener);
  else{
    window.addEventListener("beforeunload",listener,false);
    window.addEventListener(      "unload",listener,false);
    window.addEventListener(    "pagehide",listener,false); //https://www.webkit.org/blog/516/webkit-page-cache-ii-the-unload-event/
  }
}; 

(function(){
  var listeners=[];
  ml.addResizeTimeoutEvent=function(listener,delay,preListener){ 
    if(listeners.indexOf(listener)!==-1)return;
    listeners.push(listener);
    var lastTimeout;
    window.addEventListener('resize',function(){
      if(preListener) preListener();
      window.clearTimeout(lastTimeout);
      lastTimeout=window.setTimeout(listener,delay);
    });
  }; 
})();

ml.replaceWebApp=function(newUrl) { 
  if(window.parent!==window) return false;
   document.body.innerHTML='';
   var iframe_=document.createElement('iframe');
   iframe_.src=newUrl;
   iframe_.setAttribute('frameborder','0');
   document.documentElement.style['overflow']=document.body.style['overflow']='hidden';
   document.documentElement.style['margin']  =document.body.style['margin']  ='0';
   document.documentElement.style['width']   =document.body.style['width']   =
   document.documentElement.style['height']  =document.body.style['height']  =
                    iframe_.style['height']  =      iframe_.style['width']   ='100%';
   document.body.appendChild(iframe_);
   return true;
}; 

ml.loadAnalytics=function(id,useSSL) { 
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', id]);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  //ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    ga.src = ('https:' == document.location.protocol || useSSL ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ga);
  })();

  window['_gaq']=_gaq;//added by me
}; 

ml.i18n={};
(function(){ 
  var lang;
  //__promo images:
  //lang='fr';
  function init(callback){ 
    setTimeout(function(){//attempt to solve an unfound bug on old chrome versions
        function fallback(){
          lang = window.navigator.userLanguage || window.navigator.language || null;
          callback();
        }
        try{
          if(window['chrome']&&window['chrome']['i18n']&&window['chrome']['i18n']['getAcceptLanguages'])
            window['chrome']['i18n']['getAcceptLanguages'](function(langs)
            {
              langs&&['en','de','fr'].some(function(l){if(langs.indexOf(l)>-1){
                lang=l;
                return true;
              }});
              if(lang===undefined) lang=null;
              callback();
            });
          else {
            fallback();
          }
        }catch(e){
        //ml.assert(false);
          fallback();
        }
    },0);
  } 
  ml.i18n.get=function(callback){
   if(lang===undefined) init(function(){callback(lang)});
   else callback(lang);
  };
  ml.i18n.isAMPMTime=function(callback){
    ml.i18n.get(function(lang){callback(lang!=='fr'&&lang!=='de')});
  };
})(); 

(function(){ 
  var winObj = typeof Windows !== "undefined" && Windows;
  if(!winObj) return;
  ml.metro={};
  var Noti = winObj['UI']['Notifications'];
  ml.metro.IS_BG_TASK = typeof window === "undefined";
  ml.metro.tile={};
  ml.metro.tile.createText=function(type,line1,line2,line3){ 
    ml.assert(type==='big' || type==='bigCenter');
    var wideTile;
    if(type==='big'){
      wideTile = Noti['TileUpdateManager']['getTemplateContent'](Noti['TileTemplateType']['tileWideText03']); 
    } else if(type==='bigCenter'){
      wideTile = Noti['TileUpdateManager']['getTemplateContent'](Noti['TileTemplateType']['tileWideSmallImageAndText01']); 
    }
    var text = wideTile.getElementsByTagName("text");
    text[0].appendChild(wideTile['createTextNode'](line1+"\n"+line2+"\n"+line3));

    var squareTile = Noti['TileUpdateManager']['getTemplateContent'](Noti['TileTemplateType']['tileSquareText02']);
    var text = squareTile.getElementsByTagName("text");
    text[0].appendChild(squareTile['createTextNode'](line1));
    text[1].appendChild(squareTile['createTextNode'](line2+"\n"+line3));
    //var squareTile = Noti['TileUpdateManager']['getTemplateContent'](Noti['TileTemplateType']['tileSquareImage']);
    //var tileAttributes = squareTile.getElementsByTagName("image");
    //tileAttributes[0].src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAMElEQVRYR+3QQREAAAgCQekfWm3BZ7kCzGb2Ky4OECBAgAABAgQIECBAgAABAm2BA4XeP+FCGziJAAAAAElFTkSuQmCC";

    var node = wideTile.importNode(squareTile.getElementsByTagName("binding").item(0), true);
    wideTile.getElementsByTagName("visual").item(0).appendChild(node);

    return wideTile;
  }; 
  ml.metro.tile.createImg=function(imageFile){ 
  //var template = Noti.TileTemplateType.tileSquareImage;
    var template = Noti.TileTemplateType.tileWideImage;
    var tileXml = Noti.TileUpdateManager.getTemplateContent(template);
    var tileImageAttributes = tileXml.getElementsByTagName("image");
    tileImageAttributes[0].setAttribute("src", imageFile);
    return tileXml;
  }; 
  ml.metro.tile.update=function(newTile,expire_,scheduled){ 
    ml.assert(newTile&&expire_&&expire_.constructor===Date&&(!scheduled||scheduled.constructor===Date));
    var tileNotification = scheduled&&(new Noti['ScheduledTileNotification'](newTile,scheduled)) || (new Noti['TileNotification'](newTile));
    tileNotification['expirationTime'] = expire_;
    Noti['TileUpdateManager']['createTileUpdaterForApplication']()[scheduled?'addToSchedule':'update'](tileNotification);
  }; 
  ml.metro.maintenanceTrigger=function(jsFile,freshnes){ 
    var builder = new winObj['ApplicationModel']['Background']['BackgroundTaskBuilder']();
    builder['name'] = "Maintenance background task";
    builder['taskEntryPoint'] = jsFile;
    //Run every `freshnes` minutes if the device is on AC power
    var trigger = new winObj['ApplicationModel']['Background']['MaintenanceTrigger'](freshnes, false);
    builder['setTrigger'](trigger);
    var task = builder['register']();
  }; 
  ml.metro.storage = winObj['Storage']['ApplicationData']['current']['localSettings']['values'];
  ml.metro.canvas2file=function(canvas,fileName,callback){ 
    //Save blob to image
    var blob = canvas.msToBlob();
    var out = null;
    var blobStream = null;
    var outputStream = null;

    winObj.Storage.ApplicationData.current.localFolder.createFileAsync(fileName, winObj.Storage.CreationCollisionOption.replaceExisting)
        .then(function (file) {
            return file.openAsync(winObj.Storage.FileAccessMode.readWrite);
        })
        .then(function (stream) {
            outputStream = stream;
            out = stream.getOutputStreamAt(0);
            blobStream = blob.msDetachStream();
            return winObj.Storage.Streams.RandomAccessStream.copyAsync(blobStream, out);
        })
        .then(function () {
            return out.flushAsync();
        })
        .done(function () {
            blobStream.close();
            out.close();
            outputStream.close();

            callback("ms-appdata:///local/"+fileName);
        });
  }; 
})(); 

(function(){
  var popup;
  ml.getPopupObject=function(closeFct)
  //{{{
  //style through #popup and #overlay -- functional style not needed
  {
    if(popup)
    {
      popup.setArgs(closeFct);
      return popup; //singelton design pattern
    }

    popup={};
    var popupEl;
    var overlay;
    var closeListenerAdded;
    var currWidth;
    var currHeight;
    var dimensionListener;
    var onclose;
    popup.close=function()
    //{{{
    {
      var ret=false;

      document.documentElement['classList'].remove('popup'); //take care of closure obstruficating classList prop

      if(popupEl)
        try {
          //document.body.removeChild(popupEl);
          document.documentElement.removeChild(popupEl);
          ret=true;
        }catch(e){};

      if(overlay)
        try {
          //document.body.removeChild(overlay);
          document.documentElement.removeChild(overlay);
        }catch(e){};

      popupEl=undefined;

      window.clearInterval(dimensionListener);
      dimensionListener=undefined;

      if(onclose)
      {
        onclose();
        onclose=undefined;
      }

      return ret; //popup actually closed?
    };
    //}}}
    if(!closeFct)
      closeFct = popup.close;
    function positionate()
    //{{{
    {
      if(popupEl)
      {
        //tmp stuff
        document.documentElement.removeChild(popupEl);
        document.documentElement.appendChild(popupEl);
        //document.body.removeChild(popupEl);
        //document.body.appendChild(popupEl);

        ml.assert(popupEl);

        //back to css values
        popupEl.style.top='';
        popupEl.style.bottom='';
        popupEl.style.marginLeft='';
        popupEl.style.width='';
        popupEl.style.left='';
        popupEl.style.overflowY='';

        //determine marginLeft
        var width=parseInt(ml.element.getStyle(popupEl,'width',true));
        popupEl.style.width=width+'px';
        popupEl.style.marginLeft=-width/2+'px';

        //determine top: 0 or totalHeightMarge/2 or 20%
        //var height=parseInt(ml.element.getStyle(popupEl,'box-height',true));
        var height=parseInt(ml.element.getStyle(popupEl,'height',true),10);
        var fixedTopMarge=parseInt(ml.element.getPosition(popupEl).y)-scrollY;
        var fixedBottomMarge=parseInt(innerHeight)-fixedTopMarge-height;
    //
        var totalHeightMarge=fixedTopMarge+fixedBottomMarge;
        if(totalHeightMarge<0)
        {
          popupEl.style.top='0';
          popupEl.style.display='absolute';
          //popupEl.addClass('absolute');
        }
        else if(fixedTopMarge>fixedBottomMarge)
        {
          popupEl.style.top='auto';
          popupEl.style.bottom=( parseInt(totalHeightMarge/2,10) - parseInt(ml.element.getStyle(popupEl,'margin-bottom',true)) )+'px';
        }

        ////why the fuck did i play around with overflowY? -- setting it on auto seems to work well, at least for inboxN
        //if(popupEl.scrollHeight>popupEl.clientHeight)
        //  popupEl.style.overflowY='scroll';

        ////gecko issue: wrong scrollHeight on parent element of the element causing the scroll
        //if(ml.browser().usesGecko && popupEl.firstChild && popupEl.firstChild.scrollHeight>popupEl.clientHeight)
        //  popupEl.style.overflowY='scroll';
        popupEl.style.overflowY='auto';

        popupEl.style.left='50%';
      }
    }
    //}}}
    popup.open=function(html,oncloseCurrying)
    //{{{
    {
      ml.assert(html && (html.constructor === String || html.constructor === HTMLDivElement));
      if(popupEl)
        popup.close();

      document.documentElement['classList'].add('popup'); //take care of closure obstruficating classList prop

      //close button
      //{{{
      var popupCloseContainer = document.createElement('div');
        popupCloseContainer.id              = 'popupClose';
        popupCloseContainer.style.width     = '100%';
        popupCloseContainer.style.textAlign = 'center';
        popupCloseContainer.style.clear     = 'both';
      var popupCloseEl        = document.createElement('div');
        popupCloseEl.style.display = 'inline-block';
        popupCloseEl.style.cursor  = 'pointer';

      //svg cross
      var svgns = 'http://www.w3.org/2000/svg'
      var svgEl = document.createElementNS(svgns, "svg");
      //{{{
      var h=24,w=h;
      svgEl.setAttributeNS(null,'width' ,w+'px');
      svgEl.setAttributeNS(null,'height',h+'px');
      svgEl.setAttributeNS(null,'style','inline-block;cursor: pointer');

      var shape = document.createElementNS(svgns, "line");
      shape.setAttributeNS(null,'x1',0);
      shape.setAttributeNS(null,'y1',0);
      shape.setAttributeNS(null,'x2',w);
      shape.setAttributeNS(null,'y2',h);
      shape.setAttributeNS(null,'stroke-width','2');
      shape.setAttributeNS(null,'style','inline-block;cursor: pointer');
      svgEl.appendChild(shape);

      var shape = document.createElementNS(svgns, "line");
      shape.setAttributeNS(null,'x1',w);
      shape.setAttributeNS(null,'y1',0);
      shape.setAttributeNS(null,'x2',0);
      shape.setAttributeNS(null,'y2',h);
      shape.setAttributeNS(null,'stroke-width','2');
      shape.setAttributeNS(null,'style','inline-block;cursor: pointer');
      svgEl.appendChild(shape);
      //}}}

      popupCloseEl.appendChild(svgEl);

      var text = document.createElement('div');
        //text.style.display       = 'inline-block';
        text.style.cursor        = 'pointer';
        text.style.lineHeight    = '5px';
        text.innerHTML = "<span style='font-size: 75%;cursor:pointer'>close</span><style>#popupClose svg{stroke: white}</style>"; //svg inline style allways win against external style
      popupCloseEl.appendChild(text);
      //}}}

      popupEl=document.createElement('div');
        popupEl.id='popup';
        popupEl.style.position='absolute';
        popupEl.style.zIndex='10001';
        if(html.constructor === String)
          popupEl.innerHTML=html;
        else
          popupEl.appendChild(html);
      popupCloseContainer.appendChild(popupCloseEl);
      //popupEl.appendChild(popupCloseEl);
      popupEl.appendChild(popupCloseContainer);

      popupEl.style.visibility='hidden';

      document.documentElement.appendChild(popupEl);
      //document.body.appendChild(popupEl);

      if(ml.element.getStyle(popupEl,'display')==='none')
      {
        popup.close();
        setTimeout(function fn()
        {
          fn(arguments[0],arguments[1],arguments[2],arguments[3]); //passing arguments does pass whole arguments object as first parameter
        },100);
        
        return false;
      }

      document.querySelector('#popupClose *').onclick=closeFct;

      positionate();

      popupEl.style.visibility='inherit';

      onclose = oncloseCurrying;

      overlay=document.createElement('div');
        overlay.id='overlay';
        overlay.style.position='fixed';
        overlay.style.height='100%';
        overlay.style.width='100%';
        overlay.style.top='0';
        overlay.style.left='0';
        overlay.style.zIndex=parseInt(popupEl.style.zIndex,10)-1;
        overlay.onclick=closeFct;
        //document.body.appendChild(overlay);
        document.documentElement.appendChild(overlay);

      var currWidth     = parseInt(ml.element.getStyle(popupEl,'width' ,true),10);
      var currHeight    = parseInt(ml.element.getStyle(popupEl,'height',true),10);
      ml.assert(!dimensionListener);
      dimensionListener = window.setInterval(function()
      {
        var newWidth  = parseInt(ml.element.getStyle(popupEl,'width' ,true),10);
        var newHeight = parseInt(ml.element.getStyle(popupEl,'height',true),10);
        if(newWidth != currWidth || newHeight != currHeight)
        {
          positionate();
          currWidth  = newWidth ;
          currHeight = newHeight;
        }
      },100);

      return true;
    };
    //}}}
    popup.setArgs = function(newCloseFct)
    //{{{
    {
      closeFct     = newCloseFct;
    };
    //}}}
    popup.refreshDOM = positionate;

    window.addEventListener('resize',positionate,false);

    return popup;
  };
  //}}}
})();

ml.noti={};
(function(){ 
  var _noti;
  function _init(){
    _noti=(function(){
      var ret=null;
      if(!ml.browser().usesGecko && window.webkitNotifications && window.webkitNotifications.checkPermission){ 
        //somehow webkitNotifications is defined in Firefox
        //http://www.chromium.org/developers/design-documents/desktop-notifications/api-specification
        //PERMISSION_ALLOWED (0) indicates that the user has granted permission to scripts with this origin to show notifications.
        //PERMISSION_NOT_ALLOWED (1) indicates that the user has not taken an action regarding notifications for scripts from this origin.
        //PERMISSION_DENIED (2) indicates that the user has explicitly blocked scripts with this origin from showing notifications.
        ret = {};
        ret.permission_notAllowed=function(){
          return window.webkitNotifications.checkPermission()!=0;
        };
        ret.permission_denied=function(){
          return window.webkitNotifications.checkPermission()==2;
        };
        var SETTINGS_URL = 'chrome://settings/contentExceptions#notifications';
        var APP_NAME = 'Timer Tab';
        //`window.open(settings_url);` doesn't work
        ml.noti.manualUnblockMsg='you have previously blocked notifications for '+APP_NAME+' \n\ngo to the address:\n'+SETTINGS_URL+'\nor manually go to:\n"Settings -> Show advanced settings... -> Privacy -> Content Settings -> Notifications -> Manage exceptions..."\nand remove '+window.location.origin+' from the blocked Sites';
        ret.permission_req=function(callback){
          window.webkitNotifications.requestPermission(function(){if(callback) callback()});
        };
        ret.fire        = function(text1,text2,icon,onshow,onclick){
          try{
            var __noti=window.webkitNotifications.createNotification(
              icon,
              text1,
              text2
            );
            __noti.ondisplay = onshow;
            __noti.onclick   = onclick;
            __noti.show();
            return function(){__noti.cancel()};
          }catch(e){}
        };
      } 
      else if(window.Notification && window.Notification.requestPermission){ 
        //http://jsfiddle.net/robnyman/TuJHx/
        //http://www.w3.org/TR/notifications/
        ret = {};
        ret.permission_notAllowed=function(){
          return window.Notification.permission!=="granted";
        };
        ret.permission_denied=function(){
          return window.Notification.permission==="denied";
        };
        ret.permission_req=function(callback){
          window.Notification.requestPermission(function(){if(callback) callback()});
        };
        ret.fire=function(text1,text2,icon,onshow,onclick){
          try{
            var __noti = new Notification(text1, {
              dir: "auto",
              lang: "",
              body: text2,
              iconUrl: icon
            });
            __noti.onshow  = onshow;
            __noti.onclick = onclick;
            return function(){__noti.close()};
          }catch(e){}
        };
      } 
      return ret;
    })();
  };
  ml.noti.isAvailable           = function(){if(!_noti) _init();return !!_noti};
  ml.noti.permission_notAllowed = function(){if(!_noti) _init();return !_noti || _noti.permission_notAllowed()};
  ml.noti.permission_denied     = function(){if(!_noti) _init();return !_noti || _noti.permission_denied    ()};
  ml.noti.permission_req        = function(callback){
    if(!_noti) _init();
    if(!_noti) return;
    if(_noti.permission_notAllowed()) _noti.permission_req(callback);
    else if(callback) callback();
  };
  ml.noti.fire                  = function(txt1,txt2,icon,displayTime,onclick){
    if(!_noti) _init();
    if(!_noti) return function(){};
    var _close=_noti.fire(txt1,txt2,icon,function(){setTimeout(_close,displayTime)},onclick);
    return _close;
  };
})(); 

/* unused code
{{{
//application cache
//TODO
//  -make little popup instead of blocking website
//  -fix bug: first time on website shouldn't notify downloading of cache
if(window.applicationCache && window.applicationCache.status!=0)
//{{{
//finally i don't want the user to notice downloading of new version even if that means the new version will appear only on the next refresh
//applicationCache.status===0 <~> uncached
//even by deleting all data in chrome's options status remains 2 in chrome. but is ==0 in private browsing mode
{
  var overlay;
  window.applicationCache.ondownloading=function(){
    overlay = document.createElement('div');
      overlay.style.position='fixed';
      overlay.style.top='0px';
      overlay.style.left='0px';
      overlay.style.background='white';
      overlay.style.width='100%';
      overlay.style.height='100%';
      overlay.style.textAlign='center';
      overlay.innerHTML='<div style="padding: 30px !important; margin: 0 !important;font-size: 15px !important; color: black !important;display:inline-block"><canvas id="appCacheLoader" style="width:16px;height:16px;display: inline-block;float:left;position:relative;top:1px;"></canvas>&nbsp;downloading new version</div>';
      overlay.style.zIndex='9999999999';
    document.body.appendChild(overlay);
    ml.setLoader(document.getElementById('appCacheLoader'));
  };
  window.applicationCache.onupdateready=function(){
    window.location='';
  };
  //shoudn't be needed
  window.applicationCache.oncached=function(){
    window.location='';
  };
  window.applicationCache.oncached=function(){
    window.location='';
  };
  window.applicationCache.onerror=function()
  {
    if(overlay) document.body.removeChild(overlay);
  };
}
//}}}

ml.arePermutations=function(list1,list2)
//{{{
{
  list1 = list1.slice();//one-level deep copy
  list2 = list2.slice();//one-level deep copy
  if(list1.length!==list2.length)
    return false;
  list1.sort(function(a,b)
  {
    return a<b;
  });
  list2.sort(function(a,b)
  {
    return a<b;
  });
  for(var i=0;i<list1.length;i++)
    if(list1[i]!==list2[i])
      return false;
  return true;
};
//}}}

//sha-1
//{{{
(function()
{
  // 
  // A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
  // in FIPS PUB 180-1
  // Version 2.1a Copyright Paul Johnston 2000 - 2002.
  // Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
  // Distributed under the BSD License
  // See http://pajhome.org.uk/crypt/md5 for details.
  // 

  // 
  // Configurable variables. You may need to tweak these to be compatible with
  // the server-side, but the defaults work in most cases.
  // 
  var hexcase = 0;  // hex output format. 0 - lowercase; 1 - uppercase       
  var b64pad  = ""; // base-64 pad character. "=" for strict RFC compliance  
  var chrsz   = 8;  // bits per input character. 8 - ASCII; 16 - Unicode     

  // 
  // These are the functions you'll usually want to call
  // They take string arguments and return either hex or base-64 encoded strings
  // 
  function hex_sha1(s){return binb2hex(core_sha1(str2binb(s),s.length * chrsz));}
  function b64_sha1(s){return binb2b64(core_sha1(str2binb(s),s.length * chrsz));}
  function str_sha1(s){return binb2str(core_sha1(str2binb(s),s.length * chrsz));}
  function hex_hmac_sha1(key, data){ return binb2hex(core_hmac_sha1(key, data));}
  function b64_hmac_sha1(key, data){ return binb2b64(core_hmac_sha1(key, data));}
  function str_hmac_sha1(key, data){ return binb2str(core_hmac_sha1(key, data));}

  // 
  // Perform a simple self-test to see if the VM is working
  // 
  function sha1_vm_test()
  {
    return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
  }

  // 
  // Calculate the SHA-1 of an array of big-endian words, and a bit length
  // 
  function core_sha1(x, len)
  {
    // append padding
    x[len >> 5] |= 0x80 << (24 - len % 32);
    x[((len + 64 >> 9) << 4) + 15] = len;

    var w = Array(80);
    var a =  1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d =  271733878;
    var e = -1009589776;

    for(var i = 0; i < x.length; i += 16)
    {
      var olda = a;
      var oldb = b;
      var oldc = c;
      var oldd = d;
      var olde = e;

      for(var j = 0; j < 80; j++)
      {
        if(j < 16) w[j] = x[i + j];
        else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
        var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
                         safe_add(safe_add(e, w[j]), sha1_kt(j)));
        e = d;
        d = c;
        c = rol(b, 30);
        b = a;
        a = t;
      }

      a = safe_add(a, olda);
      b = safe_add(b, oldb);
      c = safe_add(c, oldc);
      d = safe_add(d, oldd);
      e = safe_add(e, olde);
    }
    return Array(a, b, c, d, e);

  }

  // 
  // Perform the appropriate triplet combination function for the current
  // iteration
  // 
  function sha1_ft(t, b, c, d)
  {
    if(t < 20) return (b & c) | ((~b) & d);
    if(t < 40) return b ^ c ^ d;
    if(t < 60) return (b & c) | (b & d) | (c & d);
    return b ^ c ^ d;
  }

  // 
  // Determine the appropriate additive constant for the current iteration
  // 
  function sha1_kt(t)
  {
    return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
           (t < 60) ? -1894007588 : -899497514;
  }

  // 
  // Calculate the HMAC-SHA1 of a key and some data
  // 
  function core_hmac_sha1(key, data)
  {
    var bkey = str2binb(key);
    if(bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);

    var ipad = Array(16), opad = Array(16);
    for(var i = 0; i < 16; i++)
    {
      ipad[i] = bkey[i] ^ 0x36363636;
      opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
    return core_sha1(opad.concat(hash), 512 + 160);
  }

  // 
  // Add integers, wrapping at 2^32. This uses 16-bit operations internally
  // to work around bugs in some JS interpreters.
  //
  function safe_add(x, y)
  {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  }

  // 
  // Bitwise rotate a 32-bit number to the left.
  // 
  function rol(num, cnt)
  {
    return (num << cnt) | (num >>> (32 - cnt));
  }

  // 
  // Convert an 8-bit or 16-bit string to an array of big-endian words
  // In 8-bit function, characters >255 have their hi-byte silently ignored.
  // 
  function str2binb(str)
  {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for(var i = 0; i < str.length * chrsz; i += chrsz)
      bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i%32);
    return bin;
  }

  // 
  // Convert an array of big-endian words to a string
  // 
  function binb2str(bin)
  {
    var str = "";
    var mask = (1 << chrsz) - 1;
    for(var i = 0; i < bin.length * 32; i += chrsz)
      str += String.fromCharCode((bin[i>>5] >>> (32 - chrsz - i%32)) & mask);
    return str;
  }

  // 
  // Convert an array of big-endian words to a hex string.
  // 
  function binb2hex(binarray)
  {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for(var i = 0; i < binarray.length * 4; i++)
    {
      str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
             hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
    }
    return str;
  }

  //
  // Convert an array of big-endian words to a base-64 string
  //
  function binb2b64(binarray)
  {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for(var i = 0; i < binarray.length * 4; i += 3)
    {
      var triplet = (((binarray[i   >> 2] >> 8 * (3 -  i   %4)) & 0xFF) << 16)
                  | (((binarray[i+1 >> 2] >> 8 * (3 - (i+1)%4)) & 0xFF) << 8 )
                  |  ((binarray[i+2 >> 2] >> 8 * (3 - (i+2)%4)) & 0xFF);
      for(var j = 0; j < 4; j++)
      {
        if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
        else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
      }
    }
    return str;
  }
})();
//}}}

ml.checkCookies=function(appName)
//{{{
{
  function areCookiesEnabled()
  {
    function createCookie(name, value, days)
    {
      var expires;
      if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = "; expires=" + date.toGMTString();
      }
      else expires = "";
      document.cookie = name + "=" + value + expires + "; path=/";
    }
    function readCookie(name)
    {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }

    function eraseCookie(name)
    {
      createCookie(name, "", -1);
    }

    var r = false;
    createCookie("testingcookies", "1", 1);
    if (readCookie("testingcookies") != null) {
        r = true;
        eraseCookie("testing");
    }
    return r;
  }

  if(areCookiesEnabled())
    return true;

  var str="<div style='padding: 30px'>";//;width: 100%;text-align:center'>";
  str+='your cookies seem to be disabled<br>enable them in order to use '+(appName?appName:'the webapp');
  str+="</div>";

  document.body.innerHTML=str;

  return false;
};
//}}}

if(location.hostname[location.hostname.length-1]==='.') location.hostname=location.hostname.substr(0,location.hostname.length-1);

// IE check
// {{{
// //TODO: this is temporary and not a solution for apps not supporting IE9 since the text does suggest that IE9 will do
// //IE8 returns exception on interpreting this file so catch IE8
// //transition check in order to catch IE8 -- quote: "if a browser supports a certain property, it won't return undefined for it. A supported CSS property returns empty string when its not yet set."
// //transition not supported on IE9
// var el = document.createElement('div');
// el.style['cssText']='background-color:rgba(150,255,150,.5)';
// //if( window.navigator.userAgent.indexOf('MSIE')!==-1 && document.body.style['transition']===undefined && location.href.indexOf('passtest')===-1)
// if( window.navigator.userAgent.indexOf('MSIE')!==-1 && el.style['backgroundColor'].indexOf('rgba')===-1 && location.href.indexOf('passtest')===-1)
//   {document.body.innerHTML="<style>*{font-size:20px !important;text-align:center}</style><div style='padding: 30px;'>You seem to use an old version of Internet Explorer.<br>Please upgrade to Internet Explorer 9.</div>";ml=undefined;return;}
// }}}

Element.prototype.text=function() //removes ranges
//{{{
//some selection behaviour:
//-adding range doesn't set focus when done through onsole, but seem to set focus otherwise
//-adding range while window selection already has a range -> nothing changes
{
  //don't use, kinda buggy
  ml.assert(false);

  var changeHandler = this.onchange;
  this.onchange=undefined;
  var focusHandler = this.onfocus;
  this.onfocus=undefined;
  var blurHandler = this.onblur;
  this.onblur=undefined;

  var sel = window.getSelection();

  var rangeCopy;
  if(sel.rangeCount>0) rangeCopy = sel.getRangeAt(0).cloneRange();
  sel.removeAllRanges();

  var range = document.createRange();
  range.selectNodeContents(this);
  ml.assert(sel.rangeCount===0);
  sel.addRange(range);
  var ret = sel.toString();

  if(this.innerText && this.innerText !== ret){sel.removeAllRanges(); sel.addRange(range);ret=sel.toString()}
  if(this.innerText) ml.assert(this.innerText===ret,'text() false return',"'"+this.innerText+"'!=='"+ret+"'");

  //if(this.innerText!==ret){
  //  //possible cause: user-select css
  //  onsole.log("'"+this.innerText+"'!=='"+ret+"'");
  //  //onsole.printStack();
  //  onsole.log(range.toString());
  //  onsole.log(sel.toString());
  //  sel.removeAllRanges();
  //  sel.addRange(range);
  //  onsole.log(sel.toString());
  //  //onsole.log(gE(this.parentNode.id));
  //  //onsole.log(this.isDisplayed());
  //  throw('fm');
  //}

  sel.removeAllRanges();
  this.blur();
  if(rangeCopy) sel.addRange(rangeCopy);

  //onsole.log(ret);
  this.onblur=focusHandler;
  this.onfocus=focusHandler;
  this.onchange=changeHandler;
  return ret;
};
//}}}

String.prototype.isNumber=function()
//{{{
//test if is an integer or a float
{
  return that.search(/[^0-9\-\+\.]/)==-1;
};
//}}}

//object stuff
//use Object.keys(o).length instead?
ml.len=function(obj){ 
//count number of keys of an object
  //if(obj.constructor === Array) return obj.length;
  ml.assert(obj.constructor === Object);
  var ret=0,key;
  for(key in obj)
    if(obj.hasOwnProperty(key)) ret++; //hasOwnProperty does not check down the object's prototype chain
  return ret;
}; 


//don't work if text is html code
ml.linkify=function(text){ 
//  var linkify = (function(){
//  //{{{
//  var
//    SCHEME = "[a-z\\d.-]+://",
//    IPV4 = "(?:(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])",
//    HOSTNAME = "(?:(?:[^\\s!@#$%^&*()_=+[\\]{}\\\\|;:'\",.<>/?]+)\\.)+",
//    TLD = "(?:ac|ad|aero|ae|af|ag|ai|al|am|an|ao|aq|arpa|ar|asia|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|biz|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|cat|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|coop|com|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|info|int|in|io|iq|ir|is|it|je|jm|jobs|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mobi|mo|mp|mq|mr|ms|mt|museum|mu|mv|mw|mx|my|mz|name|na|nc|net|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pro|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tel|tf|tg|th|tj|tk|tl|tm|tn|to|tp|travel|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|xn--0zwm56d|xn--11b5bs3a9aj6g|xn--80akhbyknj4f|xn--9t4b11yi5a|xn--deba0ad|xn--g6w251d|xn--hgbk6aj7f53bba|xn--hlcj6aya9esc7a|xn--jxalpdlp|xn--kgbechtv|xn--zckzah|ye|yt|yu|za|zm|zw)",
//    HOST_OR_IP = "(?:" + HOSTNAME + TLD + "|" + IPV4 + ")",
//    PATH = "(?:[;/][^#?<>\\s]*)?",
//    QUERY_FRAG = "(?:\\?[^#<>\\s]*)?(?:#[^<>\\s]*)?",
//    URI1 = "\\b" + SCHEME + "[^<>\\s]+",
//    URI2 = "\\b" + HOST_OR_IP + PATH + QUERY_FRAG + "(?!\\w)",
//    
//    MAILTO = "mailto:",
//    EMAIL = "(?:" + MAILTO + ")?[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@" + HOST_OR_IP + QUERY_FRAG + "(?!\\w)",
//    
//    URI_RE = new RegExp( "(?:" + URI1 + "|" + URI2 + "|" + EMAIL + ")", "ig" ),
//    SCHEME_RE = new RegExp( "^" + SCHEME, "i" ),
//    
//    quotes = {
//      "'": "`",
//      '>': '<',
//      ')': '(',
//      ']': '[',
//      '}': '{',
//      '»': '«',
//      '›': '‹'
//    },
//    
//    default_options = {
//      callback: function( text, href ) {
//        return href ? '<a href="' + href + '" title="' + href + '">' + text + '</a>' : text;
//      },
//      punct_regexp: /(?:[!?.,:;'"]|(?:&|&amp;)(?:lt|gt|quot|apos|raquo|laquo|rsaquo|lsaquo);)$/
//    };
//  
//  return function( txt, options ) {
//    options = options || {};
//    
//    // Temp variables.
//    var arr,
//      i,
//      link,
//      href,
//      
//      // Output HTML.
//      html = '',
//      
//      // Store text / link parts, in order, for re-combination.
//      parts = [],
//      
//      // Used for keeping track of indices in the text.
//      idx_prev,
//      idx_last,
//      idx,
//      link_last,
//      
//      // Used for trimming trailing punctuation and quotes from links.
//      matches_begin,
//      matches_end,
//      quote_begin,
//      quote_end;
//    
//    // Initialize options.
//    for ( i in default_options ) {
//      if ( options[ i ] === undefined ) {
//        options[ i ] = default_options[ i ];
//      }
//    }
//    
//    // Find links.
//    while ( arr = URI_RE.exec( txt ) ) {
//      
//      link = arr[0];
//      idx_last = URI_RE.lastIndex;
//      idx = idx_last - link.length;
//      
//      // Not a link if preceded by certain characters.
//      if ( /[\/:]/.test( txt.charAt( idx - 1 ) ) ) {
//        continue;
//      }
//      
//      // Trim trailing punctuation.
//      do {
//        // If no changes are made, we don't want to loop forever!
//        link_last = link;
//        
//        quote_end = link.substr( -1 )
//        quote_begin = quotes[ quote_end ];
//        
//        // Ending quote character?
//        if ( quote_begin ) {
//          matches_begin = link.match( new RegExp( '\\' + quote_begin + '(?!$)', 'g' ) );
//          matches_end = link.match( new RegExp( '\\' + quote_end, 'g' ) );
//          
//          // If quotes are unbalanced, remove trailing quote character.
//          if ( ( matches_begin ? matches_begin.length : 0 ) < ( matches_end ? matches_end.length : 0 ) ) {
//            link = link.substr( 0, link.length - 1 );
//            idx_last--;
//          }
//        }
//        
//        // Ending non-quote punctuation character?
//        if ( options.punct_regexp ) {
//          link = link.replace( options.punct_regexp, function(a){
//            idx_last -= a.length;
//            return '';
//          });
//        }
//      } while ( link.length && link !== link_last );
//      
//      href = link;
//      
//      // Add appropriate protocol to naked links.
//      if ( !SCHEME_RE.test( href ) ) {
//        href = ( href.indexOf( '@' ) !== -1 ? ( !href.indexOf( MAILTO ) ? '' : MAILTO )
//          : !href.indexOf( 'irc.' ) ? 'irc://'
//          : !href.indexOf( 'ftp.' ) ? 'ftp://'
//          : 'http://' )
//          + href;
//      }
//      
//      // Push preceding non-link text onto the array.
//      if ( idx_prev != idx ) {
//        parts.push([ txt.slice( idx_prev, idx ) ]);
//        idx_prev = idx_last;
//      }
//      
//      // Push massaged link onto the array
//      parts.push([ link, href ]);
//    };
//    
//    // Push remaining non-link text onto the array.
//    parts.push([ txt.substr( idx_prev ) ]);
//    
//    // Process the array items.
//    for ( i = 0; i < parts.length; i++ ) {
//      html += options.callback.apply( window, parts[i] );
//    }
//    
//    // In case of catastrophic failure, return the original text;
//    return html || txt;
//  };
//  
//})();
////}}}
//  return linkify(text);
//
//  //return text.replace(/(^|\s)((https?\:\/\/|www\.)[^\s]*)($|\s)/g,'$1<a href="$2" target="_blank">$2</a>$4');
//  
//  text = text.replace(/(^|\s)((https?\:\/\/)[^\s@]+\.[^\s@]+)($|\s)/g,'$1<a href="$2" target="_blank" contenteditable="'+(editable?'true':'false')+'">$2</a>$4');
//  text = text.replace(/(^|\s)((www\.)?([a-zA-Z\-]+\.)+(com|de|fr))($|\s)/g,'$1<a href="http://$2" target="_blank" contenteditable="'+(editable?'true':'false')+'">$2</a>$6');
//  text = text.replace(/(^|\s)([a-zA-Z\-\.]+@[a-zA-Z\-\.]+\.[a-zA-Z\-\.]+)($|\s)/g,'$1<a href="mailto:$2" target="_blank" contenteditable="'+(editable?'true':'false')+'">$2</a>$3');
//  

  text = text.replace(/(^|\s)((https?\:\/\/)[^\s@]+\.[^\s@]+)(?=$|\s)/g,'$1<a href="$2" target="_blank">$2</a>');
  text = text.replace(/(^|\s)((?:www\.)?(?:[a-zA-Z\-]+\.)+(?:com|de|fr|uk|us|es|org|net|im)(?:(?:\/|#)[^\s@]*)?)(?=$|\s)/g,'$1<a href="http://$2" target="_blank">$2</a>');
  text = text.replace(/(^|\s)([a-zA-Z\-\.]+@[a-zA-Z\-\.]+\.[a-zA-Z\-\.]+)(?=$|\s)/g,'$1<a href="mailto:$2" target="_blank">$2</a>');
  return text;
}; 

//list stuff
ml.makeSet=function(list) //doesn't copy list
//{{{
{
  ml.assert(list.constructor === Array);
  var checkmap = {};
  for(var i=0;i<list.length;i++)
  {
    var e = list[i];
    if(checkmap[e]) list.splice(i--,1);
    else checkmap[e] = true;
  }
  return list;
};
// alternative implementions
//Array.prototype.unique =
////{{{
//  function() {
//    var a = [];
//    var l = this.length;
//    for(var i=0; i<l; i++) {
//      for(var j=i+1; j<l; j++) {
//        // If this[i] is found later in the array
//        if (this[i] === this[j])
//          j = ++i;
//      }
//      a.push(this[i]);
//    }
//    return a;
//  };
////}}}
//ml.makeSet=function(list)
////{{{
//{
//  //would be faster using an object like in areEqual
//  ml.assert(list.constructor === Array);
//  var set=[];
//  list.forEach(function(val)
//  {
//    for(var i=0;i<set.length;i++)
//      if(set[i]===val)
//        return;
//    set.push(val);
//  });
//  return set;
//};
////}}}
//ml.makeSet=function(list,caseInsensitiv)
////{{{
//{
//  //would be faster using an object like in areEqual
//  ml.assert(list.constructor === Array);
//  var set=[];
//  list.forEach(function(val)
//  {
//    for(var i=0;i<set.length;i++)
//      if(set[i]===val || caseInsensitiv && set[i].toLowerCase()===val.toLowerCase())
//        return;
//    set.push(val);
//  });
//  return set;
//};
////}}}
//
//}}}
ml.intersect
//{{{
=function()
{
  if(!arguments.length) return [];
  var a1 = arguments[0];
  var a = a2 = null;
  var i = 1;
  while(i < arguments.length)
  {
    a = [];
    a2 = arguments[i];
    var l = a1.length;
    var l2 = a2.length;
    for(var j=0; j<l; j++) {
      for(var k=0; k<l2; k++) {
        if (a1[j] === a2[k])
          a.push(a1[j]);
      }
    }
    a1 = a;
    i++;
  }
  return ml.makeSet(a1);
};
//}}}
ml.toArray=function(nodeList)
//{{{
{
  ml.assert(false);//use [].slice.call instead
  ml.assert(nodeList.constructor === arguments.constructor || nodeList.constructor === NodeList || (ml.browser().usesGecko && (nodeList.constructor === Object || nodeList.constructor === HTMLCollection)),nodeList,nodeList.constructor);
  var ret=[];
  for(var i=0;i<nodeList.length;i++)
    ret.push(nodeList[i]);
  return ret;
};
//}}}

// object.watch polyfill
// {{{
// 2012-04-03
//
// By Eli Grey, http://eligrey.com
// https://gist.github.com/384583
// Public Domain.
// NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
//
 
// object.watch
if (!Object.prototype.watch) {
  Object.defineProperty(Object.prototype, "watch", {
      enumerable: false
    , configurable: true
    , writable: false
    , value: function (prop, handler) {
      var
        oldval = this[prop]
      , newval = oldval
      , getter = function () {
        return newval;
      }
      , setter = function (val) {
        oldval = newval;
      //return newval = handler.call(this, prop, oldval, val);
        return newval = handler.call(this,val, oldval);
      }
      ;
      
      if (delete this[prop]) { // can't watch constants
        Object.defineProperty(this, prop, {
            get: getter
          , set: setter
          , enumerable: true
          , configurable: true
        });
      }
    }
  });
}
 
// object.unwatch
if (!Object.prototype.unwatch) {
  Object.defineProperty(Object.prototype, "unwatch", {
      enumerable: false
    , configurable: true
    , writable: false
    , value: function (prop) {
      var val = this[prop];
      delete this[prop]; // remove accessors
      this[prop] = val;
    }
  });
}
//}}}

}}}
*/

/* old code / todel
{{{
Element.prototype.old_insertBefore=Element.prototype.insertBefore;
//inserBefore used by uservoice
Element.prototype.insertBefore=function(nodeToMove,node)
//{{{
{
  //dom is object -> node comparison <-> object comparison -> 2 nodes === iff there are the same node
  if(node && node.nextSibling && node.nextSibling===nodeToMove) return;
  this.old_insertBefore(nodeToMove,node);
  //if(!node || !node.nextSibling || node.nextSibling!==nodeToMove)
    //this.old_insertBefore(nodeToMove,node);
};
//}}}
Element.prototype.old_appendChild=Element.prototype.appendChild;
Element.prototype.appendChild=function(child)
//{{{
{
  if(!this.lastChild || this.lastChild!==child) return this.old_appendChild(child);
};
//}}}
Element.prototype.prependChild=function(child)
//{{{
{
  if(!this.firstChild)
    this.appendChild(child);
  else
    this.insertBefore(child,this.firstChild);
};
//}}}
Element.prototype.insertAfter=function(nodeToMove,node)
//{{{
{
  ml.assert(node);
  if(node.nextSibling)
    this.insertBefore(nodeToMove,node.nextSibling);
  else
    this.appendChild(nodeToMove);
};
//}}}
Element.prototype.removeNode=
//{{{
function()
{
  var parent_ = this.parentNode;
  ml.assert(parent_);
  parent_.removeChild(this);
  return parent_;
};
//}}}
Element.prototype.hide=function()
//{{{
{
  this.style.visibility='hidden';
};
//}}}
Element.prototype.show=function()
//{{{
{
  this.style.visibility='inherit';
};
//}}}
Element.prototype.undisplay=function()
//{{{
{
  this.style.display='none';
};
//}}}
Element.prototype.display=function()
//{{{
{
  this.style.display='';
};
//}}}
Element.prototype.isDisplayed=function()
//{{{
{
  return ml.element.getStyle(this,'display')!=='none';
}
//}}}
Element.prototype.click=function()
//{{{
{
  var ev = document.createEvent('MouseEvents');
  ev.initEvent('click',true,true);
  this.dispatchEvent(ev);
};
//}}}


//NodeList
// use Array().slice.call(nodeList) instead
ml.indexOf=function(nodeList,node)
//{{{
{
  ml.assert(nodeList.constructor === NodeList || ml.browser().usesGecko && nodeList.constructor === Object,nodeList,nodeList.constructor);
  for(var i=0;i<nodeList.length;i++)
    if(nodeList[i]===node)
      return i;
  return -1;
};
//}}}

function countCharacters(n) //doesn't consider line breaks, e.g. <br> and <p>
//{{{
{
    if (n.nodeType == 3) { //Node.TEXT_NODE
        return n.length;
    } else {
        var numchars = 0;
        for (var m = n.firstChild; m != null; m = m.nextSibling) {
            numchars += countCharacters(m);
        }
        return numchars;
    }
}
//}}}
ml.pStore={};
(function(){ 
  if(typeof window === "undefined") return;//=> called as metro background task

  var __addExtBeforeListener;
  //to avoid infinite loops:
  //-do not directly use localStorage while using ml.pStore
  //-do not initiate window.location.reload on ext change
  //-(no way found to implement check for these both rules -- onbeforeunload->alert doesn't work)
  (function(){ 
    var CS = window['chrome']&&window['chrome']['storage'];

    var TS_KEY = '_ml_ts';
    function ts2str(_tsS) { ml.assert(_tsS.constructor===Array);return JSON.stringify(_tsS); }
    function str2ts(str) {
      ml.assert(str===undefined||str===null||str.constructor===String);
      var _tsS = str?JSON.parse(str):[];
      ml.assert(_tsS&&_tsS.constructor===Array&&[true].concat(_tsS.map(function(ts){return ts.constructor===Number&&ts>1340000000000})).reduce(function(b1,b2){return b1&&b2}));
      return _tsS;
    }
    function getFork(a1,a2)
    {
      var i;
      for(i=0;i<a1.length;i++) if(a1[i]!==a2[i]) break;
      return [a1.slice(i),a2.slice(i)];
    }

    var tsS=str2ts(localStorage.getItem(TS_KEY));

    var __extBeforeListners=[];
    __addExtBeforeListener=function(f){__extBeforeListners.push(f)};
    function callExtListeners(){
        setForbidden+=9;setTimeout(function(){setForbidden-=9},0);
        __extBeforeListners.forEach(function(e){e()});
        if(ml.pStore.onExtChange) ml.pStore.onExtChange();
    }

    if(CS) {
      var timeoutId=0;
      var CS_LS_sync=function(){window.clearInterval(timeoutId);timeoutId=setTimeout(function(){CS['sync']['get'](null,function(newLocalStorage){ 
      //assuming that when offline sync.get returns local values
        var cs_ts = str2ts(newLocalStorage[TS_KEY]);
        var ls_ts = str2ts(localStorage.getItem(TS_KEY));
        var fork = getFork(cs_ts,ls_ts);
        if(fork[0].length===0 && fork[1].length===0)return;
        if(fork[0].length>fork[1].length) {
          //CS to LS
          for(var i in newLocalStorage) ml.assert(newLocalStorage[i].constructor===String);
          for(var i in localStorage)    if(newLocalStorage[i]===undefined) localStorage.removeItem(i);
          for(var i in newLocalStorage) if(i!==TS_KEY) localStorage.setItem(i,newLocalStorage[i]);
          tsS = cs_ts;
          localStorage.setItem(TS_KEY       ,newLocalStorage[TS_KEY]);
          callExtListeners();
        }
        else {
          //LS to CS
          var arg = {};
          for(var i in localStorage) arg[i]=localStorage.getItem(i);
          //onsole.log(1);
          CS['sync']['clear']();
          CS['sync']['set'](arg);
          //setTimeout(function(){onsole.log(2)},0);
        }
      })},300)}; 
    }

    ml.pStore.get=function(key){
      ml.assert(key.constructor===String);
      return localStorage.getItem(key);
    };
    //-only way of having infinite loop is by calling pStore.set when Ext Listener called -- as long as ts doesn't increase no infinite loop possible
    var setForbidden=0;
    window.addEventListener('load'  ,function(){setTimeout(function(){setForbidden++},0)});
    ml.pStore.userInitiatedEvent=function(){
      //call this to allow pStore.set
      //call this iff event has been initiated by user
      setForbidden--;
      setTimeout(function(){setForbidden++},0)
    };
    ['click','change'].forEach(function(ev){window.addEventListener(ev,ml.pStore.userInitiatedEvent,true)});
    function set(action)
    {
      function ex(b){var msg="pStore.set call only allowed in a window.onload, window.onclick, or window.onchange call";ml.assert(b,msg,3);if(!b) throw msg}
      ex(setForbidden<=0);
      //shortcomings of following 2 lines:
      //-strict mode doesn't allow caller
      //-new Error().stack.split('\n')<=11
      //ex(/\s*at\s(HTML|window\.onload)/.test(new Error().stack.split('\n').reverse()[0]));
      //for(var caller = arguments.callee;caller=caller.caller;) ex(onExtChange.concat([window.setTimeout,window.setInterval]).indexOf(caller)===-1);

      action();

      tsS.push(+new Date());
      localStorage.setItem(TS_KEY,ts2str(tsS));
      CS&&CS_LS_sync();
    }
    ml.pStore.set=function(key,str){
      ml.assert(key.constructor===String && str.constructor===String);
      set(function(){localStorage.setItem(key,str)});
    };
    ml.pStore.clear=function(){
      set(function(){
        localStorage.clear()
      });
    };

    window.addEventListener('storage',function(){
      var ls_ts = str2ts(localStorage.getItem(TS_KEY));
      if(tsS.length!==ls_ts.length || tsS[tsS.length-1]!==ls_ts[ls_ts.length-1]) {
        tsS=ls_ts;
        callExtListeners();
      }
    });
    CS&&CS['onChanged']['addListener'](CS_LS_sync);
    CS&&CS['onChanged']['addListener'](function(){CS_LS_sync()});
    CS&&CS_LS_sync();
  })(); 
  (function(){
    var constructorCallForbiden;
    window.addEventListener('load',function(){setTimeout(function(){constructorCallForbiden=true},0)});
    ml.PersistantObject=function(key,initial_value)
    //{{{
    //put won't actualize other variables with same key -> use only one variable for each key
    {
      ml.assert(!constructorCallForbiden);
      //every constructor call adds a Listener -> do not create too much / temporary PersistantObjects
      if(constructorCallForbiden) throw "ml.PersistantObject call only allowed in window.onload call";
      ml.assert(!initial_value);

      function getStorageValue() {
        var res = ml.pStore.get(key);
        res = res&&JSON.parse(res) || {};
        ml.assert(res.constructor===Object);
        return res;
      }
      var ret = getStorageValue();

      //JSON.stringify ignores put and keys functions
      //google closure trick works:
      //-http://closure-compiler.appspot.com/home
      //-var o={};Object.defineProperty(o,Object.keys({puthe:true})[0],{value:'hey'});alert(o.puthe);
      Object.defineProperty(ret,Object.keys({put :true}),{value:function(){ml.pStore.set(key,JSON.stringify(ret))}});
    //Object.defineProperty(ret,Object.keys({keys:true}),{value:function(){
    //  var res = {};
    ////for(var prop in ret) if(ret[prop] !== ret.put && ret[prop] !== ret.keys) res[prop]=true;
    //  for(var prop in ret) res[prop]=true;
    //  return res;
    //}});

      //this listener should be called before any other relevant listener
      //-not necessarily the case, if problems: make a privat ext event fired before public ext event
      function moveWithReferences(newObj,obj) {
      //doesn't keep Array references
        ml.assert(obj instanceof Object && newObj instanceof Object);
        for(var i in obj) if(newObj[i]===undefined) delete obj[i];
        for(var i in newObj)
        {
          if(!(obj[i] instanceof Array) && !(newObj[i] instanceof Array) &&
               obj[i] instanceof Object &&   newObj[i] instanceof Object) moveWithReferences(newObj[i],obj[i]);
          else obj[i]=newObj[i];
        }
      }
      //change data first then call ext listener
      __addExtBeforeListener(function(){
        moveWithReferences(getStorageValue(),ret);
      });

      return ret;
    };
    //}}}
  })();
})(); 
ml.persistantInput=function(id,listener,default_,keyUpDelay,noFirstListenerCall)
//{{{
//convention:
//-inputEl.id === id for localStorage
//-default_===0 || default_===1 => checkbox input
{
//ml.assert(false,'replace localstorage with pStore');
  ml.assert(id!="key");
  if(default_===undefined || default_===null) default_='';
  var inputEl = document.getElementById(id);
  if(window.localStorage!==undefined)
  {
    if(!ml.persistantInput.chromeBugFixed)
      //{{{
    //fix for stupid chrome bug: if value is equal to '' then when browser restarts the value become undefined
      (function()
      {
        if(!window.localStorage['key']) return;
        var keys={};
        for(var i=0;i<window.localStorage.length;i++) keys[window.localStorage['key'](i)]=true;
        for(var key in keys) if(!window.localStorage[key]) window.localStorage[key]='';
        ml.persistantInput.chromeBugFixed=true;
      })();
      //}}}

    var binaryInput = default_===false || default_===true;
    
    var val = window.localStorage.getItem(id)!==null?window.localStorage[id]:default_;//opera's hasOwnProperty allways return true
    if(binaryInput) val=!!val;
    ml.assert(binaryInput === (inputEl.type==='checkbox'));
    if(inputEl.nodeName==='SELECT' && inputEl.childNodes.length===0) inputEl.innerHTML='<option>'+val+'</option>';
    inputEl[binaryInput?'checked':'value']=val;
    if(listener && !noFirstListenerCall) listener(val);

    var lastTimeout;
    var changeListener=function(){
      if(lastTimeout) window.clearTimeout(lastTimeout);
      lastTimeout=window.setTimeout(function()
      {
        var newVal = binaryInput?(inputEl['checked']?"true":""):inputEl['value'];
        if(window.localStorage[id]!=newVal)
        {
          window.localStorage[id]=newVal;
          if(listener) listener(binaryInput?!!newVal:newVal);
        }
      },keyUpDelay!==undefined?keyUpDelay:(binaryInput?0:1000));
    }
    var addChangeListener = binaryInput ||  inputEl.type.toLowerCase()==='color' || inputEl.nodeName==='SELECT';
    if( addChangeListener)                                inputEl.addEventListener('change',changeListener,false);
    if(!addChangeListener || inputEl.nodeName==='SELECT') inputEl.addEventListener('keyup' ,changeListener,false);
  }
  else
  {
    inputEl.parentNode.removeChild(inputEl);
    if(!noFirstListenerCall) listener(default_);
  }
};
//}}}
}}}
*/
