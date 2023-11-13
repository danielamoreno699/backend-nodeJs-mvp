import "dotenv/config"
import {connect} from 'mongoose'



const dbConnect = async() => {

    try { 
        const DB_URI = <string>process.env.DB_URI;
        await connect(DB_URI)

        console.log('Database connected')
    } catch (error) {
        console.log(error)
        throw new Error('Error connecting to database')
    }
 
}

export default dbConnect;