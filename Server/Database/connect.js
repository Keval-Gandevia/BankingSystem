const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://jenilgandhi2111:Jenil@2001@cluster0.u178g.mongodb.net/Banking_system?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false

}).then(() => {
    console.log("Mongo DataBase Connected")
}).catch(() => {
    console.log("Error connecting Mongo Database")
})