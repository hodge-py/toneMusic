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
        baseUrl: "./instruments/Keys/",
    }).toDestination();

    Tone.loaded().then(() => {
    sampler.triggerAttackRelease(["Eb1", "G1", "Bb1"], "1n")
    })



});




});