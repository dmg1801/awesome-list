(function () {
    'use strict';
    
    angular.module('awesomeListApp', [])
    .controller('awesomeListAddController', awesomeListAddController)
    .controller('awesomeListShowController', awesomeListShowController)
    .service('ShoppingListService', ShoppingListService);
    
    awesomeListAddController.$inject = ['ShoppingListService'];
    function awesomeListAddController(ShoppingListService) {
      var listAdder = this;
    
      listAdder.text = "";
      listAdder.itemName = null;
      listAdder.itemQuantity = null;
    
      listAdder.addItem = function () {
        ShoppingListService.addItem(listAdder.itemName, listAdder.itemQuantity);

        //reset inputs
        listAdder.itemName = null;
        listAdder.itemQuantity = null;
      };
    }
    
    
    awesomeListShowController.$inject = ['ShoppingListService'];
    function awesomeListShowController(ShoppingListService) {
      var showList = this;
    
      showList.items = ShoppingListService.getItems();
    
      showList.removeItem = function (itemIndex) {
        ShoppingListService.removeItem(itemIndex);
      };
    }
    
    
    function ShoppingListService() {
      var service = this;
    
      // List of shopping items
      var items = [];
    
      service.addItem = function (itemName, quantity) {
        var item = {
          name: itemName,
          quantity: quantity
        };
        items.push(item);
      };
    
      service.removeItem = function (itemIdex) {
        items.splice(itemIdex, 1);
      };
    
      service.getItems = function () {
        return items;
      };
    }
    
    })();
    