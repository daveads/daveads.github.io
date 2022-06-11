+++
title = "Notes on vim"
[taxonomies]
notec = ["Learned"]
notet = ["vim"]
+++

## Decided to try this out after months of using vim 

// started out vim by just googling the basic commands...

**mistakes i have made in the past**
1.


## moving 
				 ^
                     		 k
  			<  h  	       l>
					
				 j
				 v


## Exiting vim
<ESC> 
:q! discards any changes you have made.....


## Text editing - del
<ESC> !inserting_mode

moving to the character then press x to delete


## Text editing - ins

"i" to start inserting text...


## Text editing - appending

"a" append after the line 


## Editing a file
":wq" to save and exit a file

"<ESC>" puts you in noraml mode or can be used to cancel unwanted and partially completed command


## Deletion commands
after the normal mode, move to the beginning of a word and type "dw"....


## more deletion commands
"d$" deletes to the end of the line....


## on operators and motions

commands involve in manupulating of text are made from an operator and a motion. 

delete operator:
	d motion

d - is the delete operator.
motion - what the operator will operate on.

## Short list of motions:

w - until the start fo the next word, Excluding its first character.

e - to the end of the current word, Including the last character.

$ - to the end of the line, Including the last character.


de :

## Using a count for a motion

2w move the cursor two words forward

3e movis the cursor to the end of the third word forward.

0 to move to the start of a the line

3w move the cursor three words forward



## Using a count to delete more

typing anumber with an operator repeatss it that many times. "d number motion"

e.g. d2w deletes the first two words n the line

## operating on lines

dd - to delete a whole line

2dd - deletes two line

## The undo command

u - to undo last commands

CTRL-R - to redo commands

 
## The PUT command

p - to put previously deleted text after the cursor.

**back to "dd"** 
dd deletes the line and store it in a vim register...

### The replace command

rx to replace the character 

rx then r than the character which should be there...

## The change operator

ce - to change until the end of a word

e.g. hello wors 
     hello world

## More changes using c

"c" : the change operator can be used with the same motions as delete.

 c [number] motion

//not  clear....... 


## cursor location and file status

CTRL-g  shows file name and position in the file.
gg - move you to the start of the file.
G - move you to the bottom of the file

[number] G - move you the specific line

## The search command

@Normal_mode "/ then character..."

to search the same phrase again, type "n".

 
