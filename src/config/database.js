const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
      "mongodb+srv://pradeep:JmGl0V2EKBQm45u3@namastenode.hk8a9.mongodb.net/devTinder"
    );
};

module.exports = connectDB;