$(document).ready(function () {
const Tone = window.Tone
console.log(Tone);
const aminor = ["A","B","C","D","E","F","G"]
const cmajor = ["C","D","E","F","G","A","B"]
const gmajor = ["G","A","B","C","D","E","F#"]
const eminor = ["E", "F#", "G", "A","B","C","D"]
const dmajor = ["D", "E", "F#", "G", "A", "B", "C#"]
const bminor = ["B", "C#","D", "E", "F#", "G", "A"]

var curKey
var chordArray = []
noteLen = ["2n","4n","8n","16n"]

$("#playTone").click(function () { 
    var chordArray = []
    const now = Tone.now()
    const sampler = new Tone.Sampler({
        urls: {
            C3: "key.wav",
        },
        baseUrl: "./instruments/Keys/",
    }).toDestination();

    const kick = new Tone.Sampler({
        urls: {
            C3: "Kick.wav",
        },
        baseUrl: "./instruments/Drums/",
    }).toDestination();

    const snare = new Tone.Sampler({
        urls: {
            C3: "snare.wav",
        },
        baseUrl: "./instruments/Drums/",
    }).toDestination();


    key = $("#MusicKey option:selected").val();
    if (key == "Cmaj"){
        curKey = cmajor
    }
    else if (key == "Amin"){
        curKey = aminor
    }
    else if (key == "Gmaj"){
        curKey = gmajor
    }
    else if (key == "Emin"){
        curKey = eminor
    }


    const synth = new Tone.PolySynth(Tone.MonoSynth).toDestination();
    sampler.volume.value = -12;

    Tone.Transport.scheduleRepeat((time) => {
        number = Math.floor(Math.random() * 3)
        createChords(number,curKey)
        sampler.triggerAttackRelease(chordArray, "1n", time);
        //synth.triggerAttackRelease(chordArray, "2n", time);
    }, "1m");
    
    Tone.Transport.scheduleRepeat((time) => {
        number = Math.floor(Math.random() * 7)
        length = Math.floor(Math.random() * 4)
        Tone.loaded().then(() => {
            sampler.triggerAttackRelease(curKey[number]+"3", noteLen[length], time)
            })
            
        //synth.triggerAttackRelease(curKey[number]+"4", noteLen[length], time);
    }, "4n", "2m");

    kick.volume.value = -7;
    snare.volume.value = -17;


    Tone.Transport.scheduleRepeat((time) => {
        Tone.loaded().then(() => {
            kick.triggerAttackRelease("C3", "2n", time)
            })
            Tone.loaded().then(() => {
            snare.triggerAttackRelease("C3", "2n", time + Tone.Time("2n").toSeconds())
            })

    }, "1m", "2m"); 



    Tone.Transport.start();









    function createChords(number, key) {
        switch(number) {
            case 0:
              chordArray = [key[0]+"3",key[2]+"3",key[4]+"3"];
              break;
            case 1:
                chordArray = [key[1]+"3",key[3]+"3",key[5]+"3"];
              break;
            case 2:
              chordArray = [key[2]+"3",key[4]+"3",key[6]+"3"];
              break;
    }

}






$("#stopTone").click(function () { 
    Tone.Transport.stop();
});


});









});