angular.module('myService.services', [])

// CartService is an example of service using localStorage 
// to persist items of the cart.
.factory('CartService', [function () {

  var svc = {};

  svc.saveCart = function(cart){
    window.localStorage.setItem('cart', JSON.stringify(cart));
  };

  svc.loadCart = function(){
    var cart = window.localStorage.getItem('cart');
    if(!cart){
      return { products : [ ] }
    }
    return JSON.parse(cart);
  };

  svc.resetCart = function(){
    var cart =  { products : [ ] };
    svc.saveCart(cart);
    return cart;
  };

  // svc.getTotal = function(cart){
  //   // var out = 0;
  //   // if(!cart || !cart.products || !angular.isArray(cart.products)){
  //   //   return out;
  //   // }
  //   // for(var i=0; i < cart.products.length; i++){
  //   //   out += cart.products[i].price;
  //   //   console.log(cart.products[i].price);
  //   // }
  //   console.log(cart) ;
  // }

  return svc;

}])

//backend service

.factory('BackendService', ['$http', function ($http) {

var link ="http://localhost/server/larave_fw/doantotnghiep/api/";
var dataservice={};

     dataservice.getconfig= function(){
     return $http.get( link+ "getconfig");  
     }
     dataservice.getinfo= function(){
      return $http.get(link + "getinfo");
     }
     dataservice.getquestion= function(){
      return $http.get(link + "getquestion");
     }
     dataservice.getslider= function(){
      return $http.get(link + "getslider");
     }
     dataservice.getquote= function(){
      return $http.get(link + "getquote");
     }
      dataservice.getcategory= function(){
      return $http.get(link + "getcategory");
     }
      dataservice.getpost= function(){
      return $http.get(link + "getpost");
     }
      dataservice.getproduct= function(){
      return $http.get(link + "getproduct");
     }
      dataservice.getchildcategory= function(id){
      return $http.get(link + "getchildcategory/"+id);
     }
     dataservice.getpostcategory= function(id){
      return $http.get(link + "getpostcategory/"+id);
     }
     dataservice.getpostindex= function(){
      return $http.get(link + "getpostindex");
     }
     return dataservice;

}])
.factory('CheckoutService',function($http){
var link ="http://localhost/server/larave_fw/doantotnghiep/api/";
var dataservice= {};
dataservice.postcart= function(data){
  return $http.post(link+ "postcart", data);
}
return dataservice;
});