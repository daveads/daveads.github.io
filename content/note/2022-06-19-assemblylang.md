+++
title = "assembly language"
date = 2022-06-19
[taxonomies]
notec = ["Learned"]
notet = ["assembly"]
+++


Assembly program :
* .data section :
		This section is for declaring initialized data. { filenames and buffer sizes }
		DB, DW, DD, DQ and DT instructions.
		
```asm
section .data
		message: db "hello world"
		msglength: equ 12
		buffersize: dw 1024

```


* .bss section :
		This is where variables are been decleared.
		RESB, RESW, RESD, RESQ, REST instrcutions are use to reserve uninitialized space in memory for your variables. 
	
```asm
section .bss
		filename: resb 255 ; reserve 255 bytes
		number: resb 1     ; Reserve 1 byte
		bignum: resw 1     ; Reserve 1 word (1 word = 2 bytes)
		realarray: resq 10 ; Reserve an array of 10 reals
```



* .text section :
		This is where the actual assembly code is written.
		
		this section must begin with the declaration global_start,
		// this tells the kernel where the program execution begins. == "main" @other_languages
		
		
		
