INSERT INTO lu_brewery (name)
  SELECT 'Ballast Point'
  WHERE
    NOT EXISTS(
        SELECT brewery_id
        FROM lu_brewery
        WHERE name = 'Ballast Point'
    );

INSERT INTO lu_brewery (name)
  SELECT 'Golden Road'
  WHERE
    NOT EXISTS(
        SELECT brewery_id
        FROM lu_brewery
        WHERE name = 'Golden Road'
    );

INSERT INTO lu_beer (brewery_id, name)
  SELECT
    brewery_id,
    'Sculpin IPA'
  FROM lu_brewery
  WHERE NOT EXISTS(
      SELECT 1
      FROM lu_beer
      WHERE name = 'Sculpin IPA'
    )
    AND lu_brewery.name = 'Ballast Point';

INSERT INTO lu_beer (brewery_id, name)
  SELECT
    brewery_id,
    'Pt. the Way'
  FROM lu_brewery
  WHERE NOT EXISTS(
      SELECT 1
      FROM lu_beer
      WHERE name = 'Pt. the Way'
    )
    AND lu_brewery.name = 'Golden Road';
