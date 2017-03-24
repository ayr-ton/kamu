#!/usr/bin/env python
import psycopg2
import psycopg2.extras
from kamu import settings

try:
    conn=psycopg2.connect("dbname='kamu_old'")
except:
    print("I am unable to connect to the database.")

cur = conn.cursor(cursor_factory = psycopg2.extras.DictCursor)
try:
    cur.execute("""SELECT * from book""")
except:
    print("I can't SELECT from book")

rows = cur.fetchall()
print("\nRows: \n")
for row in rows:
    print(row['title'])

dir(settings)