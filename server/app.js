var koast = require('koast');
koast.config.setEnvironment().then(koast.serve); // Default to NODE_ENV or 'local'
