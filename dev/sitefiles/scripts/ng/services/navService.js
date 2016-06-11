(function () {
    'use strict';

    angular.module('ngMain')
        .factory('navService', navService);

    function navService() {
        var service = {
            getLinks: getLinks
        };

        return service;

        function getLinks(page) {
            switch (page) {
                case 'home':
                    return [
                        { name: 'home', href: '/' },
                        { name: 'login', href: '/login.html' }
                    ];

                case 'profile':
                    return [
                        { name: 'home', href: '/' },
                        { name: 'logout', href: '/login.html' }
                    ];
                default:
                    break;
            }
        }
    }

})();