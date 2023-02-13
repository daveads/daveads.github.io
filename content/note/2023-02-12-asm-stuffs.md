





/**
 The register is built into the cpu, it is used to store temporary data that the cpu needs to access quickly in oder to perform its operation.
 
 
Types of cpu registers 

* General-purpose registers :
These registers can be used to store any type of data, including operands for arithmetic and logic operations, pointers to memory locations, and intermediate results of calculations.


* Program counter register:
This register holds the address of the next instruction to be executed by the CPU.


* Stack pointer register:
This register holds the address of the top of the stack, which is a region of memory used to store function call frames and temporary data.


* Status registers: 
*These registers store the state of the CPU, including information about arithmetic operations, interrupt handling, and other control signals.
*

****/



## registers
rax" - a large general-purpose register used for storing values and results of arithmetic operations.

"rbx" - another large general-purpose register.

"rcx" - a general-purpose register used for counting and loop operations.

"rdx" - a general-purpose register used for storing values and results of arithmetic operations.

"rsi" - a general-purpose register used as a source index register in string and array operations.

"rdi" - a general-purpose register used as a destination index register in string and array operations.

"r8" - "r15" - additional general-purpose registers available in the x86-64 architecture.

General-purpose registers :: rax, rbx, rcx, rdx, rbp, rsp, rsi, rdi, r8, r9, r10, r11, r12, r13, r14, r15


# Operation
    ADD- integer add
    SUB- subtract
    MUL- unsigned multiply
    IMUL- signed multiply
    DIV- unsigned divide
    IDIV- signed divide
    INC- increment
    DEC- decrement
    NEG- negate
	
	
CONTROL FLOW
JE - jump if equal

JZ - jump if zero

JNE - jump if not equal

JNZ - jump if not zero

JG - jump if the first operand is greater than second

JGE - jump if the first operand is greater or equal to second

JA - the same that JG, but performs an unsigned comparison

JAE - the same that JGE, but performs an unsigned comparison


DATA TYPES
    byte is eight bits
    word is two bytes
    doubleword is four bytes
    quadword is eight bytes
    double quadword is sixteen bytes (128 bits).
	
	
.DATA
+-----------+-------------------+-------------------+
| Directive |      Purpose      |   Storage Space   |
+-----------+-------------------+-------------------+
| DB        | Define Byte       | allocates 1 byte  |
| DW        | Define Word       | allocates 2 bytes |
| DD        | Define Doubleword | allocates 4 bytes |
| DQ        | Define Quadword   | allocates 8 bytes |
| DT        | Define Ten Bytes  | allocates 10 byte |
+-----------+-------------------+-------------------+


// opertation

mov ebx, 123  ; ebx = 123
mov eax, ebx  ; eax = ebx
add ebx, ecx  ; ebx += ecx
sub ebx, edx  ; ebx -= edx
mul ebx       ; eax ***= ebx
div edx       ; eax /= edx

; eax handles operations




data - section is used for declaring initialized data or constants
bss - section is used for declaring non initialized variables
text - section is used for code



RESB, RESW, RESD, RESQ, REST, RESO, RESY and RESZ - are used for declaring non initialized variables
INCBIN - includes External Binary Files
EQU - defines constant. 

```asm
one equ 1
```

