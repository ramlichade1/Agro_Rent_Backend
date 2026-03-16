const service = require('./service');

exports.registerFarmer = async (req, res) => {
  try {
    const result = await service.registerFarmer(req.body);

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};