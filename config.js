'use strict';
exports.DATABASE_URL= process.env.MONGODB_URI || global.DATABASE_URL;
exports.PORT = process.env.PORT || 8080;