const express = require("express");
const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require('path')
//dotenv conig
dotenv.config();

//mongodb connection
connectDB();

//rest obejct
const app = express();

//middlewares
app.use(express.json());
app.use(moragan("dev"));

//routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

//----------------- deployement code-----------------
const __dirname1 = path.resolve()
if (process.env.NODE_MODE == 'production') {
  app.use(express.static(path.join(__dirname1, './client/build')))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
  })

}
else {

  //port
  const port = process.env.PORT || 8080;
  //listen port
  app.listen(port, () => {

    app.get('/',(req,res)=>{
      res.send("all done and running")
    })
    console.log(
      `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
        .bgCyan.white
    );
  });
}
