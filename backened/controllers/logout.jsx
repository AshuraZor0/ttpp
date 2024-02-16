exports.logout = async (req, res) => {
  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  return res.status(200).clearCookie("token", options).json({
    message: "logout successful",
  });
};
