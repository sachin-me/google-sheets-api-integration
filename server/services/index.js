const services = {
  getToken: (req, res) => {
    const token = req.headers && req.headers.cookie && req.headers.cookie.split('token=')[1] && req.headers.cookie.split('token=')[1].split(';')[0] || null;
    return token;
  }
};

module.exports = services;