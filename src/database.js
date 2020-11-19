//DATABASE CONNECTION
const mongoose = require('mongoose');

const URI = 'mongodb://localhost/dds'

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

module.exports = mongoose;
