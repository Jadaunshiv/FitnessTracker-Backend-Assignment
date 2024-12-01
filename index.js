const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

app.use(express.static('static'));

/*-------------------------------------------------------*/
let activities = [
  { activityId: 1, type: 'Running', duration: 30, caloriesBurned: 300 },
  { activityId: 2, type: 'Swimming', duration: 45, caloriesBurned: 400 },
  { activityId: 3, type: 'Cycling', duration: 60, caloriesBurned: 500 },
];
/*-------------------------------------------------------*/

// Endpoint 1

function addActivity(activityId, type, duration, caloriesBurned) {
  let addTask = { activityId, type, duration, caloriesBurned };
  activities.push(addTask);
  return activities;
}

app.get('/activities/add', (req, res) => {
  let activityId = parseFloat(req.query.activityId);
  let type = req.query.type;
  let duration = parseFloat(req.query.duration);
  let caloriesBurned = parseFloat(req.query.caloriesBurned);
  let result = addActivity(activityId, type, duration, caloriesBurned);
  res.json({ activities: result });
});

// Endpoint 2

function sortActivityByDuration(activity1, activity2) {
  return activity1.duration - activity2.duration;
}

app.get('/activities/sort-by-duration', (req, res) => {
  let result = activities.sort(sortActivityByDuration);
  res.json({ activities: result });
});

// Endpoint 3

function filterActivitiesByType(activities, type) {
  return activities.type === type;
}

app.get('/activities/filter-by-type', (req, res) => {
  let type = req.query.type;
  let result = activities.filter((activities) =>
    filterActivitiesByType(activities, type)
  );
  res.json({ activities: result });
});

// Endpoint 4

function totalCaloriesBurned() {
  let totalCaloriesBurned = 0;
  for (let i = 0; i < activities.length; i++) {
    totalCaloriesBurned += activities[i].caloriesBurned;
  }

  return totalCaloriesBurned;
}

app.get('/activities/total-calories', (req, res) => {
  let result = totalCaloriesBurned();
  res.json({ totalCaloriesBurned: result });
});

// Endpoint 5

function updateActivityDuration(activityId, duration) {
  for (let i = 0; i < activities.length; i++) {
    if (activities[i].activityId === activityId) {
      activities[i].duration = duration;
    }
  }
  return activities;
}

app.get('/activities/update-duration', (req, res) => {
  let activityId = parseFloat(req.query.activityId);
  let duration = parseFloat(req.query.duration);
  let result = updateActivityDuration(activityId, duration);
  res.json({ activities: result });
});

// Endpoint 6

function deleteActivityById(activityId, activities) {
  return activities.activityId != activityId;
}

app.get('/activities/delete', (req, res) => {
  let activityId = parseFloat(req.query.activityId);
  let result = activities.filter((activities) =>
    deleteActivityById(activityId, activities)
  );
  res.json({ activities: result });
});

// Endpoint 7

function deleteActivityByType(activities, type) {
  return activities.type != type;
}

app.get('/activities/delete-by-type', (req, res) => {
  let type = req.query.type;
  let result = activities.filter((activities) =>
    deleteActivityByType(activities, type)
  );
  res.json({ activities: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
