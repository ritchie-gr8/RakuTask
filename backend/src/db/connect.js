import mongoose from "mongoose";

const connect = async () => {
  try {
    console.log('Attempting to connect to database...')
    await mongoose.connect(process.env.MONGO_URI, {})
    console.log('Connected to database successfully.')
  } catch (error) {
    console.error('Failed to connect to database:', error.message)
  }
}

export default connect