chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "playAlarm") {
        chrome.storage.local.get("soundEnabled", (data) => {
            if (data.soundEnabled) {
                let audio = new Audio(chrome.runtime.getURL("alarm.mp3"));
                audio.play().catch((error) => {
                    console.error("Error playing alarm:", error);
                });
            } else {
                console.warn("Sound is disabled. User needs to enable it.");
            }
        });
    }
});
