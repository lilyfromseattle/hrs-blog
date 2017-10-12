'use strict';

var angular = require('angular');
require('angular-route');

var app = angular.module(
    'hrsBlog',
    ['ngRoute'],
    function($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'home.html'});
        $routeProvider.when('/posts', {templateUrl: 'posts.html'});
        $routeProvider.when('/new_post', {templateUrl: 'new_post.html'});
        $routeProvider.otherwise({redirectTo: '/'});
    }
);

app.controller('HomeController', require('./home.js'));

app.factory('PostsService', ['$http', '$q', function($http, $q) {
  var post_list = [],
      posts_by_id = {};

  function getPostsFromApi() {
    return $http.get('https://jsonplaceholder.typicode.com/posts')
      .then(function(response) {
        if (response.data) {
          return response.data;
        } else {
          return $q.reject('No data in response.');
        }
      }, function(response) {
        return $q.reject('Server or connection error.');
      });
  }

  function createNewPost(postTitle, postBody) {
    var url = 'https://jsonplaceholder.typicode.com/posts'
    return $http({
        method: 'POST',
        url: url,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        },
        data: {title: postTitle, body: postBody}
    }).then(function(response) {
      return response
    });
  }

  return {
      getPosts: function(){
        return getPostsFromApi();
      },
      newPost: function(postTitle, postBody){
        return createNewPost(postTitle, postBody);
      }
  }
}]);
