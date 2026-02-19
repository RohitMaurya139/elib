import mongoose from 'mongoose'
import { config } from './config.ts'


const connectDB = async () => {
  try {
      mongoose.connection.on('connected', () => {
          console.log("connected to DB successfully");
          
      })

      mongoose.connection.on('error', (err) => {
          console.log('error in connection to DB',err);
          
      })
      await mongoose.connect(config.database_Url as string);
  } catch (error) {
    console.error("Failed to connect with DB",error);
    process.exit(1)
  }
}

export default connectDB