(function () {
  'use strict';

  angular.module('ngMain')
    .factory('userService', userService);

  function userService() {
    var service = {
      getUserFromCookie: getUserFromCookie,
      getUserTracks: getUserTracks,
      getUserLabels: getUserLabels,
      getUserReleases: getUserReleases,
      getUserArtists: getUserArtists,
      createEntry : createEntry
    };

    return service;

    function getUserFromCookie(cookie) {
      return JSON.parse(unescape(cookie));
    }

    function getUserArtists(user) {
      return [
        { name: 'test1', id: 'hfgfhgfghfghfhg', image: 'hfgfhgfghfghfhg.jpg', description: 'what?' },
        { name: 'test2', id: 'hfgfghjfffghfhg', image: 'hfgfghjfffghfhg.jpg', description: 'some description' }
      ];
    }

    function getUserLabels(user) {
      return [
        { name: 'label 1', id: 'hfgfhgfghfghfhg', image: 'hfgfhgfghfghfhg.jpg', description: 'what?' },
        { name: 'label2', id: 'hfgfghjfffghfhg', image: 'hfgfghjfffghfhg.jpg', description: 'some description' }
      ];
    }

    function getUserReleases(user) {
      return [
        { name: 'release 1', id: 'hfgfhgfghfghfhg', image: 'hfgfhgfghfghfhg.jpg', description: 'what?' },
        { name: 'Release 2', id: 'hfgfghjfffghfhg', image: 'hfgfghjfffghfhg.jpg', description: 'some description' }
      ];
    }

    function getUserTracks(user) {
      return [
        { name: 'track 1', id: 'hfgfhgfghfghfhg', image: 'hfgfhgfghfghfhg.jpg', description: 'what?' },
        { name: 'Track2', id: 'hfgfghjfffghfhg', image: 'hfgfghjfffghfhg.jpg', description: 'some description' }
      ];
    }

    function createEntry(user, params) {
      if(!hasValue(user) || !hasValue(params)) {
        console.error('Could not create entry.');
        return;
      }
      else {
        alert('Creating');
      }
    }
  }
} ());
