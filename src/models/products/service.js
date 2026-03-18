const { prisma } = require('../../config/prisma');

exports.getProducts = async (query) => {
  const where = {};

  if (query.category) {
    where.category = query.category;
  }

  if (query.location) {
    where.location = query.location;
  }

  const products = await prisma.equipment.findMany({
    where,
    include: {
      owner: {
        select: {
          id: true,
          businessName: true,
          contactName: true,
          phone: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const categoriesRaw = await prisma.equipment.findMany({
    distinct: ['category'],
    select: {
      category: true
    }
  });

  const categories = categoriesRaw.map(item => item.category);

  return {
    categories,
    products
  };
};