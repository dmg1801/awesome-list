(function () {
  'use strict';

  angular.module('awesomeListApp', [])
    .controller('awesomeListAddController', awesomeListAddController)
    .controller('awesomeListShowController', awesomeListShowController)
    .controller('doneListShowController', doneListShowController)
    .service('ShoppingListService', ShoppingListService);

  awesomeListAddController.$inject = ['ShoppingListService'];

  function awesomeListAddController(ShoppingListService) {
    var listAdder = this;

    listAdder.text = "";
    listAdder.itemName = null;
    listAdder.priority = null;

    listAdder.addItem = function () {
      ShoppingListService.addItem(listAdder.itemName, listAdder.priority);

      //reset inputs
      listAdder.itemName = null;
      listAdder.priority = null;
    };
  }

  awesomeListShowController.$inject = ['ShoppingListService'];

  function awesomeListShowController(ShoppingListService) {
    var showList = this;

    showList.items = ShoppingListService.getItems();

    showList.removeItem = function (itemIndex) {
      ShoppingListService.removeItem(itemIndex);
      ShoppingListService.addDoneItem(itemIndex);
    };
  }


  doneListShowController.$inject = ['ShoppingListService'];

  function doneListShowController(ShoppingListService) {
    var doneList = this;

    doneList.items = ShoppingListService.getDoneItems();

    doneList.itemName = null;
    doneList.priority = null;

  }


  function ShoppingListService() {
    var service = this;

    // List of shopping items
    var items = [];

    var doneItems = [];

    service.addItem = function (name, priority) {
      var item = {
        name: name,
        priority: priority
      };
      items.push(item);
    };

    service.addDoneItem = function (name, priority) {
      var doneItem = {
        name: name,
        priority: priority
      };
      doneItems.push(doneItem);
    };

    service.removeItem = function (itemIdex) {
      items.splice(itemIdex, 1);
    };

    service.getItems = function () {
      return items;
    };

    service.getDoneItems = function () {
      return doneItems;
    };
  }

})();