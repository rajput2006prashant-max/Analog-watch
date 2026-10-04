let is24Hour = true;

function updateClock() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Digital clock
    let ampm = hours >= 12 ? "PM" : "AM";
    let displayHours = is24Hour ? hours : (hours % 12 || 12);
    let formattedHours = String(displayHours).padStart(2, "0");
    let formattedMinutes = String(minutes).padStart(2, "0");
    let formattedSeconds = String(seconds).padStart(2, "0");

    document.getElementById("digitalTime").textContent =
        `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    document.getElementById("ampm").textContent = is24Hour ? "" : ampm;

    // Analog clock
    let hourDegree = (hours % 12) * 30 + minutes * 0.5;
    let minuteDegree = minutes * 6 + seconds * 0.1;
    let secondDegree = seconds * 6;

    document.getElementById("hour").style.transform =
        `translateX(-50%) rotate(${hourDegree}deg)`;

    document.getElementById("minute").style.transform =
        `translateX(-50%) rotate(${minuteDegree}deg)`;

    document.getElementById("second").style.transform =
        `translateX(-50%) rotate(${secondDegree}deg)`;

    // Date
    let dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    let monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    let day = dayNames[now.getDay()];
    let date = now.getDate();
    let month = monthNames[now.getMonth()];
    let year = now.getFullYear();
    let fullDate = `${day}, ${date} ${month} ${year}`;

    document.getElementById("date").textContent = fullDate;
}

// Clock update immediately and every second
updateClock();
setInterval(updateClock, 1000);

// Theme toggle
let themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        themeBtn.textContent = "🌙 Dark Mode";
    } else {
        themeBtn.textContent = "☀️ Light Mode";
    }
});

// Format toggle
let formatBtn = document.getElementById("formatBtn");

formatBtn.addEventListener("click", function () {
    is24Hour = !is24Hour;
    formatBtn.textContent = is24Hour ? "12 Hour" : "24 Hour";
    updateClock();
});

// Fullscreen toggle
let fullscreenBtn = document.getElementById("fullscreenBtn");

fullscreenBtn.addEventListener("click", async function () {
    try {
        if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
        } else {
            await document.exitFullscreen();
        }
    } catch (error) {
        console.log("Fullscreen not supported or blocked:", error);
    }
});

document.addEventListener("fullscreenchange", function () {
    fullscreenBtn.textContent = document.fullscreenElement ? "⤢ Exit Fullscreen" : "⛶ Fullscreen";
});
