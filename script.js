const video = document.getElementById("video");
const title = document.getElementById("title");
const views = document.getElementById("views");
const play = document.getElementById("play");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");
const showModalBtn = document.getElementById("showBtn");
const closeModalBtn = document.getElementById("closeBtn");
const modal = document.getElementById("modal");
const formSubmitBtn = document.getElementById("form-submit");
const formEdit = document.getElementById("form-edit");
const submitBtn = document.getElementById("submit-btn");
const inputText = document.getElementById("input-text");
const editCommentInput = document.getElementById("editCommentInput");
const edit = document.getElementById("edit");
const search = document.getElementById("search");
const searchResults = document.getElementById("search-results");
const videoFile = document.getElementById("video-file");
const imageFile = document.getElementById("image-file");
const suggestions = document.getElementById("suggestions");
const commentSection = document.getElementById("commentSection");

let videos = [
  {
    id: 1,
    title: "Sausage",
    thumbnail: "img/sausage.png",
    src: "videos/sausage.mp4",
    comments: [
      {
        id: generateID(),
        username: "ErenJaegar",
        logo: "https://i.pinimg.com/736x/ff/e3/b8/ffe3b86ba9f626d50a0be4cf4996e78f.jpg",
        text: "The rumbling is coming.",
      },
      {
        id: generateID(),
        username: "YAAYGAA",
        logo: "https://i.pinimg.com/736x/ff/e3/b8/ffe3b86ba9f626d50a0be4cf4996e78f.jpg",
        text: "The RUUUUUUUMMM.",
      },
    ],
  },
  {
    id: 2,
    title: "Kitty",
    thumbnail: "img/kitty.png",
    src: "videos/kitty.mp4",
    comments: [
      {
        id: generateID(),
        username: "Mikasa Ack",
        logo: "https://media.comicbook.com/2021/04/attack-on-titan-cosplay-mikasa-1266202.jpeg?auto=webp&width=1200&height=626&crop=1200:626,smart",
        text: "Ereeehhhhhh",
      },
    ],
  },
  {
    id: 3,
    title: "SEEED",
    thumbnail: "img/seeed.png",
    src: "videos/seed.mp4",
    comments: [
      {
        id: generateID(),
        username: "Livay",
        logo: "https://shogi-pineapple.com/wp-content/uploads/2022/02/1645536117_Attack-on-Titan-finally-remembers-that-Levi-exists-and-gives.jpg",
        text: "HOy hoy hoy huy",
      },
    ],
  },
  {
    id: 4,
    title: "Try not to laugh",
    thumbnail: "img/trynot.png",
    src: "videos/trynot.mp4",
    comments: [
      {
        id: generateID(),
        username: "AttackTitan",
        logo: "https://fantasytopics.com/wp-content/uploads/2022/05/Attack-Titan-Shingeki-no-Kyojin.jpg",
        text: "Aaaaaarrggggh",
      },
    ],
  },
];

// Recommendations
function showVideosDOM(video) {
  const item = document.createElement("div");

  item.innerHTML = `
  <div class="suggestion" id="${video.id}" onclick="readVideo(${video.id})">
        <button id="deleteVid" class="deleteVid" onclick="removeVideo(${video.id})" >
          <i class='far fa-trash-alt'></i>
        </button>
        <button class="edit-btn" onclick="showEditVideo(${video.id})">
        <i class='far fa-edit'></i>
      </button>
        <div class="thumbnail">
          <img src="${video.thumbnail}" alt="">
          <span id="duration" class="duration"></span>
        </div>
        <div class="sugg-info" id="sugg-info">
          <h4>${video.title}</h4>
        </div>
      </div>
  `;

  suggestions.prepend(item);
}

// Init app
function init() {
  suggestions.innerHTML = "";
  commentSection.innerHTML = "";

  videos.forEach((video) => showVideosDOM(video));
}

init();

// Load 0 index video
function loadFirstVideo(id = 1) {
  const textDiv = document.getElementById("text_" + id);

  let i = videos.findIndex((vid) => vid.id === id);
  video.src = videos[i].src;
  title.innerText = videos[i].title;
  views.innerText = `${Math.floor(Math.random() * 100000)} views`;
  const dots = document.getElementById("dots_" + id);
  const choices = document.getElementById("choices_" + id);
  const editBtn = document.getElementById("editBtn_" + id);
  const deleteBtn = document.getElementById("deleteBtn_" + id);
  const oComment = document.getElementById("comment_" + id);
  const oGottenVideo = videos[i];

  video.dataset.id = oGottenVideo.id;

  const oGottenComment = oGottenVideo.comments;

  init();
  commentSection.innerHTML = createComments(oGottenComment);
}

loadFirstVideo();

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

// Refactoring function
function createComment(comment) {
  return `
<div class="comment" id="comment_${comment.id}">

    <div class="logo">
      <img width="70px" height="70px" src="${comment.logo}" alt="user">
    </div>
    <div class="name">
      <h4>${comment.username}</h4>
    </div>
    <div class="text" id="text_${comment.id}">
      <p>${comment.text}</p>
    </div>
    <div class="edit" id="edit" >
      <div class="dots" id="dots_${comment.id}" onclick="showChoices(${comment.id})">
        <i class="fa fa-ellipsis-v"></i>
      </div>
      <div class="choices" id="choices_${comment.id}">
      <div class="editBtn" id="editBtn_${comment.id}" onclick="editCom(${comment.id})">
      <i class='far fa-edit'> &nbsp &nbsp Edit</i>
    </div>
    <div class="deleteCom" id="deleteBtn_${comment.id}" onclick="deleteBtn(${comment.id})">
        <i class='far fa-trash-alt'> &nbsp &nbsp Delete</i>
        </div>
      </div>
    </div>
  </div>
  `;
}

// Refactoring

/**
 * @param {array} comments
 * @return {string}
 */

function createComments(comments) {
  let commentElements = "";
  comments.forEach((comment, index) => {
    commentElements += createComment(comment);
  });
  return commentElements;
}

// Play video when clicked
function readVideo(id) {
  const oGottenVideo = videos.find((vid) => vid.id === id);

  const oGottenComment = oGottenVideo.comments;

  if (oGottenVideo.comments.length > 0) {
    init();
    commentSection.innerHTML = createComments(oGottenComment);
  }

  video.src = oGottenVideo.src;
  video.dataset.id = oGottenVideo.id;
  toggleVideoStatus();
  title.innerText = `${oGottenVideo.title}`;
  views.innerHTML = `${Math.floor(Math.random() * 100000)} views`;
  const dots = document.getElementById("dots_" + id);
  const choices = document.getElementById("choices_" + id);
  const editBtn = document.getElementById("editBtn_" + id);
  const deleteBtn = document.getElementById("deleteBtn_" + id);
  const oComment = document.getElementById("comment_" + id);

  searchResults.classList.remove("show");
}

// show choices edit comment
function showChoices(id) {
  const choices = document.getElementById("choices_" + id);
  const dots = document.getElementById("dots_" + id);

  choices.classList.toggle("show");
  dots.classList.toggle("show");
}

// Delete comment
function deleteBtn(id) {
  const oComment = document.getElementById("comment_" + id);
  oComment.remove();
  const VidId = parseInt(video.dataset.id);
  const oGottenVideo = videos.find((vid) => vid.id === VidId);
  oGottenVideo.comments = oGottenVideo.comments.filter((com) => com.id !== id);
}

// Add a comment to DOM
function addComments(e) {
  e.preventDefault();

  if (inputText.value.trim() === "") {
    alert("Please add a comment");
  } else {
    const uploadedComment = {
      id: generateID(),
      username: "Guest",
      logo: "https://icon-library.com/images/unknown-person-icon/unknown-person-icon-4.jpg",
      text: inputText.value,
    };

    let vidId = video.dataset.id;
    let oGottenVideo = videos.find((vid) => vid.id == vidId);
    oGottenVideo.comments.push(uploadedComment);
    const newComment = document.createElement("div");

    newComment.innerHTML = createComment(uploadedComment);
    inputText.value = "";
    commentSection.prepend(newComment);
  }
  submitBtn.classList.remove("show");
  let vidId = video.dataset.id;

  const dots = document.getElementById("dots_" + vidId);
  const choices = document.getElementById("choices_" + vidId);
  const editBtn = document.getElementById("editBtn_" + vidId);
  const deleteBtn = document.getElementById("deleteBtn_" + vidId);
  const oComment = document.getElementById("comment_" + vidId);
}

// Edit comment
function editCom(id) {
  const textDiv = document.getElementById("text_" + id);
  const VidId = parseInt(video.dataset.id);
  let oGottenCom = null;
  videos.forEach((vid) => {
    if (vid.id === VidId) {
      oGottenCom = vid.comments.find((com) => com.id === id);
    }
  });

  textDiv.innerHTML = `<input type="text" class="editCommentInput" id="editCommentInput_${id}" value="${oGottenCom.text}"/>
  <button class="confirmComEdit" id="confirmComEdit_${id}"  onclick="editCommentConfirm(${id})">Confirm</button>
  `;
}

function editCommentConfirm(id) {
  const textDiv = document.getElementById("text_" + id);

  const confirmComEdit = document.getElementById("confirmComEdit_" + id);
  confirmComEdit.style.setProperty("display", "none");
  const editCommentInput = document.getElementById("editCommentInput_" + id);

  const VidId = parseInt(video.dataset.id);
  videos.forEach((vid, vidIndex) => {
    if (vid.id === VidId) {
      vid.comments.forEach((com, comIndex) => {
        if (com.id === id) {
          videos[vidIndex].comments[comIndex].text = editCommentInput.value;
        }
      });
    }
  });

  textDiv.innerHTML = `<p>${editCommentInput.value}</p>`;

  const dots = document.getElementById("dots_" + id);
  const choices = document.getElementById("choices_" + id);
  choices.classList.remove("show");
  dots.classList.remove("show");
}

// Remove video
function removeVideo(id) {
  videos = videos.filter((vid) => vid.id !== id);

  init();
}

search.addEventListener("input", (e) => {
  searchResults.innerHTML = "";
  const term = e.target.value.toUpperCase();
  console.log(term);
  let noResults = true;
  videos.forEach((vid) => {
    if (vid.title.toUpperCase().includes(term)) {
      searchResults.innerHTML += `
      <div class="result" id="result_${vid.id}" onclick="readVideo(${vid.id})">
      <img src=${vid.thumbnail}>
      <h3>${vid.title}</h3>
      </div>  
      `;
      noResults = false;
    }
  });
  if (noResults) {
    searchResults.innerHTML = `<p>There are no search results. Try again!<p>`;
  }
});

// Edit video
function showEditVideo(id) {
  event.stopPropagation();

  let oGottenVideo = videos.find((vid) => vid.id === id);
  modal.dataset.id = id;
  modal.classList.add("show-modal");

  vidTitle.value = oGottenVideo.title;

  formSubmitBtn.classList.remove("show");

  formEdit.classList.add("show");
}

// Confirm Edit Video
function confirmEditVideo() {
  let id = parseInt(modal.dataset.id);

  let index = videos.findIndex((vid) => vid.id === id);

  const uploadedVideo = {
    ...videos[index],
    id: id,
    title:
      videos[index].title === vidTitle.value
        ? videos[index].title
        : vidTitle.value,
    thumbnail:
      videos[index].thumbnail === `img/${imageFile.files[0].name}`
        ? videos[index].thumbnail
        : `img/${imageFile.files[0].name}`,
    src:
      videos[index].src === `videos/${videoFile.files[0].name}`
        ? videos[index].src
        : `videos/${videoFile.files[0].name}`,
  };
  videos[index] = uploadedVideo;
  init();
  resetModal();
}

// Upload video
function uploadVideo() {
  if (
    vidTitle.value.trim() === "" ||
    videoFile.value === "" ||
    imageFile.value === ""
  ) {
    alert("Please complete the form");
  } else {
    const uploadedVideo = {
      id: generateID(),
      title: vidTitle.value,
      thumbnail: `img/${imageFile.files[0].name}`,
      src: `videos/${videoFile.files[0].name}`,
      comments: [],
    };
    videos.unshift(uploadedVideo);
    showVideosDOM(uploadedVideo);
    resetModal();
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 10000);
}

// Reset modal
function resetModal() {
  vidTitle.value = "";
  videoFile.value = "";
  imageFile.value = "";
  modal.classList.remove("show-modal");
}

// Event Listeners

video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);
play.addEventListener("click", toggleVideoStatus);
volume.addEventListener("click", toggleVolume);
fullscreen.addEventListener("click", () => {
  video.requestFullscreen();
});
progress.addEventListener("change", setVideoProgress);
showModalBtn.addEventListener("click", () => {
  modal.classList.add("show-modal");
  imageFile.type = "file";
  videoFile.type = "file";
  formEdit.classList.remove("show");
  formSubmitBtn.classList.add("show");
});
closeModalBtn.addEventListener("click", resetModal);
formSubmitBtn.addEventListener("click", uploadVideo);
formEdit.addEventListener("click", confirmEditVideo);
inputText.addEventListener("keyup", () => {
  if (inputText.value.trim() !== "") {
    submitBtn.classList.add("show");
  } else {
    submitBtn.classList.remove("show");
  }
});
if (editCommentInput) {
  editCommentInput.addEventListener("keyup", () => {
    if (editCommentInput.value.trim() !== "") {
      confirmComEdit.classList.add("show");
    } else {
      confirmComEdit.classList.remove("show");
    }
  });
}

form.addEventListener("submit", addComments);

search.addEventListener("keyup", () => {
  if (search.value.trim() !== "") {
    searchResults.classList.add("show");
  } else {
    searchResults.classList.remove("show");
  }
});
