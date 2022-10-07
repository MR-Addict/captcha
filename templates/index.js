// set image error image
function img_error(event) {
  event.target.src = "404.png";
}

// load image
function loadImage(event) {
  const captcha = event.target.files[0];
  if (!captcha) return;
  const image = document.querySelector(".main img");
  image.src = URL.createObjectURL(captcha);
  uploadImage(captcha);
}

// upload image
function uploadImage(captcha) {
  if (!captcha) return;
  const formData = new FormData();
  formData.append("captcha", captcha);
  fetch("/", { method: "POST", body: formData })
    .then((response) => response.json())
    .then((response) => (document.querySelector(".main p").innerText = response.message));
}
