angular.module('erg', [
  'erg.main-ctrl',
  'erg.tasks',
  // 'erg.router',
  'koast'
])

.run(function($log, koast) {
  $log.info('All ready!');
  koast.init({
  //  baseUrl: 'http://ngcourse.herokuapp.com',
  baseUrl: 'http://localhost:3001'
  });
  //koast.setApiUriPrefix('http://ngcourse.herokuapp.com/api/v1/');
  koast.setApiUriPrefix('/api/v1/');
  koast.addEndpoint('tasks-plus', ':taskId');
});

