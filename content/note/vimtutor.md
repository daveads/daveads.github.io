+++
title = "Notes on vim"
date = 2022-06-11
[taxonomies]
notec = ["Learned"]
notet = ["vim"]
+++

## Decided to try this out after months of using Vim

// Started with Vim by just Googling the basic commands...

**Mistakes I have made in the past**
1.

## Moving
```
         ^
         k
   <  h       l>
         
         j
         v
```

## Exiting Vim
Press `<ESC>`
Use `:q!` to discard any changes you have made and exit forcefully.

## Text Editing - Delete
Press `<ESC>` to enter normal mode.
To delete a character, move to the character and press `x`.

## Text Editing - Insert
Press `i` to start inserting text at the cursor position.

## Text Editing - Appending
Press `a` to append text after the cursor position.

## Editing a File
Use `:wq` to save and exit a file.
Press `<ESC>` to return to normal mode or to cancel unwanted and partially completed commands.

## Deletion Commands
In normal mode, move to the beginning of a word and type `dw` to delete until the start of the next word.

## More Deletion Commands
Type `d$` to delete to the end of the line, including the last character.

## On Operators and Motions
Commands involving manipulating text are made from an operator and a motion.
- Delete Operator: `d` motion
- `d` is the delete operator, and motion specifies what the operator will operate on.

## Short List of Motions
- `w`: Move until the start of the next word, excluding its first character.
- `e`: Move to the end of the current word, including the last character.
- `$`: Move to the end of the line, including the last character.

## Using a Count for a Motion
- `2w`: Move the cursor two words forward.
- `3e`: Move the cursor to the end of the third word forward.
- `0`: Move to the start of the line.
- `3w`: Move the cursor three words forward.

## Using a Count to Delete More
Typing a number with an operator repeats it that many times. For example, `d2w` deletes the first two words in the line.

## Operating on Lines
- `dd`: Delete a whole line.
- `2dd`: Delete two lines.

## The Undo Command
- `u`: Undo the last command.
- `CTRL-R`: Redo commands.

## The PUT Command
- `p`: Put previously deleted text after the cursor.
- `dd` deletes the line and stores it in a Vim register.

### The Replace Command
- Press `rx` to replace the character under the cursor with `x`.
- Press `r` then the character which should be there.

## The Change Operator
- `ce`: Change until the end of a word.
- For example, `hello wors` becomes `hello world`.

## More Changes Using c
The change operator `c` can be used with the same motions as delete.
- `c [number] motion`

## Cursor Location and File Status
- `CTRL-g`: Shows file name and position in the file.
- `gg`: Move you to the start of the file.
- `G`: Move you to the bottom of the file.
- `[number]G`: Move you to a specific line.

## The Search Command
In normal mode, type `"/"` followed by the character you want to search.
To search the same phrase again, type `n`.