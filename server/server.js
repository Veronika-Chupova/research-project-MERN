import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

// Deployment path
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..', 'client', 'build')

const PORT = process.env.PORT || 3500

const app = express()
dotenv.config()

//DB connection
const connectionURI = String(process.env.MONGO_URI)
mongoose
    .connect(connectionURI)
    .catch (error => console.log(error))

//GLOBAL MIDDLEWARE
app.use(express.static(root))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

//DB scheming
const sampleSchema = new mongoose.Schema ({
    device: String,
    consent: Object,
    userContent: Object,
    keyboard: Array,
    numboard: Array,
    log: Array
  })
const Sample = mongoose.model("Sample",sampleSchema)

//Making Server to serve react app

// const buildPath = path.join(__dirname,'../client/build')
app.get("*", (req, res) => {
    res.sendFile('index.html', { root })
})

// app.get('/*', (req,res) => {
//     res.sendFile(
//         // /Users/veronika/Desktop/Web Dev/Dissertation/project/client/build/index.html
//         (buildPath + '/index.html'),
//         // path.join(_dirname, '/client/build/index.html'),
//         err => {
//             console.log('shit happened')
//             if (err) {
//                 res.status(500).send(err)
//             }
//         }
//     )
// })


// app.get('/', (req, res) => {
//     res.send ('Hello World!')
// })

//API
app.post('/submission', (req, res) => {
    const { userDevice, userConsent, userData, keyboard, numboard, userLog } = req.body
    const newSample = new Sample ({
        device: userDevice,
        consent: userConsent,
        userContent: userData,
        keyboard: keyboard,
        numboard: numboard,
        log: userLog
      })
      newSample.save()
    res.send ('OK')
})


app.listen(PORT, () => {
    console.log(root)
    console.log ('Server is Up on Port 3500')
})