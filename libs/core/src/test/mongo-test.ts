import mongoose from 'mongoose';

async function testMongoConnection() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://localhost:27018/emotion_viva');

    console.log('MongoDB 连接成功');
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('现有集合:', collections);
    await mongoose.connection.close();
  } catch (error) {
    console.error('MongoDB 连接失败:', error);
    console.error('错误代码:', error.code);
    console.error('错误名称:', error.codeName);
  }
}

testMongoConnection(); 