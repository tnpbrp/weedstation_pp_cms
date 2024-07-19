const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const bcrypt = require('bcryptjs');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findOne({ id });
        done(null, user);
    } catch (error) {
        done(error);
    }
});

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));


// passport.use(new FacebookStrategy({
//     clientID: FACEBOOK_APP_ID,
//     clientSecret: FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:1337/auth/facebook/callback",
//     profileFields: ['id', 'displayName', 'email']
// },
//     async (accessToken, refreshToken, profile, done) => {
//         try {
//             // ตรวจสอบหรือบันทึกข้อมูลผู้ใช้ที่ลงทะเบียนผ่าน Facebook
//             const user = await User.findOne({ facebookId: profile.id });

//             if (user) {
//                 return done(null, user);
//             }

//             const newUser = await User.create({
//                 facebookId: profile.id,
//                 displayName: profile.displayName,
//                 email: profile.emails[0].value // ต้องตรวจสอบว่า profile.emails มีค่าหรือไม่ก่อนใช้งาน
//             }).fetch();

//             return done(null, newUser);
//         } catch (error) {
//             return done(error);
//         }
//     }
// ));

// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:1337/auth/google/callback"
// },
//     async (accessToken, refreshToken, profile, done) => {
//         try {
//             // ตรวจสอบหรือบันทึกข้อมูลผู้ใช้ที่ลงทะเบียนผ่าน Google
//             const user = await User.findOne({ googleId: profile.id });

//             if (user) {
//                 return done(null, user);
//             }

//             const newUser = await User.create({
//                 googleId: profile.id,
//                 displayName: profile.displayName,
//                 email: profile.emails[0].value // ต้องตรวจสอบว่า profile.emails มีค่าหรือไม่ก่อนใช้งาน
//             }).fetch();

//             return done(null, newUser);
//         } catch (error) {
//             return done(error);
//         }
//     }
// ));



