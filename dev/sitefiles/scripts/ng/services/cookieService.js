(function() {
  'use strict';

  angular.module('ngMain')
    .factory('cookieService', cookieService);

  function cookieService(){
    var service = {
      getCookie: getCookie
    };

    return service;

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return unescape(c.substring(name.length,c.length));
            }
        }
        return "";
    }
  }
}());
