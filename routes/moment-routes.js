const express = require("express");
const momentController = require("../controllers/moment-controller");
const customInterceptor = require("../interceptors/custom-interceptor")
const authenticate = require("../middlewares/auth");

const router = express.Router();

/**
 * @swagger
 * /api/moment :
 *  post:
 *    consumes:
 *      - application/x-www-form-urlencoded
 *
 *    parameters:
 *      - in: formData
 *        name: title
 *        required: true
 *        schema:
 *          type:string
 *        description: title
 *
 *      - in: formData
 *        name: tags
 *        schema:
 *          type:[string]
 *        description: tags
 *
 *      - in: formData
 *        name: imageUrl
 *        required: true
 *        schema:
 *          type:string
 *        description: imageUrl
 *
 *      - in: formData
 *        name: token
 *        required: true
 *        schema:
 *          type:string
 *        description: token
 *
 *    description: add new moment
 *    responses:
 *      '200':
 *        description: Moment added to db
 */

router
  .route("/")
  .post(customInterceptor.checkBody, authenticate.authenticateUser, momentController.addMoment);

/**
 * @swagger
 * /api/moment/{id} :
 *  patch:
 *    consumes:
 *      - application/x-www-form-urlencoded
 *
 *    parameters:
 *      - in: formData
 *        name: title
 *        required: true
 *        schema:
 *          type:string
 *        description: title
 *
 *      - in: formData
 *        name: tags
 *        schema:
 *          type:[string]
 *        description: tags
 *
 *      - in: formData
 *        name: imageUrl
 *        required: true
 *        schema:
 *          type:string
 *        description: imageUrl
 *
 *      - in: formData
 *        name: token
 *        required: true
 *        schema:
 *          type:string
 *        description: token
 *
 *    description: update existing moment
 *    responses:
 *      '200':
 *        description: Moment updated to db
 */

router
    .route("/:id")
    .patch(customInterceptor.checkBody, authenticate.authenticateUser, momentController.updateMoment);

/**
 * @swagger
 * /api/moment/{id} :
 *  delete:
 *    consumes:
 *      - application/x-www-form-urlencoded
 *
 *    parameters:
 *      - in: formData
 *        name: id
 *        required: true
 *        schema:
 *          type:string
 *        description: id
 *
 *      - in: formData
 *        name: token
 *        required: true
 *        schema:
 *          type:string
 *        description: token
 *
 *    description: delete moment
 *    responses:
 *      '200':
 *        description: Moment removed from db
 */

router
    .route("/:id")
    .delete(authenticate.authenticateUser, momentController.deleteMoment);

/**
 * @swagger
 * /api/moment/{size}/{page} :
 *  get:
 *    consumes:
 *      - application/x-www-form-urlencoded
 *
 *    parameters:
 *      - in: formData
 *        name: size
 *        required: true
 *        schema:
 *          type:number
 *        description: size
 *
 *      - in: formData
 *        name: page
 *        required: true
 *        schema:
 *          type: number
 *        description: page
 *
 *      - in: formData
 *        name: token
 *        required: true
 *        schema:
 *          type:string
 *        description: token
 *
 *    description: Get moments
 *    responses:
 *      '200':
 *        description: Moment received from db
 */

router
    .route("/:size/:page")
    .get(authenticate.authenticateUser, momentController.getMoments);


module.exports = router;
