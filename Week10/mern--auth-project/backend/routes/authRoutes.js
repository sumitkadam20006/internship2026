const express = require("express");

const router = express.Router();


const passport =
require("../config/passport");


const {

register,

login,

logout,

profile

}
=
require("../controllers/authController");



const protect =
require("../middleware/authMiddleware");





// Normal Auth

router.post(
"/register",
register
);



router.post(
"/login",
login
);



router.post(
"/logout",
logout
);



router.get(
"/profile",
protect,
profile
);






// Google Login


router.get(

"/google",

passport.authenticate(

"google",

{
scope:[
"profile",
"email"
]

}

)

);



router.get(

"/google/callback",

passport.authenticate(

"google",

{
failureRedirect:
"http://localhost:5173/login"

}

),


(req,res)=>{


res.redirect(
"http://localhost:5173/dashboard"
);


}

);



module.exports = router;