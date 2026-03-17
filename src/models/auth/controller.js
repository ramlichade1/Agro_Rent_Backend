const service = require('./service');
const { signupSchema, loginSchema } = require('./validation');

exports.signup = async (req, res) => {
  try {
    const { error } = signupSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    const result = await service.signup(req.body);

    res.status(201).json({
      success: true,
      data: result
    });

  } catch (error) {
    if (error.message === 'Email already exists') {
      return res.status(409).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    const result = await service.login(req.body);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    if (
      error.message === 'User not found' ||
      error.message === 'Invalid password'
    ) {
      return res.status(401).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};