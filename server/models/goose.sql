CREATE TABLE Users (
  user_id SERIAL,
  username VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE Lists (
  list_id SERIAL,
  user_id INT REFERENCES Users (user_id),
  name VARCHAR NOT NULL,
  data TEXT,
  size INT,
  steps INT,
  complete INT,
  progress INT,
  PRIMARY KEY (list_id)
);