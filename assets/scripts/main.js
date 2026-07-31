const expectedHost = "trainings.lesis.lat";

if (window.location.host === expectedHost && window.location.protocol !== "https:") {
    window.location.protocol = "https:";
}
