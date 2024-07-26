const colors = require('colors');

const logger = (req, res, next) => {
    const mthdsColors = {
        GET: 'green',
        POST: 'yellow', 
        PUT: 'blue', 
        DELETE: 'magenta',
    };

    const color = mthdsColors[req.method] || white;

    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`[color]);
    next();
};

module.exports = logger;