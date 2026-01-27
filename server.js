const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const path = require("path");
const db = require("./db");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// ✅ Сессии и Passport
app.use(
  session({
    secret: "secret-key-change-it",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10000, // 10 секунд
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session()); // ✅ Обязательно для сессий

// ✅ ИСПРАВЛЕНО: сериализуем весь объект или ID как строку
passport.serializeUser((user, done) => {
  done(null, user.id); // или done(null, user.username) если id нет
});

passport.deserializeUser((id, done) => {
  db.get("SELECT * FROM users WHERE id = ?", [id], (err, user) => {
    done(err, user); // ✅ Стрелочная функция с блоком {}
  });
});

// ✅ LocalStrategy (добавлен пароль в compare)
passport.use(
  new LocalStrategy(
    { usernameField: "username" },
    (username, password, done) => {
      db.get(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err, user) => {
          if (err) return done(err);
          if (!user || !bcrypt.compareSync(password, user.password)) {
            return done(null, false);
          }
          return done(null, user);
        },
      );
    },
  ),
);

// ✅ Middleware
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

// ✅ Корень
app.get("/", ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "prot/index.html"));
});

// ✅ Логин
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login?error=Неверный логин/пароль",
  }),
);

// ✅ Регистрация
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);
  db.run(
    "INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)",
    [username, hashed],
    function (err) {
      // ✅ callback function(err)
      if (err) return res.status(400).send("Пользователь существует");
      res.redirect("/login");
    },
  );
});

// ❌ БЫЛО: req.logout(() => ...) — новая версия Passport требует callback
// ✅ ИСПРАВЛЕНО для Passport v0.6+
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    // ✅ Правильный синтаксис
    if (err) return next(err);
    res.redirect("/login");
  });
});

app.listen(3000, () => console.log("Сервер: http://localhost:3000"));
