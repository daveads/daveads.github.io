+++
title = "starting postgres sql"
date = 2022-06-11
[taxonomies]
notec = ["Learned"]
notet = ["postgres"]
+++

sudo service postgresql start...


// no users in postgresql just roles

***
psql postgres
***


## see roles create by using

// \du


## Creating a new role

CREATE ROLE <role>;
// this won't add login...

## to add login
CREATE ROLE <role> WITH LOGIN


##  quit the postgresqlq
\q : quit

[psql postgres -U User]

## remove that role using

DROP ROLE <role>;


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


/list
//this list the database available....


## switch datbase

\connect <db_name>



----------------------------
## exprimented with this
 CREATE ROLE testing WITH LOGIN  Superuser Createrole Createdb Replication BypassRls;



