'use strict';

module.exports = function($scope, $location, $window, PostsService) {
  $scope.createPost = function() {
    PostsService.newPost($scope.newPost.title, $scope.newPost.body)
      .then(function(response){
        if (response.status == 201) {

          // I wasn't really sure what to do with the sucessfully created post so I just decided to save it to localStorage
          // so at least the user will have a consistent experience across sessions. Obvi in the real world this would be
          // a real working API and this would be unecessary

          var updatedNewPosts = $window.localStorage.getItem('newPosts') + "|" + JSON.stringify(response.data)
          $window.localStorage.setItem('newPosts', updatedNewPosts);
          var host = $window.location.host;
          var landingUrl = "http://" + host + "#!/posts";
          $window.location.href = landingUrl;

        } else {
          $scope.errorMessage = "Oops, something went wrong."
        }
      })
  }

  PostsService.getPosts()
    .then(function(posts) {
      $scope.posts = posts;
      if ($window.localStorage.newPosts) {
        var newPostsArray = $window.localStorage.getItem('newPosts').split("|")

        newPostsArray.forEach(function(post) {
          var parsedPost = JSON.parse(post);
          $scope.posts.push(parsedPost);
        });
      };
    });
};
