const router = require('express').Router();

// router.use('/authentication', require('./user'));
router.use('/authentication', require('./user-login.routes'));
router.use('/authentication', require('./user-profile.routes'));
// router.use('/authentication', require('./user-role.routes'));

// router.use('/companies', require('./company.routes'));
// router.use('/companies', require('./branch.routes'));
// router.use('/companies', require('./company-type.routes'));

// router.use('/sellers', require('./product.routes'));
// router.use('/sellers', require('./product-variant.routes'));
// router.use('/sellers', require('./package.routes'));

// router.use('/sellers', require('./number.routes'));

// router.use('/inventory', require('./grn.routes'));
// router.use('/inventory', require('./order.routes'));
// router.use('/inventory', require('./invoice.routes'));
// router.use('/inventory', require('./grn-payment.routes'));
// router.use('/inventory', require('./stock.routes'));

router.use('/settings', require('./uom.routes'));
router.use('/settings', require('./type.routes'));
// router.use('/settings', require('./attribute.routes'));
// router.use('/settings', require('./package-type.routes'));
// router.use('/settings', require('./supplier.routes'));

// router.use('/public', require('./public.routes'));

// router.use('/file', require('./file.routes'));

module.exports = router;