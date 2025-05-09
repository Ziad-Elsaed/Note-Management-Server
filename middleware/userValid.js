const { body, param, query } = require("express-validator");

const regestValidtion = [
    body("name").exists().withMessage("name is required")
        .notEmpty().withMessage("name shouldn't be empty")
        .trim()
        .isLength({ min: 3, max: 14 }).withMessage("name length is not between 5 and 14 characters"),

    body("email").exists().withMessage("email is required")
        .trim().notEmpty().withMessage("email shouldn't be empty")
        .trim()
        .isEmail().withMessage("email format is not correct"),

    body("pass").exists().withMessage("pass is required")
        .notEmpty().withMessage("pass shouldn't be empty")
        .trim()
        .isLength({ min: 6, max: 16 }).withMessage("pass should contain 6 to 16 characters")
]

const loginValidtion = [
    body("email").exists().withMessage("email is required")
        .notEmpty().withMessage("email shouldn't be empty")
        .trim()
        .isEmail().withMessage("email format is not correct"),

    body("pass").exists().withMessage("pass is required")
        .notEmpty().withMessage("pass shouldn't be empty")
        .trim()
        .isLength({ min: 6, max: 16 }).withMessage("pass should contain 6 to 16 characters")
]

module.exports = { regestValidtion, loginValidtion };

