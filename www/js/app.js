angular.module('myApp', ['ionic', 'mycontroller.controllers', 'myService.services'])

.run(function($ionicPlatform, $rootScope, $timeout, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    /* 
      #SIMPLIFIED-IMPLEMENTATION:
      Example access control.
      A real app would probably call a service method to check if there
      is a logged user.

      #IMPLEMENTATION-DETAIL: views that require authorizations have an
      "auth" key with value = "true".
    */
    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams){
        if(toState.data && toState.data.auth == true && !$rootScope.user.email){
          event.preventDefault();
          $state.go('app.login');   
        }
    });

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  
  .state('app.start', {
    url: '/start',
    views: {
      'menuContent': {
        templateUrl: 'templates/start.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('app.home', {
    url: '/home/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/homedetail.html',
        controller: 'HomeDetailCtrl'
      }
    }
  })
  .state('app.login', {
    url: '/login',
    cached : false,
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller : 'LoginCtrl'
      }
    }
  })

  .state('app.forgot', {
    url: '/forgot',
    views: {
      'menuContent': {
        templateUrl: 'templates/forgot.html'
      }
    }
  })

  .state('app.signup', {
    url: '/signup',
    views: {
      'menuContent': {
        templateUrl: 'templates/signup.html'
      }
    }
  })

  .state('app.account', {
      url: '/account',
      data : { auth : true },
      views: {
        'menuContent': {
          templateUrl: 'templates/account.html',
          controller : 'AccountCtrl'
        }
      }
  })

  .state('app.feed', {
    url: '/feed',
    data : { auth : true },
    views: {
      'menuContent': {
        templateUrl: 'templates/feed.html',
        controller : 'FeedsCtrl'
      }
    }
  })

  .state('app.shop', {
    url: '/shop',
    // data : { auth : true },
    cache : false,
    views: {
      'menuContent': {
        templateUrl: 'templates/shop.html',
        controller : 'ShopCtrl'
      }
    }
  })
  .state('app.shopdetail',{
    url: '/shopdetail/:id',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/shopchild.html',
        controller: 'ShopDetailCtrl'
      }
    }
  })
  .state('app.product',{
   url: '/product/:id',
   // data:{auth:true},
   cache: false,
   views:{
    'menuContent': {
      templateUrl:'templates/shopdetail.html',
      controller:'ProductDetailCtrl'
    }
   }

  })
  .state('app.cart', {
    url: '/cart',
    // data : { auth : true },
    cache : false,
    views: {
      'menuContent': {
        templateUrl: 'templates/cart.html',
        controller : 'CartCtrl'
      }
    }
  })

  .state('app.checkout', {
    url: '/checkout',
    // data : { auth : true },
    cache : false,
    views: {
      'menuContent': {
        templateUrl: 'templates/checkout.html',
        controller : 'CheckoutCtrl'
      }
    }
  })
  
  // If none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/start');

});
