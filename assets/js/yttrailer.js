(function (namespace) {
    'use strict'

    /**
     * Cria um modal com o video do YouTube baseado no código
     * passado por yt_code.
     */
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

    /**
     * Exibe o modal com o video.
     */
    namespace.open = function(){
      document.querySelector('#yt-trailer').classList.add('open');
      document.querySelector('body').classList.add('yt-open');
    };

    /**
     * Fecha o modal.
     */
    namespace.close = function(){
      // Pausa o vídeo ao fechar
      document.getElementById('youtube-iframe').contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');

      document.querySelector('#yt-trailer').classList.remove('open');
      document.querySelector('body').classList.remove('yt-open');
    };

})(window.yttrailer || (window.yttrailer = {}));
