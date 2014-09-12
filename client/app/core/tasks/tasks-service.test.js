describe('tasks service', function() {
    // Load the angular module. Having smaller modules helps here.
    beforeEach(module('erg.tasks'));
    beforeEach(module(function($provide) {
        // Mock 'koast'.
        $provide.service('koast', function() {
            var service = {};
            var data = [{
                description: 'Mow the lawn',
                owner: 'alice',
                can: {
                    edit: true
                }
            }];

            service.user = {};

            service.user.whenAuthenticated = function() {
                return Q.when();
            }

            service.data = {
                username: 'alice'
            }
            service.queryForResources = sinon.spy(function() {
                var deferred = Q.defer();
                deferred.resolve(data);
                return deferred.promise;
            });

            return service;

        });
        

        // Mock $q. More on this later.
        $provide.service('$q', function() {
            return Q;
        });
    }));

    it('should get tasks', function() {
        var tasks = getService('tasks');
        var koast = getService('koast');
        return tasks.getTasks()
            .then(function(receivedTasks) {
                expect(receivedTasks.length).to.equal(1);
                koast.queryForResources.should.have.been.calledOnce;
            });
    });
});
