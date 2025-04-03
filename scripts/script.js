let rain;
let fft;

$(document).ready(function()
 {



    // get it to say good morning / good afternoon etc
    var today = new Date()
    var curHr = today.getHours()

    if (curHr < 12) {
        $('#hello').html('Good Morning.')
        } else if (curHr < 18) {
        $('#hello').html('Good Afternoon.')
        } else {
        $('#hello').html('Good Evening.')
        }



        // used these before i did some new code but also these might still be used somewhere so i am leaving them... this is not best practice but it's more important to me that this works
var thunder = new Audio('../assets/sounds/thunder.mp3')
thunder.volume = 1


// message changes occassionally with suggestions of what you can do
let messages = [
    "Press T for thunder.",
    "Press B for birds singing.",
    "Press W for wind.",
    "Press R for rainbow.",
    "Press S for a siren.",
    "Try drawing some clouds."
];

// Update that text
function updateText() {
    let randomIndex = Math.floor(Math.random() * messages.length); 
    $('.fill').text(messages[randomIndex]); 
}

updateText(); 
setInterval(updateText, 10000); // Change every 10 seconds




// buttons

$(document).on('click', '#restart', function() {
    location.reload();
    console.log("MEOW");
});

$(document).on('click', '#about', function() {
    $('#about-div').toggleClass('show');
});

$(document).on('click', '#settings', function() {
    console.log('test');
    $('#settings-div').toggleClass('show');
});

// Weather Buttons
$(document).on('click', '#snow', function() {
    $('#body').removeClass().addClass('snowbg');
    $('#snow').addClass('selected');
    $('#rain, #sun').removeClass('selected');
    rain.pause();
    r.pause()
        // rain.play();
});

$(document).on('click', '#rain', function() {
    let peaks;
    let audioStarted = false; // Track whether audio has started
    $('#body').removeClass().addClass('rainbg');
    $('#rain').addClass('selected');
    $('#sun, #snow').removeClass('selected');
    rain.volume = 0.25;
    // rain.play();
   
    
});

$(document).on('click', '#sun', function() {
    $('#body').removeClass().addClass('sunbg');
    $('#sun').addClass('selected');
    $('#rain, #snow').removeClass('selected');
    rain.pause();
});



    // PLAY AUDIOS ON KEY PRESs
      
    let count = 0; 
    let recordedElements = []; // Array for the sounds
    let timerInterval;
    
    // Sound library
    const sounds = {
        t: new Audio('../assets/sounds/thunder.mp3'),
        w: new Audio('../assets/sounds/wind.mp3'),
        b: new Audio('../assets/sounds/bird.mp3'),
        r: new Audio('../assets/sounds/rainbow.mp3'),
        s: new Audio('../assets/sounds/siren.mp3'),
    };
    
    // Set individual sound volumes
    sounds.b.volume = 0.1;
    sounds.r.volume = 0.25;
    sounds.s.volume = 1;
    
    // 
    Object.values(sounds).forEach(sound => {
        sound.preload = "auto";
    });
    
    // Start the timer 
    function startTimer() {
        timerInterval = setInterval(() => {
            count++;
            $("#counter").html(count);
    
    
            recordedElements.forEach(event => {
                if (event.time === count) {
                    let audioDupe = new Audio(event.audio.src); 
                    // this is the copied sound ^^^
                    audioDupe.volume = event.volume;
                    audioDupe.play();
                }
            });
    
            // Reset counter at 60 seconds
            if (count >= 60) {
                count = 0;
            }
        }, 1000);
    }
    
    // Keypress code
    $(document).keydown(function(event) {
        let key = event.key.toLowerCase();
        if (sounds[key]) { // If key has an associated sound
            let soundClone = new Audio(sounds[key].src);
            soundClone.volume = sounds[key].volume;
            soundClone.play();
            
            // Save the keypress event
            recordedElements.push({ time: count, audio: soundClone, volume: sounds[key].volume });
        }
    });
    

    
    

 })

 // sketch js



//  clouds and rainbows
 let groups = []; // Stores multiple groups of ellipses
 let tempEllipses = []; // Ellipse memory
 let fadeDuration = 7000 // 
 let rainbowStartTime = null; 
 let windStartTime = null;
const rainbowDuration = 5000; // 5 seconds in milliseconds

 
function setup() {
    let newCanvas = createCanvas(windowWidth, windowHeight);
    newCanvas.position(0, 0);
    newCanvas.style('z-index', '-1'); 
    clear(); // Make it transparent
}

// resize protection
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    clear();


    let currentTime = millis();

    for (let i = groups.length - 1; i >= 0; i--) {
        let group = groups[i];

        if (group.moving) {
            group.x += group.speed * 0.5;
        }

        let elapsedTime = currentTime - group.startTime;
        let fadeFactor = 1 - (elapsedTime / fadeDuration);
        fadeFactor = constrain(fadeFactor, 0, 1);

        if (fadeFactor <= 0) {
            groups.splice(i, 1);
            continue;
        }

        for (let e of group.ellipses) {
            let newOpacity = fadeFactor * 255;
            fill(217, 217, 217, newOpacity);
            noStroke();
            ellipse(e.x + group.x, e.y, e.size);
        }
    }
}


// 
let windSide;
    
$(document).keydown(function(event) {
    console.log("Key pressed:", event.key); // Log every key press

    if (event.key === 'r' || event.key === 'R') {
        rainbowStartTime = millis(); 
        $('#main').addClass('rainbow'); 
    
        setTimeout(() => {
            $('#main').removeClass('rainbow'); 
            console.log("Rainbow removed");
        }, 5000);
    } else if (event.key === 'w' || event.key === 'W') {
        windStartTime = millis(); 
        console.log("must've been the wind");

// check for wind and add class
        if ($('#wind').length) { 
            $('#wind').addClass('active');
            console.log("Woooooo that was wind");

            setTimeout(() => {
                $('#wind').removeClass('active'); 
                console.log("wind gone");
            }, 3000);
        } else {
            console.log("this should never happen");
        }
    }
});



    //  Cloud storage and movement code ☁️☁️☁️☁️
     for (let e of tempEllipses) {
         fill(217, 217, 217, 255); // Fully visible while drawing
         noStroke();
         ellipse(e.x, e.y, e.size);
     }
 
 
 // C
 function mouseDragged() {
     tempEllipses.push({
         x: mouseX,
         y: mouseY,
         size: random(50, 100),
     });
 }
 
// keep clouds shape
 function mouseReleased() {
     if (tempEllipses.length > 0) {
         groups.push({
             ellipses: tempEllipses, // Store the whole shape
             x: 0, // Track horizontal movement
             speed: random(0.5, 1) * (random() > 0.5 ? 1 : -1), // Move left/right (half as fast)
             moving: true, // Start movement only after release
             startTime: millis(), // Save the time when movement starts
         });
     }
     tempEllipses = []; // clear it

 }


// audio visualizer code attempt
function sketch2(p) { 
    p.preload = function () {
        rain = p.loadSound('../assets/sounds/rain.mp3', () => {
            console.log("Audio loaded successfully.");
        }, () => {
            console.log("Error loading audio!");
        });

        // PLAY AND PAUSE

$(document).on('click', '#click-me', function() {
    $('#play').html(`<img id="test" src="assets/pause.svg" alt="pause">`);
    console.log('meowma');
    rain.volume = 0.6
    rain.play()
    $('#arrow').toggleClass('going')
    startTimer();
});

if ($('.sun').length) {
    rain.pause()
    // this should make the rain silent but it doesn't
    rain.volume = 0
}




$(document).on('click', '#test', function() {
    $('#play').html(`<img id="click-me" src="assets/play.svg" alt="play">`);
    console.log('meowma');      
        rain.pause();
        $('#arrow').toggleClass('going')
});

    };

    p.setup = function () {
        fft = new p5.FFT();
        // this isolates waveforms or something somehow
        let newCanvas2 = p.createCanvas(400, 200);
        newCanvas2.parent('visualizer');
        p.clear();
        p.noFill();

        newCanvas2.style('display', 'block');
        newCanvas2.style('margin', '0 auto');

        // Make sure the visualizer starts playing when the user interacts
        function startAudio() {
            if (!audioStarted) {
                // rain.play();
                audioStarted = true;
                console.log("Audio started!");
            }
        }

        document.addEventListener("click", startAudio);
        document.addEventListener("keydown", startAudio); // Also allow keypress to trigger playback
    };

    p.draw = function () {
        p.clear();

        // Get the peaks of the audio (ensures data is available)
        if (!peaks || peaks.length === 0) {
            peaks = rain.getPeaks(p.width);
        }

        if (!peaks.length) return;

        p.stroke(255);
        p.strokeWeight(2);

        for (let i = 0; i < peaks.length; i++) {
            let x = i * (p.width / peaks.length);
            let y1 = p.height / 2 + peaks[i] * 100;
            let y2 = p.height / 2 - peaks[i] * 100;
            p.line(x, y1, x, y2);
        }
    };
}

new p5(sketch2);


