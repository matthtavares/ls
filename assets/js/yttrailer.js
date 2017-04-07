(function (namespace) {
    'use strict'

    namespace.create = function( yt_code ){
      let template = `<div id="yt-trailer">
        <div class="overlay"></div>
        <div class="modal-dialog">
          <div class="modal-close" onclick="yttrailer.close()"><i class="fa fa-window-close"></i></div>
          <iframe height="315" src="https://www.youtube.com/embed/${yt_code}?enablejsapi=1" frameborder="0" allowfullscreen id="youtube-iframe"></iframe>
        </div>
      </div>`;
      document.querySelector('#page-content-wrapper').innerHTML += template;
    };

    namespace.open = function(){
      document.querySelector('#yt-trailer').classList.add('open');
      document.querySelector('body').classList.add('yt-open');
    };

    namespace.close = function(){
      document.querySelector('#yt-trailer').classList.remove('open');
      document.querySelector('body').classList.remove('yt-open');
      document.getElementById('youtube-iframe').contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    };

})(window.yttrailer || (window.yttrailer = {}));
