const { prisma } = require('../../config/prisma');

exports.getCount = async () => {
  const count = await prisma.notification.count({
    where: {
      isRead: false
    }
  });

  return count;
};