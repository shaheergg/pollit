import db from "../db";
export const createPoll = async (req, res) => {
  try {
    const { title, description, options } = req.body;
    const { user } = req;

    // Creating the poll
    const poll = await db.poll.create({
      data: {
        title,
        description,
        options: {
          create: options.map((option) => ({
            text: option.text,
          })),
        },
        authorId: user.id,
      },
    });

    // Sending the response
    res.json(poll);
  } catch (error) {
    // Handling errors
    console.error("Error creating poll:", error);
    res.status(500).json({ error: "Failed to create poll" });
  }
};
export const getPolls = async (req, res) => {
  try {
    const polls = await db.poll.findMany({
      include: {
        options: true,
      },
    });
    res.json(polls);
  } catch (error) {
    console.error("Error getting polls:", error);
    res.status(500).json({ error: "Failed to get polls" });
  }
};
export const getUserPolls = async (req, res) => {
  try {
    const { user } = req;
    const polls = await db.poll.findMany({
      where: {
        authorId: user.id,
      },
      include: {
        options: true,
      },
    });
    res.json(polls);
  } catch (error) {
    console.error("Error getting user polls:", error);
    res.status(500).json({ error: "Failed to get user polls" });
  }
};

export const deletePoll = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const poll = await db.poll.findUnique({
      where: {
        id: id,
      },
      select: {
        authorId: true,
      },
    });
    if (poll.authorId !== user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    await db.poll.delete({
      where: {
        id: id,
      },
    });
    res.json({ message: "Poll deleted" });
  } catch (error) {
    console.error("Error deleting poll:", error);
    res.status(500).json({ error: "Failed to delete poll" });
  }
};
