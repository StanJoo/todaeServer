/* routes/home.js */
// 홈페이지 메인화면용 라우터

const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

// Home
router.get("/", (req, res) => {
  res.render("home/welcome");
});
router.get("/about", (req, res) => {
  res.render("home/about");
});
router.get("/board", (req, res) => {
  res.render("home/board");
});

// Login
router.get("/login", (req, res) => {
    const username = req.flash("username")[0];
    const errors = req.flash("errors")[0] || {};
    res.render("home/login", {
   username:username,
   errors:errors
  });
 });

 // Post Login (로그인 뷰용 라우터)
router.post("/login",
    (req, res, next) => {
        const errors = {};
        let isValid = true;
        if(!req.body.username){
  isValid = false;
  errors.username = "ID를 입력해주세요!";
 }
 if(!req.body.password){
  isValid = false;
  errors.password = "비밀번호를 입력해주세요!";
 }

 if(isValid){
  next();
 } else {
  req.flash("errors",errors);
  res.redirect("/login");
 }
},
passport.authenticate("local-login", {
 successRedirect : "/",
 failureRedirect : "/login"
}
));

// Logout (로그아웃용 라우터)
router.get("/logout", (req, res) => {
req.logout();
res.redirect("/");
});

module.exports = router;
