import { Router } from "express";
import {
  createPoll,
  deletePoll,
  getPolls,
  getUserPolls,
} from "./controllers/poll";
import { errorHandler } from "./middlewares/errorHandler";
import { body } from "express-validator";
import { castVote, getPollResults } from "./controllers/vote";

const router = Router();

// poll routes

router.post(
  "/polls",
  body("title").isString(),
  body("description").isString().optional(),
  body("options")
    .isArray({ min: 2 })
    .withMessage("At least 2 options are required"),
  errorHandler,
  createPoll
);
router.get("/feed", getPolls);
router.get("/polls", getUserPolls);
router.delete("/polls/:id", deletePoll);

router.post("/cast-vote", body("optionId").isString(), errorHandler, castVote);

router.get("/poll-results/:id", getPollResults);

export default router;
