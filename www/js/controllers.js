
angular.module('mycontroller.controllers', [])

//top view controller
.controller('AppCtrl', function($scope, $rootScope, $state, $ionicActionSheet , BackendService, CartService) {
  
 
  $rootScope.user = {};

 BackendService.getcategory()
 .success(function(result){
   $scope.categorys=result.category;
 });


 var link ="http://localhost/server/larave_fw/doantotnghiep";
  $scope.url=link;

  $scope.logout = function(){
    $rootScope.user = {};
    $state.go('app.start')
  };

})

// This controller is bound to the "app.account" view
.controller('AccountCtrl', function($scope, $rootScope) {
  
  //readonly property is used to control editability of account form
  $scope.readonly = true;

  // #SIMPLIFIED-IMPLEMENTATION:
  // We act on a copy of the root user
  $scope.accountUser = angular.copy($rootScope.user);
  var userCopy = {};

  $scope.startEdit = function(){
    $scope.readonly = false;
    userCopy = angular.copy($scope.user);
  };

  $scope.cancelEdit = function(){
    $scope.readonly = true;
    $scope.user = userCopy;
  };
  
  // #SIMPLIFIED-IMPLEMENTATION:
  // this function should call a service to update and save 
  // the data of current user.
  // In this case we'll just set form to readonly and copy data back to $rootScope.
  $scope.saveEdit = function(){
    $scope.readonly = true;
    $rootScope.user = $scope.accountUser;
  };

})


.controller('LoginCtrl', function ($scope, $state, $rootScope) {

  // #SIMPLIFIED-IMPLEMENTATION:
  // This login function is just an example.
  // A real one should call a service that checks the auth against some
  // web service

  $scope.login = function(){
    //in this case we just set the user in $rootScope
    $rootScope.user = {
      email : "mary@ubiqtspaces.com",
      name : "Mary Ubiquitous",
      address : "Rue de Galvignac",
      city : "RonnieLand",
      zip  : "00007",
      avatar : 'sampledata/images/avatar.jpg'
    };
    //finally, we route our app to the 'app.shop' view
    $state.go('app.shop');
  };
  
})


// Feeds controller.
.controller('FeedsCtrl', function($scope, BackendService) {
  
  $scope.doRefresh = function(){
      BackendService.getFeeds()
      .success(function(newItems) {
        $scope.feeds = newItems;
      })
      .finally(function() {
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });
  };

  // Triggering the first refresh
  $scope.doRefresh();

})


.controller('HomeCtrl',function($scope, $ionicActionSheet, BackendService,CartService){
BackendService.getpost()
.success(function(result){
$scope.posts=result.post;
 var link ="http://localhost/server/larave_fw/doantotnghiep";
 $scope.url=link;
})
})


.controller('HomeDetailCtrl',function($scope, $ionicActionSheet,$stateParams, BackendService,CartService){
  $scope.cart = CartService.loadCart();
  var currentId = $stateParams.id;
    BackendService.getpost().
    success ( function(result){
    var data =result.post;
    for (var i = 0; i < data.length; i++) {
    if(data[i].slug == currentId){
    $scope.row=data[i];
     var link ="http://localhost/server/larave_fw/doantotnghiep";
        $scope.url=link;
}
}
})
})



// Shop controller.
.controller('ShopCtrl', function($scope, $ionicActionSheet, BackendService, CartService) {
  
  $scope.cart = CartService.loadCart();
  
  $scope.product = function(){
      BackendService.getproduct()
      .success(function(newItems) {
        $scope.products = newItems.product;
         var link ="http://localhost/server/larave_fw/doantotnghiep";
        $scope.url=link;
      })
      .finally(function() {
        // Stop the ion-refresher from spinning (not needed in this view)
        $scope.$broadcast('scroll.refreshComplete');
      });
  };

  // private method to add a product to cart
  var addProductToCart = function(product){
    $scope.cart.products.push(product);
    CartService.saveCart($scope.cart);
  };

  // method to add a product to cart via $ionicActionSheet
  $scope.addProduct = function(product){
    $ionicActionSheet.show({
       buttons: [
         { text: '<b>Add to cart</b>' }
       ],
       titleText: 'Buy ' + product.title,
       cancelText: 'Cancel',
       cancel: function() {
          // add cancel code if needed ..
       },
       buttonClicked: function(index) {
         if(index == 0){
           addProductToCart(product);
           return true;
         }
         return true;
       }
     });
  };

  //trigger initial refresh of products
  $scope.product();

})


.controller('ProductDetailCtrl',function($scope,$stateParams, $ionicActionSheet, BackendService, CartService){
  $scope.cart = CartService.loadCart();
  var currentId = $stateParams.id;
  $scope.product=function(){
    BackendService.getproduct().
    success ( function(result){
    var data =result.product;
    for (var i = 0; i < data.length; i++) {
    if(data[i].slug == currentId){
    $scope.products=data[i];
}
}
})
  }

// private method to add a product to cart
  var addProductToCart = function(product){
    $scope.cart.products.push(product);
    CartService.saveCart($scope.cart);
  };

  // method to add a product to cart via $ionicActionSheet
  $scope.addProduct = function(product){
    $ionicActionSheet.show({
       buttons: [
         { text: '<b>Add to cart</b>' }
       ],
       titleText: 'Buy ' + product.title,
       cancelText: 'Cancel',
       cancel: function() {
          // add cancel code if needed ..
       },
       buttonClicked: function(index) {
         if(index == 0){
           addProductToCart(product);
           return true;
         }
         return true;
       }
     });
  };

  
  $scope.product();
})
.controller('ShopDetailCtrl',function($scope, $stateParams, $ionicActionSheet, BackendService, CartService){
  $scope.cart = CartService.loadCart();
  var currentId = $stateParams.id;
   $scope.product = function(){
    BackendService.getpostcategory(currentId).
    success ( function(result){
    $scope.categorys= result.category;
})
    }



  var addProductToCart = function(product){
    $scope.cart.products.push(product);
    CartService.saveCart($scope.cart);
  };


  $scope.addProduct = function(product){
    $ionicActionSheet.show({
       buttons: [
         { text: '<b>Add to cart</b>' }
       ],
       titleText: 'Buy ' + product.title,
       cancelText: 'Cancel',
       cancel: function() {
          // add cancel code if needed ..
       },
       buttonClicked: function(index) {
         if(index == 0){
           addProductToCart(product);
           return true;
         }
         return true;
       }
     });
  };





  $scope.product();
})
// controller for "app.cart" view
.controller('CartCtrl', function($scope, CartService, $ionicListDelegate) {
  
  // using the CartService to load cart from localStorage
  $scope.cart = CartService.loadCart();
  
  // we assign getTotal method of CartService to $scope to have it available
  // in our template
  $scope.getTotal = CartService.getTotal;

  // removes product from cart (making in persistent)
  $scope.dropProduct = function($index){
    $scope.cart.products.splice($index, 1);
    CartService.saveCart($scope.cart);
    // as this method is triggered in an <ion-option-button> 
    // we close the list after that (not strictly needed)
    $ionicListDelegate.closeOptionButtons();

  }
})

.controller('CheckoutCtrl', function($scope, CartService, CheckoutService, $state) {
  
  $scope.cart = CartService.loadCart();
  var gh= CartService.loadCart();
//checkout
  $scope.checkout = function(data){
  var infodata={info : data, cart: gh.products };
    CheckoutService.postcart(infodata)
    .success(function(){
alert("Mua hàng thành công!");

    });
 


    
    // $scope.cart = CartService.resetCart();
    // $state.go('app.shop')
  }




 //  $scope.getTotal = function(cart){

 //    // var out = 0;
 //    // if(!cart || !cart.products || !angular.isArray(cart.products)){
 //    //   return out;
 //    // }
 //    // for(var i=0; i < cart.products.length; i++){
 //    //   console.log(i);
     
 //    // }
 // console.log(cart);
 //  };

});