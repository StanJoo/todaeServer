/* /index.js */

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("./config/passport");
const app = express();


// DB setting
mongoose.connect("mongodb://localhost:27017/todae", { useNewUrlParser: true });
mongoose.set ( 'useCreateIndex', true); // **mongoose 버전에 따른 오류로 추가한 것
var db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");
});
db.on("error", err => {
  console.log("DB ERROR : ", err);
});


// Other settings
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(session({secret:"MySecret", resave:true, saveUninitialized:true}));


// Passport
app.use(passport.initialize());  //passport의 초기화
app.use(passport.session());     //passport를 session과 연결


// Custom Middlewares
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();  //로그인 여부 확인(t/f)
  res.locals.currentUser = req.user;
  next();
})


// Routes
app.use("/", require("./routes/home"));        //메인 화면 띄우기 라우터
app.use("/posts", require("./routes/posts"));  //게시물 CRUD 관련 라우터
app.use("/users", require("./routes/users"));  //회원가입 라우터
app.use("/contents", require("./routes/contents"));  //콘텐츠 라우터


// Port setting
var port = 8080
app.listen(port, function(){
  console.log("server on! http://localhost:"+port);
});
