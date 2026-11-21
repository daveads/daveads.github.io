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