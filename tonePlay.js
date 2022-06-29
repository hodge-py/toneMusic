$(document).ready(function () {
const Tone = window.Tone
console.log(Tone);
console.log("heyyy");
$("#playTone").click(function (e) { 
    e.preventDefault();
    const synth = new Tone.PolySynth(Tone.FMSynth).toDestination();
    const now = Tone.now()

synth.triggerAttackRelease(["C4","E4","G4","B4"], "2n");

synth.triggerAttackRelease(["D4","F4","A4"], "2n",now+2);

});




});