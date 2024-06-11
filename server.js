const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const requestIp = require('request-ip');
const bodyParser = require("body-parser");
const http = require('http');
const mongoose = require("mongoose")
const socketIO = require('socket.io');
const { Server } = require('socket.io');
// const bookCategory = require('./socket/bookCategorySocket.js');
// const acceptBookCategory = require('./socket/acceptBookSocket.js');
// const book = require('./socket/bookSocket.js');


const app = express()

// const server = require('http').createServer(app)
// const io = require('socket.io').Server()


// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(requestIp.mw());
app.use(bodyParser.json());






mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1/job')
    .then(() => console.log('Connection Successfull!'))
    .catch((err) => console.log(err));




const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1/job')
        console.log("Successfully Connected")
    } catch (error) {
        console.log('Error in connecting DataBase ${error}.bgRed.white')
    }
}

connectMongoDB()





// const server = http.createServer(app);
// const io = socketIO(server);


// routers
const notificationRouter = require('./routes/notificationRoutes.js')
const recruitRouter = require('./routes/recruitRoutes.js')
const employeRouter = require('./routes/employeRoutes.js')
const managerRouter = require('./routes/managerRoutes.js')
const postJobRouter = require('./routes/postJobRoutes.js')
const applyJobRouter = require('./routes/applyJobRoutes.js')
const userRouter = require('./routes/userRoutes.js')
const loginRouter = require('./routes/loginRoutes.js');
const { url } = require('./config/dbConfig.js');









app.use('/job/notification', notificationRouter)
app.use('/job/manager', managerRouter)
app.use('/job/postJob', postJobRouter)
app.use('/job/applyJob', applyJobRouter)
app.use('/job/recruit', recruitRouter)
app.use('/job/user', userRouter)
app.use('/job/employe', employeRouter)
app.use('/job/login',loginRouter)






app.use(express.static(__dirname + '/Images'))




// testing
app.get('/', (req, res) => {
    res.json({ message: 'Success' })
})


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

const server = require('http').createServer(app)
server.listen(8001)

const io = new Server(server, {
    cors: {
        cors: true,
    }
})


// const io = new Server()


// bookCategory(io)
// acceptBookCategory(io)
// book(io) 