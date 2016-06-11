(function(){
    angular.module('ngMain')
        .directive('ngNavbar', ngNavbar);
        
    function ngNavbar() {
        var directive = {
            restrict: 'E',
            templateUrl: '/sitefiles/partials/ngNavbar.html'    
        };
        
        return directive;
    }
})();