+++
title = "About"
template = "page.html"
path = "about"
+++

**NAME:** Adejumo David Adewale, known as Daveads on the internet. I write [Things](https://en.wikipedia.org/wiki/Computer_program) that get executed on a [Processor](https://en.wikipedia.org/wiki/Central_processing_unit) and leverage the [GPU](https://en.wikipedia.org/wiki/Graphics_processing_unit) and do other Thing i find interesting.


```
        ____                            _     
        |  _ \  __ ___   _____  __ _  __| |___ 
        | | | |/ _` \ \ / / _ \/ _` |/ _` / __|
        | |_| | (_| |\ V /  __/ (_| | (_| \__ \
        |____/ \__,_| \_/ \___|\__,_|\__,_|___/.
                                                            
```

<br>

```rust 
/** Daveads Identities **/
fn print_header(header: &str) {
    println!("\x1b[1;34m{}\x1b[0m", header);
}

fn print_identities(identities: &[&str]) {
    for identity in identities {
        println!("* {}", identity);
    }
}

fn main() {
    let identities = [
        "Independent Researcher 🔍",
        "Software Engineer 💻",
        "Pianist (jazz enthusiast) 🎹",
        "Chess Player ♟️",
        "Curiosity Voyager 🌌"
    ];

    print_header(" { Current :: Identities } ");
    print_identities(&identities);
}
```

<br>

**Others:**
* <a href="/contact" class="blinking-link">Virtual Presence</a>
* [Notes](/note) ::{ If interested in a raw format of what I am reading or doing. }
* [Todo](/todo)
* [RSS Feed](/atom.xml)