DROP TABLE activities;
DROP TABLE exercises;
DROP TABLE workouts;

CREATE TABLE exercises (
    id SERIAL8 PRIMARY KEY,
    name VARCHAR(255),
    reps INT8,
    sets INT8,
    notes TEXT
);

CREATE TABLE workouts (
    id SERIAL8 PRIMARY KEY,
    name VARCHAR(255),
    complete BOOLEAN
);

CREATE TABLE activities (
    id SERIAL8 PRIMARY KEY,
    workout_id INT8 REFERENCES workouts(id),
    exercise_id INT8 REFERENCES exercises(id),
    result VARCHAR(255)
);