+++
title = 'Redis'
[taxonomies]
notec = ["Learned"]
notet = ["redis"]
+++

**start redis**
* redis-server

// don't know how this works yet

CONFIG GET CONFIG_SETTING_NAME

methods = GET AND SET

CONFIG GET *
// this gets all config


update config by redis.conf or CONFIG SET



//strings

SET name "using redis"

GET name // outputs stored string


// Hashes

HMSET user:1 username password

HGETALL user:1


//Lists

lpush dbs mysql
lpush dbs mariadb
lpush dbs sqlite

*gets the inserted list out*
lrange dbs 0 2


//Sets - unordered collection of strings

sadd check me
sadd check data
sadd check email
sadd check her

get the sets
smemebers checks



//sorted sets



