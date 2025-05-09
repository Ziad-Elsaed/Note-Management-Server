const { body, param, query } = require("express-validator");

const titleAndContentValid = [
    body("title").exists().withMessage("title is required")
        .notEmpty().withMessage("title shouldn't be empty")
        .trim()
        .isLength({ min: 3, max: 14 }).withMessage("title length should be between 5 and 14 characters"),

    body("content").exists().withMessage("content is required")
        .notEmpty().withMessage("content shouldn't be empty")
        .trim()
        .isLength({ min: 3, max: 500 }).withMessage("content should be between 3 and 500 character")
]

const idValid = [
    param("id").exists().withMessage("id is required")
        .isMongoId().withMessage("this id form is not correct")
]

module.exports = { titleAndContentValid, idValid };
