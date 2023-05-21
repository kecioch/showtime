const express = require("express");
const router = express.Router();

const { authorization } = require("../services/Authentication");
const { ROLES } = require("../constants");
const authAdmin = authorization(ROLES.ADMIN);

const ScheduledScreening = require("../models/ScheduledScreening");
const Screening = require("../models/Screening");
const Movie = require("../models/Movie");

const {
  weekdayToIndex,
  indexToWeekDay,
  getNextDate,
} = require("../services/Weekdays");

// BASIC URL /screenings

router.get("/", async (req, res) => {
  const { title } = req.query;
  console.log(`GET /screenings?title=${title}`);
  try {
    // Find movie
    const movie = await Movie.findOne({ title });

    if (!movie) return res.status(404).json({ message: "not found" });

    // Find schedule of movie
    const screeningsScheduled = await ScheduledScreening.find({ movie });

    // Find / create screenings for every scheduled screening
    const screenings = await Promise.all(
      screeningsScheduled.map(async (scheduledScreening) => {
        const dayIndex = weekdayToIndex(scheduledScreening.weekday);
        const nextDate = getNextDate(dayIndex);
        const screeningFound = await Screening.aggregate([
          {
            $lookup: {
              from: "scheduledscreenings",
              localField: "scheduledScreening",
              foreignField: "_id",
              as: "scheduledScreening",
            },
          },
          {
            $unwind: "$scheduledScreening",
          },
          {
            $match: {
              "scheduledScreening.weekday": scheduledScreening.weekday,
              date: nextDate,
              scheduledScreening: scheduledScreening,
            },
          },
          {
            $limit: 1,
          },
        ]);

        if (screeningFound[0]) {
          const screening = await Screening.findOne(screeningFound[0])
            .populate("scheduledScreening")
            .populate({
              path: "scheduledScreening",
              populate: { path: "cinema" },
            });

          return screening;
        } else {
          // Create new screening when it doesnt exist
          console.log("CREATE NEW SCREENING");
          const screening = new Screening({
            scheduledScreening,
            date: nextDate,
            bookedSeats: [],
          });
          const savedScreening = await screening.save();
          return await Screening.findOne(savedScreening)
            .populate("scheduledScreening")
            .populate({
              path: "scheduledScreening",
              populate: { path: "cinema" },
            });
        }
      })
    );

    res.status(200).json({ data: screenings });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

router.get("/ticketshop/:id", async (req, res) => {
  const id = req.params.id;
  console.log(`GET /screenings/ticketshop/${id}`);
  try {
    const screening = await Screening.findById(id)
      .populate("scheduledScreening")
      .populate({
        path: "scheduledScreening",
        populate: { path: "cinema" },
      })
      .populate({
        path: "scheduledScreening",
        populate: { path: "movie" },
      });

    if (!screening) return res.status(400).json({ message: "not found" });
    res.status(200).json({ data: screening });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

router.get("/schedule", async (req, res) => {
  const scheduledScreenings = await ScheduledScreening.find()
    .populate("movie")
    .populate("cinema");
  res.status(200).json({ data: scheduledScreenings });
});

router.post("/schedule", authAdmin, async (req, res) => {
  console.log("POST /screenings/schedule");
  console.log(req.body);
  const body = req.body;

  try {
    const time = body.time;
    console.log("TIME", time);
    const screening = new ScheduledScreening({ ...body });
    let savedScreening = await screening.save();
    savedScreening = await savedScreening.populate("movie");
    savedScreening = await savedScreening.populate("cinema");
    res.status(200).json({ data: savedScreening });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

router.delete("/schedule/:id", authAdmin, async (req, res) => {
  const id = req.params.id;
  console.log(`DELETE /screenings/schedule/${id}`);

  try {
    const deletedScreening = await ScheduledScreening.findOneAndDelete({
      _id: id,
    });
    res.status(200).json({ data: deletedScreening });
  } catch (err) {
    res.status(404).json({ message: "delete error" });
  }
});

module.exports = router;
