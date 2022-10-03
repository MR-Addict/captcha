function loadImage(event) {
  if (!event.target.files[0]) return;
  const image = document.querySelector("img");
  image.src = URL.createObjectURL(event.target.files[0]);
  uploadImage();
}

function uploadImage() {
  const formData = new FormData();
  const captcha = document.querySelector("input").files[0];
  if (!captcha) return;

  formData.append("captcha", captcha);
  fetch("/", { method: "POST", body: formData })
    .then((response) => response.json())
    .then((response) => (document.querySelector(".result p").innerHTML = response.message));
}
