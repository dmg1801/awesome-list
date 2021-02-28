(function () {
  'use strict';

  angular.module('awesomeListApp', [])
    .controller('awesomeListAddController', awesomeListAddController)
    .controller('awesomeListShowController', awesomeListShowController)
    .controller('awesomeListCookies', awesomeListCookies)
    .service('ShoppingListService', ShoppingListService);

  awesomeListAddController.$inject = ['ShoppingListService'];

  function awesomeListAddController(ShoppingListService) {
    var listAdder = this;

    listAdder.text = "";
    listAdder.itemName = null;
    listAdder.priority = null;
    listAdder.nothingToAdd = false;

    listAdder.addItem = function () {

      if (listAdder.itemName === null) {
        listAdder.nothingToAdd = true;
      } else {
        listAdder.nothingToAdd = false;
        ShoppingListService.addItem(listAdder.itemName, listAdder.priority);
      }

      //reset inputs
      listAdder.itemName = null;
      listAdder.priority = null;
    };


  }


  awesomeListShowController.$inject = ['ShoppingListService'];

  function awesomeListShowController(ShoppingListService) {
    var showList = this;



    showList.nothingToDo = function () {
      if (ShoppingListService.items == "") {
        return true;
      } else {
        return false;
      }
    };

    showList.everythingDone = function () {
      if (ShoppingListService.done == "") {
        return true;
      } else {
        return false;
      }
    };

    showList.items = ShoppingListService.getItems();
    showList.doneItems = ShoppingListService.doneItems();

    showList.removeItem = function (itemIndex) {
      ShoppingListService.removeItem(itemIndex);
    };

    showList.returnItem = function (itemIndex) {
      ShoppingListService.returnItem(itemIndex);
    };
  }

  awesomeListCookies.$inject = ['ShoppingListService'];
  function awesomeListCookies(ShoppingListService) {
    var cookiesList = this;

    cookiesList.cookieValue = "";
    cookiesList.showCookieMessage = true;

    cookiesList.acceptCookie = function () {
      $.cookie("cookieValue", "true");
      cookiesList.showCookieMessage = false;
      cookiesList.readcookie();
    };

    cookiesList.rejectCookie = function () {
      $.cookie("cookieValue", "false");
      cookiesList.showCookieMessage = true;
      cookiesList.readcookie();
    };

    cookiesList.readcookie = function () {
      cookiesList.cookieValue = $.cookie("cookieValue");
    };

    cookiesList.$onInit = function () {
      cookiesList.cookieValue = $.cookie("cookieValue");

      if ($.cookie("cookieValue") == "true") {
        cookiesList.showCookieMessage = false;
      } else {
        cookiesList.showCookieMessage = true;
      }
    };
  }


  function ShoppingListService() {
    var service = this;

    // List of shopping items
    service.items = [];

    service.done = [];


    service.addItem = function (itemName, priority) {
      var item = {
        name: itemName,
        quantity: priority
      };
      service.items.push(item);
    };

    service.removeItem = function (itemIndex) {

      var listToRemove = service.items.splice(itemIndex, 1)[0];
      service.done.push(listToRemove);
    };

    service.returnItem = function (itemIndex) {

      var listToReturn = service.done.splice(itemIndex, 1)[0];
      service.items.push(listToReturn);
    };

    service.getItems = function () {
      return service.items;
    };

    service.doneItems = function () {
      return service.done;
    };
  }


})();