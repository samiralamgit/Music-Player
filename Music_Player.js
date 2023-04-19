const previous = document.getElementById('prev')
const play=document.querySelector('.play')
const next=document.querySelector('.next')

const trackImage=document.querySelector('.track-image')
const title=document.querySelector('.title')
const artist=document.querySelector('.artist')

const trackCurrentTime=document.querySelector('.current-time')
const trackDuration=document.querySelector('.duration-time')
const slider=document.querySelector('.duration-slider')

const showVolume=document.querySelector('#show-volume')
const volumeIcon=document.querySelector('#volume-icon')
const currentVolume=document.querySelector('#volume')

const autoPlayBtn=document.querySelector('.play-all')

const hamBurger=document.querySelector('.fa-bars')
const closeIcon=document.querySelector('.fa-times')

const musicPlaylist=document.querySelector('.music-playlist')
const pDiv=document.querySelector('.playlist-div')
const Playlist=document.querySelector('.playlist')

let trackList=[
    {name: "KGF Theme", Path: "My files for project/music player/Songs/1.mp3", singer: "himesh reshamiya", img: "My files for project/music player/cover.webp"},
    {name: "Masroof  hai dil kitna", Path: "My files for project/music player/Songs/2.mp3", singer: "himesh reshamiya", img: "My files for project/music player/image/2.webp"},
    {name: "Saami saami", Path: "My files for project/music player/Songs/3.mp3", singer: "himesh reshamiya", img: "My files for project/music player/image/3.jpg"},
    {name: "Paracitamol", Path: "My files for project/music player/Songs/4.mp3", singer: "Jubin Nautiyal", img: "My files for project/music player/image/4.jpg"},
    {name: "Jaan bhi de dege", Path: "My files for project/music player/Songs/5.mp3", singer: "himesh reshamiya", img: "My files for project/music player/image/5.jpg"},
    {name: "Pahali najar main", Path: "My files for project/music player/Songs/6.mp3", singer: "Atif Aslam", img: "My files for project/music player/image/6.jpg"},
    {name: "Ra Ra Raakaama", Path: "My files for project/music player/Songs/7.mp3", singer: "himesh reshamiya", img: "My files for project/music player/image/7.jpg"},
    {name: "Radhe Krishana", Path: "My files for project/music player/Songs/8.mp3", singer: "himesh reshamiya", img: "My files for project/music player/image/18.jpg"},
    {name: "Dhora Dhora", Path: "My files for project/music player/Songs/9.mp3", singer: "himesh reshamiya", img: "My files for project/music player/image/9.jpg"},
    {name: "Love me like you do", Path: "My files for project/music player/Songs/10.mp3", singer: "himesh reshamiya", img: "My files for project/music player/image/10.jpg"},
    {name: "Sun Sathiya", Path: "My files for project/music player/Songs/11.mp3", singer: "himesh reshamiya", img: "My files for project/music player/image/11.jpg"}
]

let timer;
let autoplay=0;
let indexTrack=0;
let songIsPlaying=false;
let track=document.createElement('audio');

// All Eventlistener
play.addEventListener('click', justPlay);
next.addEventListener('click', nextSong);
previous.addEventListener('click', prevSong);
autoPlayBtn.addEventListener('click', autoPlayToggle);
volumeIcon.addEventListener('click', muteSound);
currentVolume.addEventListener('change', changeVolume);
slider.addEventListener('change', changeDuration);
track.addEventListener('timeupdate', songTimeUpdatr);
hamBurger.addEventListener('click', showPlayList);
closeIcon.addEventListener('click', hidePlayList);;

//load Track
function loadTrack(indexTrack){
    clearInterval(timer);
    resetSlider();

    title.innerHTML=trackList[indexTrack].name;
    track.src=trackList[indexTrack].Path;
    artist.innerHTML=trackList[indexTrack].singer;
    trackImage.src=trackList[indexTrack].img;
    track.load();

    timer=setInterval(updateSlider,  1000);
}
loadTrack(indexTrack);



// Play Song or Pause Song
function justPlay(){           //Self
    if(songIsPlaying==false || track.paused){
        playSong();
    }
    else{
        pauseSong();
    }
}

//Play Song
function playSong(){
    track.play();
    songIsPlaying=true;
    play.innerHTML='<i class="fa-solid fa-2x fa-circle-pause">'
}

//Pause Song
function pauseSong(){
    track.pause();
    songIsPlaying=false;
    play.innerHTML='<i class="fa-solid fa-2x fa-circle-play">'
}

// Next song
function nextSong(){
    if(indexTrack < trackList.length-1){
        indexTrack++;
        loadTrack(indexTrack);
        playSong();
    }
    else{
        indexTrack=0;
        loadTrack(indexTrack);
        playSong();
    }
}

// prev song
function prevSong() {
    if (indexTrack > 0) {
      indexTrack--;
      loadTrack(indexTrack);
      playSong();
    }
    else {
      indexTrack = trackList.length - 1;
      loadTrack(indexTrack);
      playSong();
    }
}

// Mute Sound
function muteSound(){
    track.volume=0
    showVolume.innerHTML=0;
    currentVolume=0;
}


// Change Volume
function changeVolume(){
    showVolume.value = currentVolume.value;
    track.volume=currentVolume.value/100;
}

// Change duration  (seek bar)
function changeDuration(){
    let sliderPostion = (track.duration*slider.value/100);
    track.currentTime = sliderPostion;
}

// Auto Play
function autoPlayToggle(){
    if(autoplay == 0){
        autoplay=1;
        autoPlayBtn.style.background = "#db6400";
    }
    else{
        autoplay= 0;
        autoPlayBtn.style.background = "#ccc";
    }
}

// Reset Slider
function resetSlider(){
    slider.value=0;
}

// Update Slider
function updateSlider(){
    let postion=0;

    if(!isNaN(track.duration)){
        postion = track.currentTime*(100/track.duration);
        slider.value = postion;
    }

    if(track.ended){
        play.innerHTML='<i class="fa-solid fa-2x fa-circle-play">'

        if(autoplay == 1 && indexTrack < trackList.length - 1){
            indexTrack++;
            loadTrack(indexTrack);
            playSong();
        }
        else if(autoplay == 1 && indexTrack == trackList.length -1){
            indexTrack=0;
            loadTrack(indexTrack);
            playSong();
        }
    }
}

// Update current Song Time
function songTimeUpdatr(){
    if(track.duration){
        let curmins=Math.floor(track.currentTime / 60);
        let cursecs=Math.floor(track.currentTime - curmins*60);
        
        let durmins=Math.floor(track.duration / 60);
        let dursecs=Math.floor(track.duration - durmins*60);
    
        if(dursecs < 10){
            dursecs ="0"+dursecs;
        }
        if(durmins < 10){
            durmins ="0"+durmins;
        }
        if(curmins < 10){
            curmins ="0"+curmins;
        }
        if(cursecs < 10){
            cursecs ="0"+cursecs;
        }
        trackCurrentTime.innerHTML =curmins + ":" + cursecs;
        trackDuration.innerHTML =durmins + ":" + dursecs;
    }
    else{
        trackCurrentTime.innerHTML ="00" + ":" + "00";
        trackDuration.innerHTML ="00" + ":" + "00";
    }
    
}

// Show Play List
function showPlayList(){
    musicPlaylist.style.transform= "translateX(0)";
}

// Hide Play List
function hidePlayList(){
    musicPlaylist.style.transform= "translateX(-100%)";
}

// Display track in play list
let counter = 1;
function displayTrack(){
    for(let i=0;i<trackList.length;i++){
        console.log(trackList[i].name);
        let div = document.createElement('div');
        div.classList.add('playlist');
        div.innerHTML= `<span class="song-index">${counter++}</span>
        <p class="single-song">${trackList[i].name}</p>`;

        pDiv.appendChild(div);
    }

    playFromPlaylist();

}
displayTrack();

// Play From playlist
function playFromPlaylist(){
    pDiv.addEventListener('click', (e)=>{
        if(e.target.classList.contains("single-song")){
            // alert(e.target.innerHTML);
            const indexNum = trackList.findIndex((item, index)=>{
                if(item.name==e.target.innerHTML){
                    return true;
                }
            })
            loadTrack(indexNum);
            playSong();
            hidePlayList();
        }
    })
}