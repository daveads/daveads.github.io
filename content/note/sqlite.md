+++
title = 'sqlite 3'
date = 2022-06-11
[taxonomies]
notec = ["Learned"]
notet = ["sqlite"]
+++

#
[#](#) FOLLOWED TUTORIALS FROM https://www.sqlitetutorial.net/sqlite-limit/
[](#)

open database from terminal

.open name.db

**.mode "to change way at which datbase is display on the terminal"**

.tables // shows tables available in the terminal


SELECT // This is use for query data from a one or more table

## SELECT

---
SELECT column, cloumn, e.t.c FROM tracks == #table;
---


**selecting column in ascending order**

---
SELECT name, milliseconds, albumid FROM tracks ORDER BY albumid ASC;
---

**selecting column and then filtering (albumid like the above) and milliseconds in descending order**

---
SELECT name, milliseconds, albumid FROM tracks ORDER BY albumid ASC, milliseconds DESC;
---


// ORDER BY with column position instead of column name

---
SELECT name, albumid FROM tracks ORDER BY 3 ASC, 2 DESC;
---


// ORDER BY clause to sort tracks by composers

---
SELECT TrackId, Name, Composer FROM tracks ORDER BY Composer;
---


## SELECT DISTINCT examples

/*
Distincy clasue allows you to remove the duplicate rows in the result set.
*/


E.g.

---
SELECT city FROM customers ORDER BY city;
---

result of city would contain duplicates
e.g. city = london, city = london

**remove duplicates by using distinct**

---
SELECT DISTINCT city FROM customers ORDER BY city;
---



**applying DISTINCT on multiple column**
---
SELECT DISTINCT city, country FROM customers ORDER BY county;
---


## WHERE CLAUSE

---
SELECT column_list FROM table WHERE search_condition;
---

// WHERE caluse is use to SELECT statement to filter rows returned by query.

E.g.

--------
WHERE column_1 = 100;

WHERE column_2 IN (1,2,3);

WHERE column_3 LIKE 'An%';

WHERE column_4 BETWEEN 10 AND 20;
---------


// can be use in the UPDATE and DELETE STATEMENT


// comparison operators can also be used

---
= , < , > , <= e.t.c.
---


**logical operators**:

// no boolean data type in sqlite so True = 1 and false = 0

-----
Operator | Meaning
All | returns 1 if all expressions are 1.

AND | returns 1 if both expressions are 1, and 0 if one of the expressions is 0.

ANY |returns 1 if any one of a set of comparisons is 1.

BETWEEN | returns 1 if a value is within a range.

EXISTS | return 1 if a sbuquery contains any rows.

IN | returns 1 if a vlaues is in a list of values.

LIKE | returns 1 if a value matches a pattern.

NOT  | reverses the value of other operators such as NOT EXISTS, NOT IN, NOT BETWEEN e.t.c

OR | returns ture if either expression is 1


**sqlite WHERE clause examples**

---
SELECT name, milliseconds, bytes, albumid FROM tracks WHERE ALBUMID = 1;
----

---
SELECT name, milliseonds, albumid FROM tracks WHERE albumid = 1 AND milliseconds > 250000;
---

---
SELECT name,albumid, composer FROM tracks WHERE composer LIKE '%Smith%' ORDER BY albumid;
---

---
SELECT name, albumid, mediatypeid FROM tracks WHERE mediatypid IN (2 ,3);
---



## sqlite limit clause

-----------
SELECT column_list FROM table LIMIT row_count;
-----------

// limit clause is use to constrain the number of rows returned by the query...


-----
SELECT trackid, name FROM tracks LIMIT 10;
-----

To get the first 10 rows starting from the 10th row

**use**

---
SELECT column_list FROM table LIMIT offset, row_count
---


---
SELECT trackid, name, FROM tracks LIMIT 10 OFFSET 10;
---



















### INSERT IN SQLITE

----
INSERT INTO table (column1, column2) VALUES (value1, value2);
----

e.g.

----
INSERT INTO playlists (playlistid, name) VALUES (24, 'brime buk');
----



**inserting multiple rows into a table**

---
INSERT INTO table1 (column1, column2,....) VALUES (value1 , value2,), (value1, value2 );
---

e.g.
----
INSERT INTO playlists (playlistid, name) VALUES (30, 'faith'), (34, 'favour'), (36, 'gift');
----


## UPDATE STATEMENT

// to update an existing data in a table, you use sqlite UPDATE 
statment


---
UPDATE table SET column_1 = new_value_1, column_2 = new_value_2 WHERE search_condition;
---


## DELETE statement

-----
DELETE FROM table WHERE search_condition
-----

e.g.

----
DELETE FROM playlists WHERE playlistid = 36;
----


