$(document).ready(function () {
const Tone = window.Tone
const recorder = new Tone.Recorder();

console.log(Tone.Destination);
Tone.getDestination().connect(recorder)

console.log(Tone);
const aminor = ["A","B","C","D","E","F","G"]
const cmajor = ["C","D","E","F","G","A","B"]
const gmajor = ["G","A","B","C","D","E","F#"]
const eminor = ["E", "F#", "G", "A","B","C","D"]
const dmajor = ["D", "E", "F#", "G", "A", "B", "C#"]
const bminor = ["B", "C#","D", "E", "F#", "G", "A"]

var chooser
var test
var pingPong
var reverb
var tremo
var choro
var phase
var curKey
var filter
var chordArray = []
noteLen = ["2n","4n","8n","16n"]
kicksam = ["Kick.wav",'Kick_(2).wav', 'Kick_(3).wav', 'Kick_(4).wav', 'Kick_(5).wav', 'Kick_(6).wav', 'Kick_(7).wav', 'Kick_(8).wav']
keyssam = ["keys.wav", 'keys_(2).wav', 'keys_(3).wav', 'keys_(4).wav', 'keys_(5).wav', 'keys_(6).wav', 'keys_(7).wav', 'keys_(8).wav']
snaresam = ["snare.wav",'snare_(2).wav', 'snare_(3).wav', 'snare_(4).wav', 'snare_(5).wav', 'snare_(6).wav', 'snare_(7).wav', 'snare_(8).wav']
symbolsam = ["hihat.wav", 'hihat_(2).wav', 'hihat_(3).wav', 'hihat_(4).wav', 'hihat_(5).wav', 'hihat_(6).wav', 'hihat_(7).wav', 'hihat_(8).wav']
othersam = ["other.wav", 'other_(2).wav', 'other_(3).wav', 'other_(4).wav', 'other_(5).wav', 'other_(6).wav', 'other_(7).wav', 'other_(8).wav']
basssam = ["bass.wav", 'bass_(2).wav', 'bass_(3).wav', 'bass_(4).wav', 'bass_(5).wav', 'bass_(6).wav', 'bass_(7).wav', 'bass_(8).wav']


$("#playTone").click(function () { 
    $('#playTone').prop('disabled',true).css('opacity',0.5);
    var chordArray = []
    const now = Tone.now()
    const sampler = new Tone.Sampler({
        urls: {
            C3: keyssam[Math.floor(Math.random() * 8)],
        },
        baseUrl: "./instruments/Keys/",
    });

    const kick = new Tone.Sampler({
        urls: {
            C3: kicksam[Math.floor(Math.random() * 8)],
        },
        baseUrl: "./instruments/Drums/",
    });

    const hihat = new Tone.Sampler({
        urls: {
            D3: symbolsam[0]
        },
        baseUrl: "./instruments/Drums/",
    });


    const snare = new Tone.Sampler({
        urls: {
            C3: snaresam[Math.floor(Math.random() * 8)],
        },
        baseUrl: "./instruments/Drums/",
    });

    const other = new Tone.Sampler({
        urls: {
            C4: othersam[Math.floor(Math.random() * 8)],
        },
        baseUrl: "./instruments/Other/",
    });

    const bass = new Tone.Sampler({
        urls: {
            C4: basssam[Math.floor(Math.random() * 8)],
        },
        baseUrl: "./instruments/Bass/",
    });


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

    delayer(sampler,snare,other,hihat,kick,bass)
    Tone.getDestination().volume.rampTo($("#volume").val(), 0);

    
    sampler.volume.value = -17;
    other.volume.value = -17;
    bass.volume.value = -17;


    const first = Tone.Transport.scheduleRepeat((time) => {
        number = Math.floor(Math.random() * 7)
        createChords(number,curKey)
        Tone.loaded().then(() => {
        sampler.triggerAttackRelease(chordArray, "1n", time);
        other.triggerAttackRelease(chordArray, "1n", time);
        bass.triggerAttackRelease(chordArray[0], "1n", time)
        })
        //synth.triggerAttackRelease(chordArray, "2n", time);
    }, "4n");

    console.log(first);
    
    const second = Tone.Transport.scheduleRepeat((time) => {
        number = Math.floor(Math.random() * 7)
        length = Math.floor(Math.random() * 4)
        Tone.loaded().then(() => {
            sampler.triggerAttackRelease(curKey[number]+"3", noteLen[length], time)
            })
            
        //synth.triggerAttackRelease(curKey[number]+"4", noteLen[length], time);
    }, '4n', "2m");

    console.log(second);

    kick.volume.value = -12;
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

    recorder.start()
    console.log(recorder);
    console.log(third);
    Tone.Transport.start();
   
    


    function createChords(number, key) {
        var chance = Math.random()
        switch(number) {
            case 0:
              if (chance < .5){
                console.log("swee");
                chordArray = [key[0]+"3",key[2]+"3",key[4]+"3"];
              }
              else {
                console.log("cooool");
                chordArray = [key[0]+"3",key[2]+"3",key[4]+"3",key[6]+"3"];
              }
              break;
            case 1:
                chordArray = [key[1]+"3",key[3]+"3",key[5]+"3"];
              break;
            case 2:
              chordArray = [key[2]+"3",key[4]+"3",key[6]+"3"];
              break;
            case 3:
              chordArray = [key[3]+"3",key[5]+"3",key[0]+"3"];
              break;
            case 4:
              chordArray = [key[4]+"3",key[6]+"3",key[1]+"3"];
              break;
            case 5:
              chordArray = [key[5]+"3",key[0]+"3",key[2]+"3"];
              break;
            case 6:
              chordArray = [key[6]+"3",key[1]+"3",key[3]+"3"];
              break;


    }

}



$("#stopTone").click(async function () { 
    Tone.Transport.stop();
    var recording = await recorder.stop()
    console.log(recording);
    handleStop(recording)
    Tone.Transport.clear(first);
    Tone.Transport.clear(second);
    Tone.Transport.clear(third);
    $('#playTone').prop('disabled',false).css('opacity',1);
});


});



$(document).on('input', '#volume', function() {
    $("#volout").html($(this).val());
    Tone.getDestination().volume.rampTo($(this).val(), 0)
});

$(document).on('input', '#delay', function() {
    $("#delayout").html($(this).val());
    pingPong.wet.value = ($(this).val())/100
});

$(document).on('input', '#myRange', function() {
    $("#revout").html($(this).val());
    reverb.wet.value = ($(this).val())/100
});
$(document).on('input', '#trem', function() {
    $("#tremout").html($(this).val());
    tremo.wet.value = ($(this).val())/100
});
$(document).on('input', '#panner', function() {
    $("#panout").html($(this).val());
    choro.wet.value = ($(this).val())/100
});
$(document).on('input', '#phaser', function() {
    $("#phaseout").html($(this).val());
    phase.wet.value = ($(this).val())/100
});


function delayer(sampler,snare,guitar,hi,kick,bass) {
    pingPong = new Tone.PingPongDelay("4n", 0.2);
    reverb = new Tone.Freeverb(.9)
    tremo = new Tone.Tremolo(9, 0.75)
    pingPong.wet.value = ($("#delay").val())/100
    reverb.wet.value = ($("#myRange").val())/100
    tremo.wet.value = ($("#trem").val())/100
    choro = new Tone.Chorus(4, 2.5, 0.5)
    choro.wet.value = ($("#panner").val())/100
    phase = new Tone.Phaser({
        frequency: 15,
        octaves: 5,
        baseFrequency: 1000
    })
    phase.wet.value = ($("#phaser").val())/100
    sampler.chain(pingPong, reverb, tremo,choro, phase, Tone.Destination)
    snare.chain(pingPong, reverb, tremo, choro, phase, Tone.Destination)
    guitar.chain(pingPong, reverb, tremo, choro, phase, Tone.Destination)
    hi.chain(pingPong, reverb, tremo, choro, phase, Tone.Destination)
    kick.chain(pingPong, reverb, tremo, choro, phase, Tone.Destination)
    bass.chain(pingPong, reverb, tremo, choro, phase, Tone.Destination)
}

function eq3(sampler,snare,guitar,hi,kick,bass) {
    filter = new Tone.EQ3(0,-40,-40)
    sampler.chain(filter, Tone.Destination)
    snare.chain(filter, Tone.Destination)
    guitar.chain(filter, Tone.Destination)
    hi.chain(filter, Tone.Destination)
    kick.chain(filter, Tone.Destination)
    bass.chain(filter, Tone.Destination)
}



  async function handleStop(chunks) {
    ended = URL.createObjectURL(chunks)
    document.getElementById('finishAud').src = ended
    console.log(document.getElementById('finishAud'))
    document.getElementById('control').load()
  }




});