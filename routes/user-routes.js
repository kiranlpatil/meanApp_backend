const express = require("express");
const userController = require("../controllers/user-controller");
const customInterceptor = require("../interceptors/custom-interceptor")

const router = express.Router();

/**
 * @swagger
 * /api/user/sign-up :
 *  post:
 *    consumes:
 *      - application/x-www-form-urlencoded
 *
 *    parameters:
 *      - in: formData
 *        name: firstName
 *        required: true
 *        schema:
 *          type:string
 *        description: first name
 *
 *      - in: formData
 *        name: lastName
 *        required: true
 *        schema:
 *          type:string
 *        description: last name
 *
 *      - in: formData
 *        name: email
 *        required: true
 *        schema:
 *          type:string
 *        description: email
 *
 *      - in: formData
 *        name: mobileNumber
 *        required: true
 *        schema:
 *          type:number
 *        description: mobile number
 *
 *      - in: formData
 *        name: city
 *        required: true
 *        schema:
 *          type:string
 *        description: city
 *
 *      - in: formData
 *        name: password
 *        required: true
 *        schema:
 *          type:string
 *        description: password
 *    description: add user
 *    responses:
 *      '200':
 *        description: User added to db
 */

router
  .route("/sign-up")
  .post(customInterceptor.checkBody, userController.addUser);

/**
 * @swagger
 * /api/user/login :
 *  post:
 *    consumes:
 *      - application/x-www-form-urlencoded
 *
 *    parameters:
 *      - in: formData
 *        name: email
 *        required: true
 *        schema:
 *          type:string
 *        description: email
 *
 *      - in: formData
 *        name: password
 *        required: true
 *        schema:
 *          type:string
 *        description: password
 *
 *    description: Validating Password
 *    responses:
 *      '200':
 *        description: Account validated successfully
 */

router
    .route("/login")
    .post(customInterceptor.checkBody, userController.loginUser);


module.exports = router;
