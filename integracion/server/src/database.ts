const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true
}).then((db:any) =>{ console.log("db is connected")}).
catch((err:any) => {
    console.error(err);
})