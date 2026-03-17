const service = require('./service');

exports.getProducts = async (req, res) => {
  try {
    const result = await service.getProducts();

    res.status(200).json({
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