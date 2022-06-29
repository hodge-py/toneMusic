$(document).ready(function () {
const Tone = window.Tone
console.log(Tone);
console.log("heyyy");
$("#playTone").click(function (e) { 
    e.preventDefault();
    const synth = new Tone.PolySynth(Tone.FMSynth).toDestination();
    const now = Tone.now()
    const sampler = new Tone.Sampler({
        urls: {
            C1: "key.wav",
        },
        baseUrl: "./instruments/",
        onload: () => {
            sampler.triggerAttackRelease(["C1", "E1", "G1", "B1"], 0.5);
        }
    }).toDestination();
});




});