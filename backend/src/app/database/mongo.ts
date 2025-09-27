import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://localhost:27017/meuBanco';

export async function connectMongo() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB conectado');
  } catch (err) {
    console.error('Erro de conexão com MongoDB:', err);
    process.exit(1);
  }
}
