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
kicksam = ["Kick.wav",'Kick1.wav', 'Kick2.wav', 'Kick3.wav', 'Kick4.wav', 'Kick5.wav', 'Kick6.wav', 'Kick7.wav']
keyssam = ["key.wav", 'key1.wav', 'key2.wav', 'key3.wav', 'key4.wav', 'key5.wav', 'key6.wav', 'key7.wav']
snaresam = ["snare.wav", 'snare1.wav', 'snare2.wav', 'snare3.wav', 'snare4.wav', 'snare5.wav', 'snare6.wav', 'snare7.wav']
symbolsam = ["hihat.wav", 'hihat1.wav', 'hihat2.wav', 'hihat3.wav', 'hihat4.wav', 'hihat5.wav', 'hihat6.wav', 'hihat7.wav']


$("#playTone").click(function () { 
    $('#playTone').prop('disabled',true).css('opacity',0.5);
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

    const hihat = new Tone.Sampler({
        urls: {
            D3: "hihat.wav"
        },
        baseUrl: "./instruments/Drums/",
    }).toDestination();


    const snare = new Tone.Sampler({
        urls: {
            C3: "snare.wav",
        },
        baseUrl: "./instruments/Drums/",
    }).toDestination();

    const other = new Tone.Sampler({
        urls: {
            C4: "other.wav",
        },
        baseUrl: "./instruments/Other/",
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

    delayer(sampler,snare,other)
    Tone.getDestination().volume.rampTo($("#volume").val(), 0);

    sampler.volume.value = -12;
    other.volume.value = -15;
    


    const first = Tone.Transport.scheduleRepeat((time) => {
        number = Math.floor(Math.random() * 3)
        createChords(number,curKey)
        Tone.loaded().then(() => {
        sampler.triggerAttackRelease(chordArray, "1n", time);
        other.triggerAttackRelease(chordArray, "1n", time)
        })
        //synth.triggerAttackRelease(chordArray, "2n", time);
    }, "1m");

    console.log(first);
    
    const second = Tone.Transport.scheduleRepeat((time) => {
        number = Math.floor(Math.random() * 7)
        length = Math.floor(Math.random() * 4)
        Tone.loaded().then(() => {
            sampler.triggerAttackRelease(curKey[number]+"3", noteLen[length], time)
            })
            
        //synth.triggerAttackRelease(curKey[number]+"4", noteLen[length], time);
    }, "4n", "2m");

    console.log(second);

    kick.volume.value = -4;
    snare.volume.value = -17;
    hihat.volume.value = -19;
    Tone.Transport.bpm.value = $("#tempo").val()
    Tone.Transport.swing = .9
    Tone.Transport.swingSubdivision = '8n'

    const third = Tone.Transport.scheduleRepeat((time) => {
        Tone.loaded().then(() => {
            kick.triggerAttackRelease("C3", "2n", time)
            })
            Tone.loaded().then(() => {
            snare.triggerAttackRelease("C3", "2n", time + Tone.Time("2n").toSeconds())
            })

            Tone.loaded().then(() => {
                hihat.triggerAttackRelease("D3", "8n", time)
                hihat.triggerAttackRelease("D3", "8n", time + Tone.Time("8n").toSeconds())
                hihat.triggerAttackRelease("D3", "8n", time + Tone.Time("4n").toSeconds())
                hihat.triggerAttackRelease("D3", "8n", time + Tone.Time("4n").toSeconds() + Tone.Time("8n").toSeconds())
                hihat.triggerAttackRelease("D3", "8n", time + Tone.Time("2n").toSeconds())
                hihat.triggerAttackRelease("D3", "8n", time + Tone.Time("2n").toSeconds() + Tone.Time("8n").toSeconds())
                hihat.triggerAttackRelease("D3", "8n", time + Tone.Time("2n").toSeconds() + Tone.Time("4n").toSeconds())
                hihat.triggerAttackRelease("D3", "8n", time + Tone.Time("2n").toSeconds() + Tone.Time("4n").toSeconds() + Tone.Time("8n").toSeconds())
                })

    }, "1m", "2m"); 

    console.log(third);

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
    Tone.Transport.clear(first);
    Tone.Transport.clear(second);
    Tone.Transport.clear(third);
    $('#playTone').prop('disabled',false).css('opacity',1);
});


});


function delayer(sampler,snare,guitar) {
    const pingPong = new Tone.PingPongDelay("4n", 0.2);
    pingPong.wet.value = ($("#delay").val())/100
    sampler.chain(pingPong, Tone.Destination)
    snare.chain(pingPong, Tone.Destination)
    guitar.chain(pingPong, Tone.Destination)
}







});