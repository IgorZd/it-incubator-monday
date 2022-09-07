import { body } from "express-validator";

export const authorValidation = body("author")
  .trim()
  .isLength({ min: 1, max: 20 })
  .withMessage("Author should have length from 1 until 30");

export const descriptionValidation = body("description")
  .trim()
  .isLength({ min: 1, max: 90 })
  .withMessage("Description should have length from 1 until 30");
