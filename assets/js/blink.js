document.addEventListener("DOMContentLoaded", function() {
    const link = document.querySelector(".blinking-link");
    const defaultColor = window.getComputedStyle(link).color; // Get the computed default color
    let blinkCount = 0;

    function blink() {
        if (blinkCount < 5 ) { 
            link.style.color = (blinkCount % 2 === 0) ? "#bf1010" : defaultColor;
            link.style.visibility = (blinkCount % 2 === 0) ? "visible" : "visible";
            blinkCount++;
            setTimeout(blink, 800); // Blink every 800 milliseconds (0.8 seconds)
        } else {
            link.style.color = defaultColor;
            link.style.visibility = "visible";
        }
    }

    blink();
});
