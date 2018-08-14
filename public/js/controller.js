angular.module('todoApp', [])
  .controller('TodoListController', function() {
    var todoList = this;

    todoList.archive = function(element) {
      console.log('clicked' + element.target);
    };
  });
