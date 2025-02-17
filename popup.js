document.getElementById("setAlarm").addEventListener("click", () => {
    let minutes = parseInt(document.getElementById("minutes").value);
    if (isNaN(minutes) || minutes <= 0) {
        alert("Please enter a valid number of minutes.");
        return;
    }

    // ضبط المنبه بناءً على الدقائق المدخلة
    chrome.alarms.create("customAlarm", { periodInMinutes: minutes });

    alert(`Alarm set for every ${minutes} minutes.`);
});

document.getElementById("enableSound").addEventListener("click", () => {
    let audio = new Audio(chrome.runtime.getURL("alarm.mp3"));
    audio.play().then(() => {
        chrome.storage.local.set({ soundEnabled: true }, () => {
            alert("Sound enabled! The alarm will now play.");
        });
    }).catch((error) => {
        console.warn("Error enabling sound:", error);
    });
});
