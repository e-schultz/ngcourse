angular.module('erg.tasks', [
    'erg.server',
    'koast'
])

.factory('tasks', function($http, server, koast) {
    var service = {};

    service.getTasks = function() {
        return koast.user.whenAuthenticated()
            .then(function() {
                return koast.queryForResources('tasks-plus');
            })
            .then(function(tasks) {
                tasks.forEach(function(task) {
                    console.log(task, task.can.edit);
                });
                return tasks;
            });
    };

    service.addTask = function(task) {
        return koast.user.whenAuthenticated()
            .then(function() {
                return koast.createResource('tasks-plus', task);
            });
    }

    service.updateTask = function(id, task) {
        
        return koast.user.whenAuthenticated()
            .then(function() {
                return server.put('/api/v1/tasks', id, {
                    owner: task.owner,
                    description: task.description
                });
            });
    }

    service.getTask = function(id) {
        return koast.user.whenAuthenticated()
            .then(function() {
                return koast.getResource('tasks-plus', {
                    _id: id
                });

            });
    }
    // service.getMyTasks = function () {
    //   return service.getTasks()
    //     .then(function(tasks) {
    //       return filterTasks(tasks, {
    //         owner: user.username
    //       });
    //     });
    // };

    return service;
});
