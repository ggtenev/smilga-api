require('dotenv').config();
const connectDB = require("./db/connect");
const Job = require('./models/Job')
const jobs = require('./MOCK_DATA.json')

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Job.deleteMany()
    await Job.create(jobs)
    // app.listen(port, () =>
    //   console.log(`Server is listening on port ${port}...`)
    // );
  } catch (error) {
    console.log(error);
    process.exit()
  }
};

start();