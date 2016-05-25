import os
import sys

# Hack to include shared module dir in module search path
sys.path.append(os.path.realpath(os.path.join(os.path.dirname(os.path.realpath(__file__)), "..", "shared")))

import psycopg2
import psycopg2.extras
from secrets import username, password
from keg import Keg


class KegDataAccess:
    def __init__(self):
        pass

    _pg_connection_string = "host='localhost' dbname='postgres' user='{}' password='{}'".format(username, password)

    @staticmethod
    def _get_connection():
        return psycopg2.connect(KegDataAccess._pg_connection_string)

    @staticmethod
    def get_most_recent_active_keg():
        connection = KegDataAccess._get_connection()
        with connection:
            with connection.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
                cursor.execute("""SELECT keg_id,
                                         max_volume,
                                         current_volume,
                                         beer_id,
                                         created_timestamp,
                                         last_updated_timestamp,
                                         is_active
                                  FROM keg
                                  WHERE is_active = TRUE
                                  ORDER BY created_timestamp DESC
                                  LIMIT 1""")
                rows = cursor.fetchall()

                if len(rows) <= 0:
                    return None

                keg_id = rows[0]["keg_id"]
                max_volume = rows[0]["max_volume"]
                current_volume = rows[0]["current_volume"]
                beer_id = rows[0]["beer_id"]
                created_timestamp = rows[0]["created_timestamp"]
                last_updated_timestamp = rows[0]["last_updated_timestamp"]
                is_active = rows[0]["is_active"]
        connection.close()

        return Keg(keg_id, max_volume, current_volume, beer_id, created_timestamp, last_updated_timestamp, is_active)

    @staticmethod
    def create_new_keg(max_volume, beer_id):
        connection = KegDataAccess._get_connection()
        with connection:
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO keg  (max_volume,
                                                    current_volume,
                                                    beer_id,
                                                    created_timestamp,
                                                    last_updated_timestamp,
                                                    is_active)
                                  VALUES (%(max_volume)s,
                                          %(max_volume)s,
                                          %(beer_id)s,
                                          CURRENT_TIMESTAMP,
                                          CURRENT_TIMESTAMP,
                                          TRUE )""",
                               {"max_volume": max_volume, "beer_id": beer_id})

        connection.close()

    @staticmethod
    def update_keg_current_volume(keg):
        connection = KegDataAccess._get_connection()
        with connection:
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE keg
                                  SET current_volume = %(current_volume)s,
                                      last_updated_timestamp = CURRENT_TIMESTAMP
                                  WHERE keg_id = %(keg_id)s""",
                               {"current_volume": keg.current_volume, "keg_id": keg.keg_id})
        connection.close()

    @staticmethod
    def mark_keg_as_inactive(keg_id):
        connection = KegDataAccess._get_connection()
        with connection:
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE keg
                                  SET is_active = FALSE,
                                      last_updated_timestamp = CURRENT_TIMESTAMP
                                  WHERE keg_id = %(keg_id)s""",
                               {"keg_id": keg_id})

    @staticmethod
    def get_beer_name(beer_id):
        connection = KegDataAccess._get_connection()
        with connection:
            with connection.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
                cursor.execute("""SELECT beer_id, name
                                      FROM lu_beer
                                      WHERE beer_id = %(beer_id)s""",
                               {"beer_id": beer_id})

                rows = cursor.fetchall()

                if len(rows) <= 0:
                    return None

        connection.close()

        return rows[0]["name"]
