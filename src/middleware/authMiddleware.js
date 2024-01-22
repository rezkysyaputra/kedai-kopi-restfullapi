import { prisma } from '../app/database.js';

const authMiddleware = async (req, res, next) => {
  const token = req.get('Authorization');

  if (!token) {
    res.status(401).json({
      errors: 'unauthorized',
    });
  } else {
    const user = await prisma.user.findFirst({
      where: {
        token: token,
      },
    });

    if (!user) {
      res.status(401).json({
        errors: 'unauthorized',
      });
    } else {
      req.user = user;
      next();
    }
  }
};

export { authMiddleware };
