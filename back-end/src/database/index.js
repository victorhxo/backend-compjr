import mongoose from 'mongoose';

mongoose
  .connect('mongodb://127.0.0.1/locaminas', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then()
  .catch((err) => {
    console.log(err);
  });

mongoose.Promise = global.Promise;

export default mongoose;
