+++
title = "mysql >> mariadb note"
date = 2022-06-11
[taxonomies]
notec = ["Learned"]
notet = ["mysql"]
+++


### Local development 

* `mysql -u root -p`  Connect to the MySQL server using the `mysql` command-line client and provide the root user credentials when prompted


* `SHOW DATABASES;` See all the databases available on the MySQL server

* `USE database_name;` To move in to the database 

* `SHOW TABLES;` View all the tables within the selected database


* `DESCRIBE table_name;`  To view the structure (columns and data types) of a specific table

* `CREATE DATABASE new_database_name;` To create a new database

* `source /home/ubuntu/schema.sql` To run a SQL script file like `schema.sql` in SQL shell 
