const { prisma } = require('../../config/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (data) => {
  const { email, password, role } = data;

  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (role === 'FARMER') {
    const farmer = await prisma.farmer.create({
      data: {
        name: data.name,
        phone: data.phone,
        address: data.address
      }
    });

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        farmerId: farmer.id
      }
    });

    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  if (role === 'BUSINESSMAN') {
    const businessman = await prisma.businessman.create({
      data: {
        businessName: data.businessName,
        contactName: data.contactName,
        phone: data.phone,
        address: data.address
      }
    });

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        businessId: businessman.id
      }
    });

    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  throw new Error('Invalid role');
};

exports.login = async (data) => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d'
    }
  );

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    token
  };
};