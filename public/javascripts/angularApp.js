var app = angular.module('marioNews', ['ui.router']);


// config
app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // set up home route
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl'
            })
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/posts.html',
                controller: 'PostsCtrl'
            });

        // handle the route if the app receives a URL that is not defined
        $urlRouterProvider.otherwise('home');
    }
]);

// posts service
app.factory('posts', [function() {
    var o = {
        posts: []
    };
    return o;
}])

// main controller
app.controller('MainCtrl', [
    '$scope',
    'posts',
    function($scope, posts) {

        // $scope variable
        $scope.test = 'Hello Marius!';
        // bind $scope.posts variable to the posts array in the posts service
        $scope.posts = posts.posts;

        // add new post
        $scope.addPost = function() {
            if (!$scope.title || $scope.title === '') {
                return;
            };
            $scope.posts.push({
                title: $scope.title,
                link: $scope.link,
                upvotes: 0,
                comments: [{
                    author: 'Joe',
                    body: 'Cool post!',
                    upvotes: 0
                }, {
                    author: 'Bob',
                    body: 'Great idea but everything is wrong!',
                    upvotes: 0
                }]
            });
            $scope.title = '';
            $scope.link = '';
        }

        // upvoting an existing post
        $scope.incrementUpvotes = function(post) {
            post.upvotes += 1;
        }
    }
])

// posts controller
app.controller('PostsCtrl', [
    '$scope',
    '$stateParams',
    'posts',
    function($scope, $stateParams, posts) {
        $scope.post = posts.posts[$stateParams.id];

        // add comment
        $scope.addComment = function(){
            if ($scope.body === '') { return; };
            $scope.post.comments.push({
                body: $scope.body,
                author: 'user',
                upvotes: 0
            });
            $scope.body = '';
        }

    }
])








