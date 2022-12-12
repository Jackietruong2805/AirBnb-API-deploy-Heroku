const express = require('express');
const rootRoutes = express.Router();
const phongRoute = require('./phongRoute');
const viTriRoute = require('./viTriRoute');
const nguoiDungRoute = require('./nguoiDungRoute');
const datPhongRoute = require('./datPhongRoute');
const binhLuanRoute = require('./binhLuanRoute');
const authRoute = require('./authRoute');

rootRoutes.use(authRoute);
rootRoutes.use(phongRoute);
rootRoutes.use(viTriRoute);
rootRoutes.use(nguoiDungRoute);
rootRoutes.use(datPhongRoute);
rootRoutes.use(binhLuanRoute);



module.exports = rootRoutes
