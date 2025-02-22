const express = require('express');
const router = express.Router();

const {
  create,
  categoryById,
  read,
  list,
  update,
  remove,
} = require('../controllers/category');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get(
  '/category/:categoryId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  read
);
router.get('/categories', list);
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
router.put(
  '/category/:categoryId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.delete(
  '/category/:categoryId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);

router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;
