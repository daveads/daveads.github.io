---
layout: post
title: 'Indentation in Python'
date: 2020-01-17
categories: [Language]
tags: [python]
---

## what is indentation:

According to [wikipedia - indentation](https://en.wikipedia.org/wiki/Indentation_(typesetting)) indent is an empty space at the beginning of a line to signal the start of a new paragraph.

![indent](/assets/images/indent.png)


   In Python indentation refers to the (spaces and tabs) that are used at the beginning of a statement, it is a way of telling the interpreter this part of the code belongs to the same group,in programming language like c, c++, java, kotlin.. curly braces {} are use to indicate the start and end of a block of code.. 

**indentation in java**
{% highlight cpp %}
public class indentation{ 
	public static void main(String[] args)
		{ // shows this is the body of the main method
		
		Scanner input = new Scanner(System.in);
		out.println("input a valid password")
		String user_input = input.next();

		if (user_input.equals("evad")){ // if statement body     
			out.println("logged in \n");
		}  
		else{
			out.println("incorrect password\n");
		}
	} //end of the main method
} //end of the of the porgramm 
{% endhighlight %}


**Question:** what's the whole point of indentation ?<br>
**Answer:** glance through the example below and tell me what you think about it. 

> The coherence theory states that a proposition is true if and only if that proposition coheres with the other propositions that one believes. . . . The problem with the coherence theory is that a belief could be consistent with my other beliefs and yet the whole lot could be false. —Colin McGinn (2015a, p. 148) According to the coherence theory of truth (see Young 2018), a set of propositions (or beliefs, or sentences) is true iff:they are mutually consistent, and 2.they are supported by, or consistent with, all available evidence; that is, they “cohere” with each other and with all evidence. Note that observation statements (that is, descriptions of what we observe in the world around us) are among the claims that must be mutually consistent, so this is
not (necessarily) a “pie-in-the-sky” theory that doesn’t have to relate to the way things
really are. It just says that we don’t have to have independent access to “reality” in
order to determine truth.
2.4.3Correspondence vs. Coherence Which theory is correct? Well, for one thing, there are more than two theories: There
are several versions of each kind of theory, and there are other theories of truth that
don’t fall under either category. The most important of the other theories is the “prag-
matic” theory of truth (see Glanzberg 2016, §3; Misak and Talisse 2019). Here is one
version: [T]he pragmatic theory of truth . . . is that a proposition is true if and only
[if] it is useful [that is, “pragmatic”, or practical] to believe that proposi-
tion. (McGinn, 2015a, p. 148, my interpolated brackets)
Another version states that a belief, proposition, or sentence is true iff it continues to
be accepted at the limit of inquiry:
Truth is that to which a belief would tend were it to tend indefinitely to a fixed
belief. (Edwin Martin, Jr., paraphrasing C.S. Peirce; lectures on the theory of
knowledge,Spring 1973; for more on Peirce, see §2.6.1.3,below.)46<br>


Indentation in python is very important because with out proper indenting you will end up seeing **IndentationError:** examples as seen below

{%  highlight python %}
if True:
print("yea true")
else:
print("not true")
{% endhighlight %}

In python when defining statement for functions and loops you do this using four white spaces or a single tab according to python indentation rules


{% highlight python %}
def print_statement():
    print("indented under print_statement")
    print("same")
    print("same")

a = 0;
b = 10
while(a <= 10):
    print_statement()
    a = a + 1
{% endhighlight %} 

**Importants of indentation:**

<div>
	<li>helps to properly structure the code</li>
	<li>makes the code beautiful (human readable)</li>
</div>


Python's Style guide [pep8](https://www.python.org/dev/peps/pep-0008/#indentation)<br>

[source code](https://github.com/Daveads/indentation)
