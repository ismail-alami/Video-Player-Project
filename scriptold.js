const video = document.getElementById("video");
const play = document.getElementById("play");
const container = document.getElementById("container");
const videoPlayer = document.getElementById("video-player");
const navigation = document.getElementById("navigation");
const volume = document.getElementById("volume");
const fullscreen = document.getElementById("fullscreen");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");
const title = document.getElementById("title");
const views = document.getElementById("views");
const browse = document.getElementById("browse");
const suggestion1 = document.getElementById("suggestion1");
const suggestion2 = document.getElementById("suggestion2");
const suggestion3 = document.getElementById("suggestion3");
const suggestion4 = document.getElementById("suggestion4");
const thumbnail = document.getElementById("thumbnail");
const suggInfo = document.getElementById("sugg-info");
const search = document.getElementById("search");
const searchResults = document.getElementById("search-results");
const comments = document.getElementById("comments");
const addComment = document.getElementById("add-comment");
const inputText = document.getElementById("input-text");
const comment = document.getElementById("comment");
const text = document.getElementById("text");
const duration = document.getElementById("duration");
const sausage = document.getElementById("sausage");
const trynot = document.getElementById("trynot");
const seed = document.getElementById("seed");
const lifehack = document.getElementById("lifehack");
const imageFile = document.getElementById("image-file");
const kitty = document.getElementById("kitty");
const submitBtn = document.getElementById("submit-btn");
const form = document.getElementById("form");
const formSubmit = document.getElementById("form-submit");
const vidTitle = document.getElementById("vidTitle");
const modalForm = document.getElementById("modal-form");
const dots = document.querySelectorAll("dots");
const choices = document.getElementById("choices");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");

const commentSection = document.getElementById("commentSection");
const show = document.getElementById("show");
const close = document.getElementById("close");



let vids = [];

let uploaded_img = "";

// Search for videos

function filterVideos(e) {
  const term = e.target.value.toUpperCase();
  const videos = document.querySelectorAll(".suggestion");

  videos.forEach((suggestion) => {
    const title = suggestion
      .querySelector(".sugg-info")
      .innerText.toUpperCase();

    if (title.indexOf(term) > -1) {
      searchResults.innerHTML = `
    <div class="result" id="result">
        <img src="img/${term}.png">
        <h3>${term}</h3>
      </div>  
    `;
    } else {
      searchResults.innerHTML = `<h3>No results for this keyword.</h3>`;
    }
  });
}

// Add new video

// function addVideo(e) {
//   e.preventDefault();

//   let photo = document.getElementById("image-file").files[0];
//   let formData = new FormData();

//   formData.append("photo", photo);
//   fetch("/upload/image", { method: "POST", body: formData });

//   const videoTitle = vidTitle.value;

//   const newVid = document.createElement("div");
//   newVid.classList.add("suggestion");
//   newVid.innerHTML = `<button id="deleteVid" class="deleteVid">
//   <i class='far fa-trash-alt'></i>
// </button>
// <div class="thumbnail">
//   <img src="img/sausage.png" alt="" id="sausage">
//   <span id="duration" class="duration"></span>
// </div>
// <div class="sugg-info" id="sugg-info">
//   <h4>${videoTitle}</h4>
// </div>`;

//   browse.appendChild(newVid);
//   modal.classList.remove("show-modal");
// }

// Update icons

function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fas fa-play"></i>';
  } else {
    play.innerHTML = '<i class="fas fa-pause"></i>';
  }
}

function updateVolumeIcon() {
  if (video.volume === 0) {
    volume.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } else {
    volume.innerHTML = '<i class="fas fa-volume-up"></i>';
  }
}

// Add a comment

function addComments(e) {
  e.preventDefault();

  const newComment = document.createElement("div");

  if (inputText.value.trim() === "") {
    alert("Please add a comment");
  } else {
    newComment.innerHTML = `<div class="comment" id="comment">
    <div class="logo">
      <img width="60px" src="https://picsum.photos/${Math.floor(
        Math.random() * 1000
      )}" alt="user">
    </div>
    <div class="name">
      <h4>Person's Name</h4>
    </div>
    <div class="text" id="text">
      <p>${inputText.value}</p>
    </div>
  </div>`;
    inputText.value = "";
  }
  commentSection.prepend(newComment);
}

// Toggle volume
function toggleVolume() {
  if (video.volume === 1) {
    video.volume = 0;
  } else {
    video.volume = 1;
  }
  updateVolumeIcon();
}

// Play & pause video

function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update progress & timestamp
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  // Get minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  // Get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  timestamp.innerHTML = `${mins}:${secs}`;
}

// Set video time to progress
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

// Show modal for adding a new video

// // next video
// function stopVideo() {
//   video.currentTime = 0;
//   video.pause();
// }

// Event listeners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
volume.addEventListener("click", toggleVolume);

video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);

progress.addEventListener("change", setVideoProgress);

suggestion1.addEventListener("click", () => {
  video.src = `videos/sausage.mp4`;
  toggleVideoStatus();
  title.innerText = `Sausage 10 second recipe`;
  views.innerHTML = `${Math.floor(Math.random() * 100000)} views`;
});
suggestion2.addEventListener("click", () => {
  video.src = `videos/kitty.mp4`;
  toggleVideoStatus();
  title.innerText = `Wow this is a talking kitty`;
  views.innerHTML = `${Math.floor(Math.random() * 100000)} views`;
});
suggestion3.addEventListener("click", () => {
  video.src = `videos/trynot.mp4`;
  toggleVideoStatus();
  title.innerText = `Try not to laugh challenge`;
  views.innerHTML = `${Math.floor(Math.random() * 100000)} views`;
});

suggestion4.addEventListener("click", () => {
  video.src = `videos/seed.mp4`;
  toggleVideoStatus();
  title.innerText = `This a seed growing
  `;
  views.innerHTML = `${Math.floor(Math.random() * 100000)} views`;
});

formSubmit.addEventListener("click", () => {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploaded_img = reader.result;
    const videoTitle = vidTitle.value;
    const newVid = document.createElement("div");
    newVid.classList.add("suggestion");
    newVid.innerHTML = `<button id="deleteVid" class="deleteVid">
  <i class='far fa-trash-alt'></i>
</button>
<div class="thumbnail">
  <img src="${uploaded_img}" alt="" id="sausage">
  <span id="duration" class="duration"></span>
</div>
<div class="sugg-info" id="sugg-info">
  <h4>${videoTitle}</h4>
</div>`;

    browse.appendChild(newVid);
    modal.classList.remove("show-modal");
  });
  reader.readAsDataURL(this.files[0]);
});

form.addEventListener("submit", addComments);

fullscreen.addEventListener("click", () => {
  video.requestFullscreen();
});

inputText.addEventListener("keyup", () => {
  if (inputText.value.trim() !== "") {
    submitBtn.classList.add("show");
  } else {
    submitBtn.classList.remove("show");
  }
});

search.addEventListener("keyup", () => {
  if (search.value.trim() !== "") {
    searchResults.classList.add("show");
  } else {
    searchResults.classList.remove("show");
  }
});

show.addEventListener("click", () => {
  modal.classList.add("show-modal");
});
close.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});

search.addEventListener("input", filterVideos);

document.querySelectorAll(".dots").forEach((iteem) => {
  iteem.addEventListener("click", () => {
    choices.classList.toggle("show");
  });
});
