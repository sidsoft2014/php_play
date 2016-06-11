(function () {
    'use strict';

    var ctrlName = 'profileCtrl';

    angular.module('ngProfile')
        .controller(ctrlName, profileCtrl);

    profileCtrl.$inject = ['cookieService', 'navService', 'userService'];

    function profileCtrl(cookieService, navService, userService) {
        var vm = this;

        vm.areaIdx = -1;
        vm.areaName = ''
        vm.user = {
            id: undefined,
            guid: undefined,
            name: '',
            email: '',
            sess: ''
        };
        vm.links = [];
        vm.list = [];
        vm.leftmenu = [
            { name: 'artists', link: '#' },
            { name: 'tracks', link: '#' },
            { name: 'releases', link: '#' },
            { name: 'labels', link: '#' }
        ];
        vm.onMenuClick = onMenuClick;
        vm.listItemClick = listItemClick;
        vm.btnNewClick = btnNewClick;

        activate();

        function activate() {
            var sessId = cookieService.getCookie('PHPSESSID');
            if (sessId === undefined || sessId === '') {
                console.error('Session id not found.');
                window.location.assign('/login.html');
                return;
            }

            var cookie = cookieService.getCookie('user');
            if (cookie === undefined || cookie == '') {
                console.error('User cookie not found.');
                window.location.assign('/login.html');
                return;
            }

            vm.user = userService.getUserFromCookie(cookie);
            vm.user.sess = sessId;
            
            vm.links = navService.getLinks('profile');
        }

        function onMenuClick(idx) {
            if (idx === vm.areaIdx)
                return;

            var item = vm.leftmenu[idx];
            vm.areaIdx = idx;
            vm.areaName = item.name;

            switch (item.name) {
                case 'artists':
                    vm.list = userService.getUserArtists(vm.user);
                    break;
                case 'tracks':
                    vm.list = userService.getUserTracks(vm.user);
                    break;
                case 'releases':
                    vm.list = userService.getUserReleases(vm.user);
                    break;
                case 'labels':
                    vm.list = vm.labels = userService.getUserLabels(vm.user);
                    break;
                default:
                vm.list = [];
                    break;
            }
        }

        function listItemClick(idx) {
            var item = vm.list[idx];
            var uri = '/members/'+vm.areaName+'.html?id='+item.id;
            window.location.assign(uri);
            return;
        }
        
        function btnNewClick(){
            alert('Create new: ' + vm.areaName);
        }
    }

} ());
