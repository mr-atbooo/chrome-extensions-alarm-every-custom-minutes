chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.create("quarterHourAlarm", { periodInMinutes: 15 });
});


chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "quarterHourAlarm" || alarm.name === "customAlarm") {
        chrome.notifications.create({
            type: "basic",
            iconUrl: "icon.png",
            title: "⏰ Time Alert!",
            message: `It's time! Your alarm (${alarm.periodInMinutes} min) went off.`,
            silent: false
        });

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0 && tabs[0].url && !tabs[0].url.startsWith("chrome://")) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "playAlarm" });
            } else {
                console.warn("Skipping execution on chrome:// pages.");
            }
        });
    }
});
