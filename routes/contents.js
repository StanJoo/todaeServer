/* routes/contents.js */
// 홈페이지 콘텐츠화면용 라우터

const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

// Nav
router.get("/more", (req, res) => {
    res.render("contents/more");
});

router.get("/register", (req, res) => {
    res.render("contents/register");
});

router.get("/search", (req, res) => {
    res.render("contents/search");
});

module.exports = router;
