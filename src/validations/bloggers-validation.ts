import { body } from "express-validator";

export const nameValidation = body("name")
  .not()
  .exists()
  .withMessage("Name doesn't exist")
  .exists()
  .withMessage("Name is empty")
  .trim()
  .isLength({ min: 1, max: 15 })
  .withMessage("Name should consist from 1 to 15 symbols");

export const youtubeUrlValidation = body("youtubeUrl")
  .exists()
  .withMessage("YoutubeUrl is empty")
  .trim()
  .matches(
    /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/
  )
  .withMessage("Incorrect format of url")
  .isLength({ min: 1, max: 100 })
  .withMessage("YoutubeUrl should consist from 1 to 100 symbols");
