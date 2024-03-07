import db from "../db";

// export const getVotes = async (req, res) => {
//   try {
//     const votes = await db.vote.findMany({
//       include: {
//         option: true,
//       },
//     });
//     res.json(votes);
//   } catch (error) {
//     console.error("Error getting votes:", error);
//     res.status(500).json({ error: "Failed to get votes" });
//   }
// };

export const castVote = async (req, res) => {
  try {
    const { optionId } = req.body;
    const { user } = req;

    const vote = await db.vote.create({
      data: {
        optionId,
        userId: user.id,
      },
    });

    res.json(vote);
  } catch (error) {
    console.error("Error casting vote:", error);
    res.status(500).json({ error: "Failed to cast vote" });
  }
};

export const getPollResults = async (req, res) => {
  try {
    const { id } = req.params;
    const poll = await db.poll.findUnique({
      where: {
        id,
      },
      include: {
        options: {
          include: {
            votes: true,
          },
        },
      },
    });

    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    const results = poll.options.map((option) => ({
      ...option,
      votes: option.votes.length,
    }));

    res.json(results);
  } catch (error) {
    console.error("Error getting poll results:", error);
    res.status(500).json({ error: "Failed to get poll results" });
  }
};
