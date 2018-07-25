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
    overall_result INT8,
    complete BOOLEAN,
    date DATE
);

CREATE TABLE activities (
    id SERIAL8 PRIMARY KEY,
    workout_id INT8 REFERENCES workouts(id) ON DELETE CASCADE,
    exercise_id INT8 REFERENCES exercises(id),
    result VARCHAR(255)
);