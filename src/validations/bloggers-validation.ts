import { body } from "express-validator";

export const nameValidation = body("name")
  .trim()
  .isLength({ min: 1, max: 15 })
  .withMessage("Name should consist from 1 to 15 symbols");

export const youtubeUrlValidationFormat = body("youtubeUrl")
  .trim()
  // .isLength({ min: 1, max: 100 })
  // .withMessage("YoutubeUrl should consist from 1 to 100 symbols")
  .matches(
    /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/^.{1,100}?$/
  )
  .withMessage("Incorrect format of url");

// export const youtubeUrlValidationLength = body("youtubeUrl")
//   .trim()
//   .isLength({ min: 1, max: 100 })
//   .withMessage("YoutubeUrl should consist from 1 to 100 symbols");
