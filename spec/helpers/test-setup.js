require("@babel/register")({ extensions: ['.js', '.jsx', '.ts', '.tsx'] });
require('rxdb').plugin(require('pouchdb-adapter-memory'));