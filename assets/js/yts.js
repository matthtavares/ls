(function (namespace) {
    'use strict'
    var API_URL = "https://yts.ag/api/v2/";

    namespace.createRequest = function (requestURL, requestData, callback) {
        if (typeof callback !== 'function') {
            throw new Error("The callback parameter was not a function");
        }

        if (typeof requestData != 'object') {
            throw new Error("I don't know how to handle " + requestData);
        }

        var xhr = new XMLHttpRequest();
        xhr.open("GET", requestURL + requestData.query(), true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status !== 200) {
                throw new Error("Unexpected HTTP Status Code (" + xhr.status + ")");
            }

            callback( JSON.parse(xhr.responseText) );
        };
        xhr.send();
    };

    namespace.listMovies = function (requestData, callback){
      if (typeof callback !== 'function') {
          throw new Error("The callback parameter was not a function");
      }

      if (typeof requestData != 'object') {
          throw new Error("I don't know how to handle " + requestData);
      }

      let requestURL = API_URL + 'list_movies.json?';
      this.createRequest(requestURL, requestData, callback);
    };

    namespace.movieDetails = function (requestData, callback){
      if (typeof callback !== 'function') {
          throw new Error("The callback parameter was not a function");
      }

      if (typeof requestData != 'object') {
          throw new Error("I don't know how to handle " + requestData);
      }

      let requestURL = API_URL + 'movie_details.json?';
      this.createRequest(requestURL, requestData, callback);
    };

})(window.yts || (window.yts = {}));
