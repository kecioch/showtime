const express = require("express");
const router = express.Router();

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

    if (!movie)
      return res.status(400).json({ code: 400, message: "not found" });

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

    res.status(200).json(screenings);
  } catch (err) {
    console.log(err);
    res.status(400).json({ code: 400, message: err.message });
  }
});

router.get("/schedule", async (req, res) => {
  const scheduledScreenings = await ScheduledScreening.find()
    .populate("movie")
    .populate("cinema");
  res.send(scheduledScreenings);
});

router.post("/schedule", async (req, res) => {
  console.log("POST /screenings/schedule");
  console.log(req.body);
  const body = req.body;

  try {
    const time = body.time;
    const date = new Date(`2000-01-01T${time}:00`);
    const screening = new ScheduledScreening({ ...body, time: date });
    let savedScreening = await screening.save();
    savedScreening = await savedScreening.populate("movie");
    savedScreening = await savedScreening.populate("cinema");
    res.status(200).json(savedScreening);
  } catch (err) {
    console.log(err);
    res.status(400).json({ code: 400, message: err.message });
  }
});

router.delete("/schedule/:id", async (req, res) => {
  const id = req.params.id;
  console.log(`DELETE /screenings/schedule/${id}`);

  try {
    const deletedScreening = await ScheduledScreening.findByIdAndDelete(id);
    res.status(200).send(deletedScreening);
  } catch (err) {
    res.status(404).send({ code: 404, message: "delete error" });
  }
});

module.exports = router;
