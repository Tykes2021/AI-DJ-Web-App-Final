Peter_Pan_song="";

Harry_potter_Theme_song="";

rightWrist_x = 0;

rightWrist_y = 0;

leftWrist_x = 0;

leftWrist_y = 0;

scoreleftWrist = 0;

scorerightWrist = 0;

song_Peter_Pan = "";

song_Harry_potter_Theme = "";


function setup()

{

    canvas = createCanvas(600,530);

    canvas.center();

    video = createCapture(VIDEO);

    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);

    poseNet.on('pose',gotposes);

}

function preload()

{

    Peter_Pan_song = loadSound("Strange.mp3");

    Harry_potter_Theme_song = loadSound("Potter.mp3");

}

function draw()

{

    image(video,0,0,600,530);

    fill("#00ff00");

    stroke("#ff0000");

    song_Peter_Pan = Peter_Pan_song.isPlaying();

    console.log(song_Peter_Pan);

    song_Harry_potter_Theme = Harry_potter_Theme_song.isPlaying();

    console.log(song_Harry_potter_Theme);

    if(scoreleftWrist > 0.2)
    
    {

        circle(leftWrist_x,leftWrist_y,20);

        Harry_potter_Theme_song.stop();

        if(song_Peter_Pan == false)
        
        {

            Peter_Pan_song.play();

        }

        else
        
        {

            console.log("Song Name: Peter Pan Song");

            document.getElementById("song_id").innerHTML = "Song Name: Peter Pan Song";
       
        }

    }

    if(scorerightWrist > 0.2)
    
    {

        circle(rightWrist_x,rightWrist_y,20);

        Peter_Pan_song.stop();

        if(song_Harry_potter_Theme == false)
        
        {

            Harry_potter_Theme_song.play();

        }

        else
        
        {

            console.log("Song Name: Harry Potter Theme Song");

            
            document.getElementById("song_id").innerHTML = "Song Name: Harry Potter Theme Song";
       
        }
   
    }

}

function modelLoaded()

{

    console.log("poseNet Is Initialized");

}

function gotposes(results)

{
    if(results.length > 0)
    
    {

        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;

        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;

        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;

        leftWrist_y = results[0].pose.leftWrist.y;

        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;

        rightWrist_y = results[0].pose.rightWrist.y;

       console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);

    }

}