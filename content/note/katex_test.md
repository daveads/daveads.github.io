+++
title = "Hello Katex"
date = 2024-05-31
+++

### Testing out katex

// using shortcodes

Here is some inline math: {{ katex(body="$a^2 + b^2 = c^2$") }}

{{ katex(body="$$\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2} $$")}}


<br>

// Directly in the markdown

Here's an inline equation: $E = mc^2$

$E = mc^2$

Display equation:

$$
\frac{\partial f}{\partial x} = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}
$$
