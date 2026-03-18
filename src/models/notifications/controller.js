const service = require('./service');

exports.getCount = async (req, res) => {
  try {
    const result = await service.getCount();

    res.status(200).json({
      success: true,
      count: result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};