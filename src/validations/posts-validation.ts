import { body } from "express-validator";

export const titleValidation = body("title")
  .trim()
  .isLength({ min: 1, max: 30 })
  .withMessage("Title should have length from 1 until 30");
export const shortDescriptionValidation = body("shortDescription")
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("Short description should have length from 1 until 100");
export const contentValidation = body("content")
  .trim()
  .isLength({
    min: 1,
    max: 1000,
  })
  .withMessage("Content should have length from 1 until 1000");

export const bloggerIdValidation = body("bloggerId")
  .trim()
  .isLength({ min: 2 })
  .withMessage("BloggerId is required");
