const User = require("../models/User");
const parseVErr = require("../utils/parseValidationErrs");
const csrf = require("host-csrf");

const registerShow = (req, res) => {
  res.render("register");
};

// const registerDo = async (req, res, next) => {
//   if (req.body.password != req.body.password1) {
//     req.flash("error", "The passwords entered do not match.");
//     res.render("register", { errors: req.flash.errors });
//   }
//   try {
//     await User.create(req.body);
//   } catch (e) {
//     console.error(e);
//     if (e.constructor.name === "ValidationError") {
//       parseVErr(e, req);
//     } else if (e.name === "MongoServerError" && e.code === 11000) {
//       req.flash("error", "That email address is already registered.");
//     } else {
//       return next(e);
//     }
//     return res.render("register");
//   }
//   res.redirect("/");
// };

const registerDo = async (req, res, next) => {
  let validation_errors = false;
  if (req.body.password != req.body.password1) {
    req.flash("error", "The passwords entered do not match.");
    validation_errors = true;
  }

  try {
    await User.create(req.body);
  } catch (e) {
    console.error(e);
    if (e.constructor.name === "ValidationError") {
      parse_v(e, req);
    } else if (e.name === "MongoServerError" && e.code === 11000) {
      req.flash("error", "That email address is already registered.");
    } else {
      return next(e);
    }
    validation_errors = true;
  }

  // if there are no validation errors then redirect to main paige
  // else pass errors to be rendered in the register view

  if (!validation_errors) {
    res.redirect("/");
  } else {
    return res.render("register", { errors: req.flash("error") });
  }
};

const logoff = (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
};

const logonShow = (req, res) => {
  if (req.user) {
    csrf.refresh(req, res);
    return res.redirect("/");
  }
  res.render("logon");
};

module.exports = {
  registerShow,
  registerDo,
  logoff,
  logonShow
};
