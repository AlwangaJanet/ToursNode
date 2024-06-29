import express, {json} from 'express'
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/usersRoutes'
import tourRoutes from './routes/tourRoutes'
import hotelRoutes from './routes/hotelRoutes'
import cors from 'cors'



const app = express()  //  initialize the application


app.use(json())        //add a body to the requests
app.use(cors())          

// add all the middlewares and urls
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/tours', tourRoutes)
app.use('/hotels', hotelRoutes)






// start the application
app.listen(4000,()=>{
    console.log('Server Running..')
})
