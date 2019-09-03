"use strict";
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, dbName: 'sismedic_daw'
}).then((db) => { console.log("mongodb is connected"); }).
    catch((err) => {
    console.error(err);
});
