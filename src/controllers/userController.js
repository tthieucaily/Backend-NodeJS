let handleLogin = (req, res) => {
  let email = req.body.email;
  let pass = req.body.password;
  if (!email || !pass) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }
  return res.status(200).json({
    errCode: 0,
    userName: email,
    passWord: pass,
    message: "login cucsess!",
  });
};

module.exports = {
  handleLogin: handleLogin,
};
