import express from "express"
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import multer from "multer"




const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend's origin
    credentials: true, // Allow cookies to be sent and received
  }));


  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })
const upload = multer({ storage})
app.post('/api/upload', upload.single('file'), function (req, res) {
  const file = req.file;
  
  res.status(200).json(file.filename)
})

app.use("/api/posts",postRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)


app.listen(8800,()=>{
    console.log("Connected");
    
})