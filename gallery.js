let mCurrentIndex = 0; // Tracks the current image index
let mImages = []; // Array to hold GalleryImage objects
const mUrl = "images.json"; // Replace with actual JSON URL
const mWaitTime = 5000; // Timer interval in milliseconds

$(document).ready(() => {
  $(".details").hide(); // Hide details initially

  // Call a function here to start the timer for the slideshow
  startTimer();
  // Select the moreIndicator button and add a click event to:
  $(".moreIndicator").on("click", function () {
    $(".details").slideToggle();
    $(".moreIndicator").toggleClass("rot270, rot90");
  });
  // - toggle the rotation classes (rot90 and rot270)
  // - slideToggle the visibility of the .details section

  // Select the "Next Photo" button and add a click event to call showNextPhoto
  $("#nextPhoto").on("click", showNextPhoto);
  // Select the "Previous Photo" button and add a click event to call showPrevPhoto
  $("#prevPhoto").on("click", showPrevPhoto);
  // Call fetchJSON() to load the initial set of images
  fetchJSON();
});

// Function to fetch JSON data and store it in mImages
function fetchJSON() {
  $.ajax({
    url: mUrl,
    dataType: "json",
    success: function (data) {
      mImages = data.images;
      const image = mImages[mCurrentIndex];
      $("#photo").attr("src", image.imgPath);
      $(".developer").text(`Developer:  ${image.developer}`);
      $(".console").text(`Console:  ${image.console}`);
      $(".date").text(`Date:  ${image.date}`);
      $(".description").text(`Description:  ${image.description}`);

      console.log("Your Json file and ajax request work");
    },
    error: function () {
      alert("Failed to load");
    },
  });
}

// Function to swap and display the next photo in the slideshow
function swapPhoto() {
  const image = mImages[mCurrentIndex];
  console.log(image.imgPath);
  $("#photo").attr("src", image.imgPath);
  $(".developer").text(`Developer: ${image.developer}`);
  $(".console").text(`Description: ${image.console}`);
  $(".date").text(`Date: ${image.date}`);
  $("description").text(`Description: ${image.description}`);
}

// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto() {
  mCurrentIndex++;
  if (mCurrentIndex == mImages.length) {
    mCurrentIndex = 0;
  }
  swapPhoto();

  // Ensure it loops back to the beginning if mCurrentIndex exceeds array length
}

function showPrevPhoto() {
  mCurrentIndex = (mCurrentIndex - 1 + mImages.length) % mImages.length;
  // Move to the previous image in the slideshow, looping back to the last image if at the start
  swapPhoto();
}

// Starter code for the timer function
function startTimer() {
  setInterval(showNextPhoto, mWaitTime);
}
