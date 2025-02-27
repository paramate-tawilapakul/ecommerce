const express = require('express');
const router = express.Router();

const {
  create,
  productById,
  read,
  list,
  listRelated,
  listCategories,
  listBySearch,
  photo,
  remove,
  update,
} = require('../controllers/product');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/products', list);
router.get('/products/related/:productId', listRelated);
router.get('/products/categories', listCategories);
router.post('/products/by/search', listBySearch);
router.get('/products/photo/:productId', photo);

router.get('/product/:productId', read);
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;
