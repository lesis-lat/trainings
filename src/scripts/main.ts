declare global {
    interface Window {
        googleTagManagerLoaded?: boolean;
        dataLayer: unknown[];
        gtag: (...commandArguments: unknown[]) => void;
    }
}

const expectedHost = "trainings.lesis.lat";

if (window.location.host === expectedHost && window.location.protocol !== "https:") {
    window.location.protocol = "https:";
}

const googleTagId = "G-BF7S2MHBGH";

const loadGoogleTagManager = (): void => {
    if (window.googleTagManagerLoaded) {
        return;
    }
    window.googleTagManagerLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(): void {
        window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", googleTagId);

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${googleTagId}`;
    script.async = true;
    document.head.appendChild(script);
};

const firstInteractionEvents: readonly (keyof WindowEventMap)[] = [
    "click",
    "scroll",
    "keydown",
    "mousemove",
    "touchstart",
];

firstInteractionEvents.forEach((eventName) => {
    window.addEventListener(eventName, loadGoogleTagManager, { once: true, passive: true });
});

const loadGoogleTagManagerFallbackDelayMs = 3000;
setTimeout(loadGoogleTagManager, loadGoogleTagManagerFallbackDelayMs);

export {};
