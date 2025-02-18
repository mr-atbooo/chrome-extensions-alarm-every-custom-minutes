// chrome.runtime.onMessage.addListener((message) => {
//     if (message.action === "playAlarm") {
//         chrome.storage.local.get("soundEnabled", (data) => {
//             if (data.soundEnabled) {
//                 let audio = new Audio(chrome.runtime.getURL("alarm.mp3"));
//                 audio.play().catch((error) => {
//                     console.error("Error playing alarm:", error);
//                     console.error("Error message:", error.message);
//                     console.error("Error name:", error.name);
//                     console.error("Error stack:", error.stack);
//                 });
//             } else {
//                 console.warn("Sound is disabled. User needs to enable it.");
//             }
//         });
//     }
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "playAlarm") {
        chrome.storage.local.get("soundEnabled", (data) => {
            if (data.soundEnabled) {
                let audio = new Audio(chrome.runtime.getURL("alarm.mp3"));

                // تأكد من تحميل الصوت بالكامل قبل تشغيله
                audio.addEventListener('canplaythrough', () => {
                    audio.play().catch((error) => {
                        console.error("Error playing alarm:", error);
                        console.error("Error message:", error.message);
                        console.error("Error name:", error.name);
                        console.error("Error stack:", error.stack);
                    });
                });

                audio.load();
            }
        });
    }
});
