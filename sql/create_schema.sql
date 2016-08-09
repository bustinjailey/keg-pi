CREATE TABLE lu_brewery (
  brewery_id SERIAL PRIMARY KEY,
  name       TEXT
);

CREATE TABLE lu_beer (
  beer_id    SERIAL PRIMARY KEY,
  name       TEXT,
  full_name  TEXT,
  brewery_id INT REFERENCES lu_brewery (brewery_id),
  beer_style_id INT REFERENCES lu_beer_style (beer_style_id)
);

CREATE TABLE lu_beer_style (
  beer_style_id SERIAL PRIMARY KEY,
  NAME          TEXT
);

CREATE TABLE keg (
  keg_id                 SERIAL PRIMARY KEY,
  max_volume             REAL    NOT NULL,
  current_volume         REAL    NOT NULL,
  beer_id                INT REFERENCES lu_beer (beer_id),
  created_timestamp      TIMESTAMP WITH TIME ZONE,
  last_updated_timestamp TIMESTAMP WITH TIME ZONE,
  is_active              BOOLEAN NOT NULL
);
