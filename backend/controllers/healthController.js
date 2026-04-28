exports.checkHealth = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'WaitLess API is up and running!',
    timestamp: new Date()
  });
};
