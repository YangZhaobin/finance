/*
 * @Author: yangzhaobin 
 * @Date: 2018-03-07 15:57:21 
 * @Last Modified by: yangzhaobin
 * @Last Modified time: 2018-03-07 16:08:00
 */

'use strict';

const SERVER_CONFIG = require('../../config/server_config');
const APP_CONFIG = require('../../config/app_config');

const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    
    console.info(ctx.request.path);

});