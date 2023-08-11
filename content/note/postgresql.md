+++
title = "starting postgres sql"
date = 2022-06-11
[taxonomies]
notec = ["Learned"]
notet = ["postgres"]
+++

## Postgresql Local development setup


There are no users in PostgreSQL, only roles.

postgres account is created by default 


`sudo -i -u postgres` : To switch in the postgress account then `psql` to start postgresql interactive terminal  

OR

`sudo -u postgres psql` : This log you directly into postgres 


**THIS COMMANDS CAN BE RUN WITH THE POSTGRESS ACCOUNT**

`\du` : List all user accounts or roles



## Creating a new role

`createuser --interactive`: Within the postgres account 

Or

`sudo -u postgres createuser --interactive` without switching in the postgres account first 




**Within the postgresql interactive terminal**


`SELECT datname FROM pg_database;` or  `/list` See all database in PostgreSQL



`SELECT rolname FROM pg_roles;` To list all roles

`DROP ROLE <role>;` : To remove  role


## to add login
`CREATE ROLE "<role>";` WITH LOGIN


##  quit the postgresqlq
\q : quit

[psql postgres -U User]

## 




## creating role with login password

CREATE ROLE <role> WITH LOGIN PASSWORD '<password>';

## alternative way

CREATE USER <role> LOGIN PASSWORD '<password>';



## adding a role attribute to a role

ALTER ROLE <role> WITH LOGIN;




##built in role attributes

* login/nologin : allow (or not) to login postgresql

* SUPERUSER/NOSUPERUSER : a db superuser will bypass other permission checks, excepts for LOGIN.

* CREATEDB : allows the ability to create db

* CREATEUSER/NOCREATE USER : allow (or not) the ability to create new uses.

* INHERIT/ NOINHERIT : ability to make privileges inheritable.

* REPLICATION/ NOREPLICATION : ??




## switch datbase

\connect <db_name>



----------------------------
## exprimented with this
 CREATE ROLE testing WITH LOGIN  Superuser Createrole Createdb Replication BypassRls;



