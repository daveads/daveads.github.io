---
layout: post
title: 'Programming language resources'
date: 2022-05-31
categories: [Language]
tags: resources compiler operating-system assembly emulator
---

Resources to getting started with writing Programming languages, Emulators, Assembly and Operating system.
PL orginal post by Max Bernstein [languages]( https://bernsteinbear.com/pl-resources/)

Compilers
---------

*   Tufts compilers course [COMP/CS 181](http://www.cs.tufts.edu/~sguyer/classes/comp181-2006/) (2006, but it’s been taught more recently. I should probably ping Sam.)
*   Cornell compilers course [CS 6120](https://www.cs.cornell.edu/courses/cs6120/2019fa/project/) and interesting approach to project-based learning
*   Nora Sandler’s [minimal C compiler](https://norasandler.com/2017/11/29/Write-a-Compiler.html)
*   Jack Crenshaw’s [let’s build a compiler](https://compilers.iecc.com/crenshaw/)
*   [Recursive descent parsing](http://web.archive.org/web/20170712044658/https://ryanflannery.net/teaching/common/recursive-descent-parsing/) in C. Note that this just verifies the input string, and more has to be done to build a tree out of the input.
*   Vidar Hokstad’s [Writing a compiler in Ruby, bottom up](http://hokstad.com/compiler)
*   Rui Ueyama’s [chibicc](https://github.com/rui314/chibicc), a C compiler in the Ghuloum style
*   The [Natalie](https://github.com/natalie-lang/natalie) compiler for Ruby
*   Compiler passes
    *   [Sparse conditional constant propagation](https://en.wikipedia.org/wiki/Sparse_conditional_constant_propagation) ([Bril blog post](https://www.cs.cornell.edu/courses/cs6120/2019fa/blog/sccp/) and [Thorsten Ball tweet](https://twitter.com/thorstenball/status/1526788333761863680/photo/1))
*   I’ve heard good things about [Engineering a Compiler](https://www.elsevier.com/books/engineering-a-compiler/cooper/978-0-12-088478-0) ([3rd edition](https://www.elsevier.com/books/engineering-a-compiler/cooper/978-0-12-815412-0) coming soon!)



Lisp specific
-------------

*   kanaka’s [mal](https://github.com/kanaka/mal)
*   leo (lwh)’s [Building LISP](https://www.lwh.jp/lisp/)
*   Peter Michaux’s [Scheme from Scratch](http://peter.michaux.ca/articles/scheme-from-scratch-introduction)
*   Daniel Holden’s [Build Your Own Lisp](http://buildyourownlisp.com/contents)
*   Anthony C. Hay’s fairly readable [Lisp interpreter in 90 lines of C++](http://howtowriteaprogram.blogspot.com/2010/11/lisp-interpreter-in-90-lines-of-c.html)
*   My own [Writing a Lisp](https://bernsteinbear.com/blog/lisp/) blog post series
*   carld’s [Lisp in less than 200 lines of C](https://carld.github.io/2017/06/20/lisp-in-less-than-200-lines-of-c.html)
*   UTexas’s [A simple scheme compiler](https://www.cs.utexas.edu/ftp/garbage/cs345/schintro-v14/schintro_142.html#SEC271)
*   Rui Ueyama’s [minilisp](https://github.com/rui314/minilisp)
*   The [Bones](http://www.call-with-current-continuation.org/bones/) Scheme compiler
*   The [lecture notes](https://course.ccs.neu.edu/cs4410sp20/#%28part._lectures%29_) for a course developing a Ghuloum-style compiler
*   Ghuloum implementations
    *   Abdulaziz Ghuloum’s [minimal Scheme to x86 compiler](/assets/img/11-ghuloum.pdf) (PDF)
    *   My [adaptation](https://bernsteinbear.com/blog/compiling-a-lisp-0/) in C (with [implementation](https://github.com/tekknolagi/ghuloum))
    *   [Let’s build a compiler](https://generalproblem.net/lets_build_a_compiler/01-starting-out/)
    *   Thorsten Ball’s [adaptation](https://github.com/mrnugget/scheme_x86)
    *   Nada Amin’s [adaptation](https://github.com/namin/inc)
*   Tao of Mac’s [List implementation list](https://taoofmac.com/space/dev/lisp)
*   [sectorlisp](https://github.com/jart/sectorlisp) and [sectorlisp2](https://justine.lol/sectorlisp2/) and [lambda calculus in 383 bytes](https://justine.lol/lambda/)

Runtimes
--------

*   munificent’s [Crafting Interpreters](https://craftinginterpreters.com/) book
*   Mario Wolczko’s [CS 294-113](http://www.wolczko.com/CS294/), a course on managed runtimes
*   My own [bytecode compiler/VM](https://bernsteinbear.com/blog/bytecode-interpreters/) blog post
*   Justin Meiners and Ryan Pendelton’s [Write your own virtual machine](https://justinmeiners.github.io/lc3-vm/)
*   Maxime Chevalier-Boisvert’s [website](https://pointersgonewild.com/about/)
*   Serge’s [toy JVM](https://zserge.com/posts/jvm/)
*   [Dragon taming with Tailbiter](https://codewords.recurse.com/issues/seven/dragon-taming-with-tailbiter-a-bytecode-compiler)
*   [Phil Eaton](https://notes.eatonphil.com/)’s [list of JS implementations](https://notes.eatonphil.com/javascript-implementations.html)
*   [Chris Seaton](https://chrisseaton.com/)’s [The Ruby Compiler Survey](https://ruby-compilers.com/) and [RubyConf 2021 talk](https://www.youtube.com/watch?v=Zg-1_7ed0hE) (video) about it
*   Laurence Tratt’s “Why aren’t more users more happy with our VMs?” [Part 1](https://tratt.net/laurie/blog/entries/why_arent_more_users_more_happy_with_our_vms_part_1.html) and [Part 2](https://tratt.net/laurie/blog/entries/why_arent_more_users_more_happy_with_our_vms_part_2.html)
*   Interesting runtimes
    *   [Toit](https://github.com/toitlang/toit)
    *   [Skybison](https://github.com/tekknolagi/skybison)
*   Russ Cox’s [Regular expression matching: the virtual machine approach](https://swtch.com/~rsc/regexp/regexp2.html)
*   Webkit’s post about the [FTL JIT](https://webkit.org/blog/3362/introducing-the-webkit-ftl-jit/)



Runtime optimization
--------------------

Research around optimizing dynamic languages.

*   [Efficient implementation of the Smalltalk-80 system](https://dl.acm.org/doi/10.1145/800017.800542)
*   Stefan Brunthaler’s work
    *   [Efficient interpretation using quickening](https://dl.acm.org/doi/abs/10.1145/1869631.1869633)
    *   [Inline caching meets quickening](https://dl.acm.org/doi/10.5555/1883978.1884008)
    *   [Multi-Level Quickening: Ten Years Later](https://arxiv.org/pdf/2109.02958.pdf) (PDF)
*   [Optimizing dynamically-typed object-oriented languages with polymorphic inline caches](https://bibliography.selflanguage.org/_static/pics.pdf) (PDF)
*   [Garbage collection in a large LISP system](https://dl.acm.org/doi/10.1145/800055.802040)
*   Urs Hölzle’s thesis, [Adaptive Optimization for Self](http://i.stanford.edu/pub/cstr/reports/cs/tr/94/1520/CS-TR-94-1520.pdf) (PDF)
*   [An inline cache isn’t just a cache](https://www.mgaudet.ca/technical/2018/6/5/an-inline-cache-isnt-just-a-cache)
*   [Baseline JIT and inline caches](https://blog.pyston.org/2016/06/30/baseline-jit-and-inline-caches/)
*   [Javascript hidden classes and inline caching in V8](https://richardartoul.github.io/jekyll/update/2015/04/26/hidden-classes.html)
*   Basic block versioning
    *   [Simple and Effective Type Check Removal through Lazy Basic Block Versioning](https://arxiv.org/pdf/1411.0352v2.pdf) (PDF)
    *   [Extending Basic Block Versioning with Typed Object Shapes](https://arxiv.org/pdf/1507.02437.pdf) (PDF)
    *   [Interprocedural Type Specialization of JavaScript Programs Without Type Analysis](https://arxiv.org/pdf/1511.02956.pdf) (PDF)
*   [Stack Caching for Interpreters](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.5.4929&rep=rep1&type=pdf) (PDF)
*   [Hotspot performance techniques](https://wiki.openjdk.java.net/display/HotSpot/PerformanceTechniques)
*   [Assembly interpreters](http://nominolo.blogspot.com/2012/07/implementing-fast-interpreters.html) and [follow-up](http://nominolo.blogspot.com/2012/07/implementing-fast-interpreters_31.html)
    *   Make sure to take a look at “Further Reading”
    *   A [post](http://web.archive.org/web/20151206043326/https://blog.mozilla.org/dmandelin/2008/06/03/squirrelfish/) including a snippet on direct-threaded dispatch in an assembly interpreter
*   Stefan Marr’s [page](https://stefan-marr.de/2020/06/efficient-and-safe-implementations-of-dynamic-languages/) about efficient and safe implementations of dynamic languages
*   The Wikipedia page for [Cheney’s algorithm](https://en.wikipedia.org/wiki/Cheney%27s_algorithm)
*   This [web page](https://github.com/thlorenz/v8-perf/blob/master/compiler.md) about V8 internals
*   Vyacheslav Egorov’s [inline cache](https://mrale.ph/blog/2015/01/11/whats-up-with-monomorphism.html) explanation for JavaScript
*   Caio Lima’s [inline cache](https://caiolima.github.io/jsc/2020/03/12/jsc-inline-cache.html) explanation for JSC (with assembly!)
*   V8’s [blog post](https://v8.dev/blog/sparkplug) about their baseline/template JIT
*   Object shapes
    *   [Chris Seaton](https://chrisseaton.com/)’s [RubyKaigi talk](https://chrisseaton.com/truffleruby/rubykaigi21/)
    *   [Aaron Patterson](http://tenderlovemaking.com/) and [Jemma Issroff](https://jemma.dev/)’s [livestream](https://www.youtube.com/watch?v=C9q4V_WJ6_k) (video)
*   Kate Temkin’s [QEMU fork](https://github.com/ktemkin/qemu/tree/with_tcti) with a gadget-based pseudo-JIT and associated [Twitter thread](https://twitter.com/ktemkin/status/1375835935061942274)
*   [When pigs fly: optimizing bytecode interpreters](https://medium.com/bumble-tech/when-pigs-fly-optimising-bytecode-interpreters-f64fb6bfa20f)
    *   I particularly like the snippet on bytecode VM traces
*   Optimized Python runtimes
    *   [Cinder](https://github.com/facebookincubator/cinder)
    *   [Skybison](https://github.com/facebookexperimental/skybison)
    *   [Pyjion](https://github.com/tonybaloney/Pyjion)
    *   [Pyston](https://github.com/pyston/pyston)
    *   [PyPy](https://foss.heptapod.net/pypy/pypy)
    *   [Falcon](https://github.com/rjpower/falcon)
*   This SSA paper: [Simple and Efficient Construction of Static Single Assignment Form](https://pp.info.uni-karlsruhe.de/uploads/publikationen/braun13cc.pdf) (PDF)
*   Resources on mechanical sympathy and optimization coaching
    *   [Optimization Coaching](https://www.ccs.neu.edu/home/stamourv/papers/optimization-coaching.pdf) (PDF)
    *   [Optimization Coaching for JavaScript](https://rfrn.org/~shu/papers/ecoop15.pdf) (PDF)
    *   [JITProf](https://github.com/Berkeley-Correctness-Group/JITProf) and [JITProf-visualization](https://github.com/JacksonGL/jitprof-visualization)
*   This paper about encoding low-level semantics in a higher-level language for optimizing code: [Demystifying Magic: High-level Low-level Programming](http://users.cecs.anu.edu.au/~steveb/pubs/papers/vmmagic-vee-2009.pdf)
*   Meta-tracing JITs in native code
    *   [holyjit](https://github.com/nbp/holyjit) (Rust)
    *   [lineiform](https://github.com/chc4/lineiform) (Rust)
    *   [redmagic](https://github.com/matthewfl/redmagic) (C)
    *   [BacCaml](https://github.com/prg-titech/baccaml) (OCaml)
*   Bump allocators: [always bump downwards](https://fitzgeraldnick.com/2019/11/01/always-bump-downwards.html)!

And here are runtime optimization resources that I wrote!

*   [Inline caching](/blog/inline-caching/), a post containing a small demo of how to speed up attribute lookups in an interpreter
*   [Inline caching: quickening](/blog/inline-caching-quickening/), a post about speeding up interpreters using self-modifying bytecode (“bytecode rewriting” or “quickening”)
*   [Small objects and pointer tagging](/blog/small-objects/), a post about speeding up interpreters using pointer tagging and encoding small objects inside pointers

### Pointer tagging and NaN boxing

Resources on representing small values efficiently.

*   nikic’s [Pointer magic…](https://nikic.github.io/2012/02/02/Pointer-magic-for-efficient-dynamic-value-representations.html)
*   Sean’s [NaN-Boxing](https://sean.cm/a/nan-boxing)
*   zuiderkwast’s [nanbox](https://github.com/zuiderkwast/nanbox)
*   albertnetymk’s [NaN Boxing](http://albertnetymk.github.io/2016/08/06/nan_boxing/)
*   Ghuloum’s [Incremental approach](/assets/img/11-ghuloum.pdf) (PDF), which introduces this in a compiler setting
*   Chicken Scheme’s [data representation](https://wiki.call-cc.org/man/4/Data%20representation)
*   Guile Scheme’s [Faster Integers](https://www.gnu.org/software/guile/manual/html_node/Faster-Integers.html)
*   Femtolisp [object implementation](https://github.com/JeffBezanson/femtolisp/blob/master/flisp.h)
*   Leonard Schütz’s [NaN Boxing](https://leonardschuetz.ch/blog/nan-boxing/) article
*   Piotr Duperas’s [NaN boxing or how to make the world dynamic](https://piotrduperas.com/posts/nan-boxing/)

### Just-In-Time compilers

Small JITs to help understand the basics. Note that these implementations tend to focus on the compiling ASTs or IRs to machine code, rather than the parts of the JIT that offer the most performance: inline caching and code inlining. Compiling is great but unless you’re producing good machine code, it may not do a whole lot.

*   Antonio Cuni’s [jit30min](https://github.com/antocuni/jit30min)
*   Christian Stigen Larsen’s [Writing a basic x86-64 JIT compiler from scratch in stock Python](https://csl.name/post/python-jit/)
*   Ben Hoyt’s [Compiling Python syntax to x86-64 assembly for fun and (zero) profit](https://benhoyt.com/writings/pyast64/)
*   My very undocumented (but hopefully readable) [implementation](https://github.com/tekknolagi/ghuloum) of the Ghuloum compiler
*   Matt Page’s [template\_jit](https://github.com/mpage/template_jit) for CPython, which also contains a readable CFG implementation

### Assembler libraries

Sometimes you want to generate assembly from a host language. Common use cases include compilers, both ahead-of-time and just-in-time. Here are some libraries that can help with that.

*   Tachyon’s [x86-64 assembler](https://github.com/Tachyon-Team/Tachyon/tree/master/source/backend/x86) (JS)
*   Higgs’ [x86-64 assembler](https://github.com/higgsjs/Higgs/blob/master/source/jit/x86.d) (D), which is based on Tachyon’s
*   yjit’s [x86-64 assembler](https://github.com/Shopify/ruby/blob/56a1220128d18a7422f72e25d99b2bee9c7e5a86/yjit_asm.h) (C) from Shopify’s Ruby JIT, which is based on Higgs’
*   Dart’s [multi-arch assembler](https://github.com/dart-lang/sdk/tree/1e24fe7d699a1c36be142afa21859c6a9c82d035/runtime/vm/compiler/assembler) (C++) and [relevant constants](https://github.com/dart-lang/sdk/blob/1e24fe7d699a1c36be142afa21859c6a9c82d035/runtime/vm/constants_x64.h), both of which need some extracting from the main project
*   Strongtalk’s [x86 assembler](https://github.com/talksmall/Strongtalk/tree/39b336f8399230502535e7ac12c9c1814552e6da/vm/asm) (C)
*   AsmJit’s [multi-arch assembler](https://github.com/asmjit/asmjit) (C++)
*   PeachPy’s [x86-64 assembler](https://github.com/Maratyszcza/PeachPy) (Python)
*   PPCI’s [x86-64 assembler](https://github.com/windelbouwman/ppci/blob/915c069e0667042c085ec42c78e9e3c9a5295324/ppci/arch/x86_64/instructions.py) (Python) and other great compiler infrastructure
*   My [small x86-64 assembler](https://gist.github.com/tekknolagi/201539673cfcc60df73ef75a8a9b5896) (C), which I forked from the pervognsen’s [original](https://gist.github.com/pervognsen/9d815016d8ef39f1b2c8e509ee2cf052) (C)
*   A [guide to using GCC inline assembly](https://www.felixcloutier.com/documents/gcc-asm.html)


### SystemV ABI

This is a sort of grab-bag for helpful or interesting tools for programming language implementation.

*   [Blinkenlights](https://justine.lol/blinkenlights/index.html), a visual x86-64 emulator
*   [Cosmopolitan libc](https://justine.lol/cosmopolitan/index.html)
*   [Cosmopolitan ftrace](https://justine.lol/ftrace/)


Game Boy Emulators
------------------

*   The [Pan Docs](https://gbdev.io/pandocs/), which give technical data about the Game Boy hardware, I/O ports, flags, cartridges, memory map, etc
*   This excellent [explanation](https://realboyemulator.wordpress.com/2013/01/03/a-look-at-the-game-boy-bootstrap-let-the-fun-begin/) of the boot ROM
*   This [opcode table](https://www.pastraiser.com/cpu/gameboy/gameboy_opcodes.html) that details the full instruction set, including CB opcodes
*   This [full opcode reference](https://rednex.github.io/rgbds/gbz80.7.html) for the GBZ80
*   The [Game Boy CPU manual](http://marc.rawer.de/Gameboy/Docs/GBCPUman.pdf) (PDF)
*   The [GameBoy memory map](http://gameboy.mongenel.com/dmg/asmmemmap.html)
*   This [blog post](https://mattbruv.github.io/gameboy-crust/) that gives a pretty simple state machine for the different rendering steps
*   The [Ultimate Game Boy Talk](https://www.youtube.com/watch?v=HyzD8pNlpwI) (video) by Michael Steil at CCC
*   This [ROM generator](http://catskull.net/GB-Logo-Generator/) for custom logos
*   This [sample DAA implementation](https://www.reddit.com/r/EmuDev/comments/cdtuyw/gameboy_emulator_fails_blargg_daa_test/etwcyvy/)
*   This [awesome-gbdev](https://github.com/gbdev/awesome-gbdev) list
*   This [excellent emulator and debugger](https://github.com/drhelius/Gearboy)
*   Another [emulator and debugger](https://github.com/Jonazan2/PatBoy)
*   The [Game Boy complete technical reference](https://gekkio.fi/files/gb-docs/gbctr.pdf) (PDF)
*   This [Gameboy Overview](https://thomas.spurden.name/gameboy/)
*   blargg’s [test ROMs](https://gbdev.gg8.se/files/roms/blargg-gb-tests/) which have instruction tests, sound tests, etc
*   gekkio’s [emulator](https://github.com/Gekkio/mooneye-gb) and his [test ROMs](https://github.com/Gekkio/mooneye-test-suite)
*   This [fairly readable Go emulator](https://github.com/Humpheh/goboy), which has helped me make sense of some features
*   This [fairly readable C emulator](https://github.com/simias/gaembuoy)
*   This [fairly readable C++ implementation](https://github.com/MoleskiCoder/EightBit/blob/master/LR35902/src/LR35902.cpp)
*   This [helpful GPU implementation in Rust](https://github.com/mattbruv/Gameboy-Crust/blob/master/src/core/gpu.rs)
*   This [reference](https://gb-archive.github.io/salvage/decoding_gbz80_opcodes/Decoding%20Gamboy%20Z80%20Opcodes.html) for decoding GameBoy instructions.
    *   NOTE: This has one [bug](https://github.com/gb-archive/salvage/issues/1) that someone and I independently found. The [original repo](https://github.com/phire/Kea) has fixed the bug but not the page linked above.
*   This [summary blog post](http://web.archive.org/web/20200726064933/https://dandigit.com/posts/bigboy-writing-a-gameboy-emulator) explaining GPU modes
*   And of course [/r/emudev](https://old.reddit.com/r/EmuDev/)
*   [DIY emulator/VM resources](https://github.com/danistefanovic/build-your-own-x#build-your-own-emulator--virtual-machine)

[This](https://nullprogram.com/blog/2017/11/03/) is a potentially fun way to render the screen without SDL, but only for non-interactive purposes.

This [YouTube](https://www.youtube.com/playlist?list=PLye7LM1YVhDHR4TGMklN3tMt_J2jIrn1w) playlist looks like it could be worth a watch, but it’s a lot of hours.

Lists
-----
*   [awesome compilers resources](https://github.com/aalhour/awesome-compilers)
*   [programming language resources](https://github.com/danistefanovic/build-your-own-x#build-your-own-programming-language)


Communities
-----------

*   [/r/programminglanguages](https://reddit.com/r/programminglanguages)
*   [/r/compilers](https://reddit.com/r/compilers)
	

### Operating System


[OSDev](https://wiki.osdev.org/Main_Page)

[ Linux From Scratch](https://www.linuxfromscratch.org/)

[Writing an OS in Rust](https://os.phil-opp.com/)

[littleosbook](https://github.com/littleosbook/littleosbook/)

[OS from scratch](https://github.com/cfenollosa/os-tutorial)

[operating system resources](https://github.com/codecrafters-io/build-your-own-x#build-your-own-operating-system)


[Nand to Tetris courses](https://www.nand2tetris.org/)


### Assembly language

picking up assembly is something i would like to do ASAP.

[PC Assembly Language programming](https://pacman128.github.io/pcasm/)
 32bits 
 
 
Learning assembly for linux-x64 [asm](https://github.com/0xAX/asm)


Introduction to [ Programming Systems](https://www.cs.princeton.edu/courses/archive/spring04/cos217/) by princeton


[Easy 6502](https://skilldrick.github.io/easy6502/index.html)

[Assembly Language Adventures](https://www.xorpd.net/pages/x86_adventures.html)

[Assembly Language / Reversing / Malware Analysis / Game Hacking -resources](https://gist.github.com/muff-in/ff678b1fda17e6188aa0462a99626121)

[x86 Assembly Guide](https://www.cs.virginia.edu/~evans/cs216/guides/x86.html)

[Assembly Guide](https://github.com/mikeroyal/Assembly-Guide)
