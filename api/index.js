import app from './app.js'
import mongoose from "mongoose";


mongoose.Promise= global.Promise;
mongoose.connect('mongodb+srv://3techpfinal:3techpfinal@cluster0.8tjjl.mongodb.net/test',
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(async () => {console.log('Connected to DB : 3techpfinal')
app.listen(3000, () => {
  console.log('Server at port 3000'); 
});
})
.catch(err => console.error('[db]', err));