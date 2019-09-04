const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,dbName:'sismedic_daw'
}).then((db:any) =>{ console.log("mongodb is connected")}).
catch((err:any) => {
    console.error(err);
})