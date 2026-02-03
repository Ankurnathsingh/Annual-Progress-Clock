function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function updateClockAndProgress() {
  const now = new Date();

  // Time
  const time = now.toLocaleTimeString("en-GB");
  document.getElementById("time").textContent = time;

  // Date
  const date = now.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  document.getElementById("date").textContent = date;

  // Year calculations
  const year = now.getFullYear();
  const start = new Date(year, 0, 1);
  const end = new Date(year + 1, 0, 1);

  const totalMs = end - start;
  const passedMs = now - start;

  const progress = (passedMs / totalMs) * 100;
  const totalDays = isLeapYear(year) ? 366 : 365;
  const dayOfYear = Math.floor(passedMs / (1000 * 60 * 60 * 24)) + 1;
  const daysRemaining = totalDays - dayOfYear;

  document.getElementById("progressFill").style.width = progress.toFixed(3) + "%";
  document.getElementById("progressText").textContent =
    `${progress.toFixed(2)}% of the year completed`;

  document.getElementById("dayOfYear").textContent =
    `Today is day ${dayOfYear} of ${totalDays}`;

  document.getElementById("daysRemaining").textContent =
    `${daysRemaining} days remaining in this year`;
}

setInterval(updateClockAndProgress, 1000);
updateClockAndProgress();
