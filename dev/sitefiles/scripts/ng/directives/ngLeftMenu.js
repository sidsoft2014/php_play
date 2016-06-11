(function(){
    'use strict';
    
    angular.module('ngMain')
        .directive('ngLeftMenu', ngLeftMenu);
        
    function ngLeftMenu(){
        var directive = {
            restrict: 'E',
            templateUrl: '/sitefiles/partials/ngLeftMenu.html'
        };
        
        return directive;
    }
    
})();