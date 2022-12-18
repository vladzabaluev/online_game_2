const express = require('express')
const mongoose = require('mongoose')
const authRouter =  require('./routers/authRouter')

const PORT = process.env.PORT || 5000

const app =express()

app.use(express.json())
app.use("/auth", authRouter);
mongoose.set('strictQuery', false);

const start = async () => {
    try{
        await mongoose.connect(`mongodb+srv://Vlad:Zabaluev@cluster0.8nc1ovd.mongodb.net/online_game?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch(e) {
        console.log(e)
    }
}

start()