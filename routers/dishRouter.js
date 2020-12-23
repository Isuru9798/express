const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('send you to all dishes');
    })
    .post((req, res, next) => {
        res.end('add the new dish: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('this route not support to PUT')
    })
    .delete((req, res, next) => {
        res.end('Delete All Dishes')
    });

dishRouter.route('/:dishId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('send you to dishes: ' + req.params.dishId);
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST method not support for this!');
    })
    .put((req, res, next) => {
        res.write('updating dish: ' + req.params.dishId + ' \n');
        res.end('update dish: ' + req.params.dishId)
    })
    .delete((req, res, next) => {
        res.end('Delete dish: ' + req.params.dishId)
    });
module.exports = dishRouter;