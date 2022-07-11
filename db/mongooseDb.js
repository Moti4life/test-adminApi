const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL,  { 
    // useNewUrlParser: true ,
    // useUnifiedTopology: true,
    // useFindAndModify: false 
    // https://stackoverflow.com/a/68962378
})
