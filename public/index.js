function loadImage(event) {
  if (!event.target.files[0]) return;
  const image = document.querySelector("img");
  image.src = URL.createObjectURL(event.target.files[0]);
}

function uploadImage(event) {
  if (!document.querySelector("input").files[0]) return;
  const captcha = document.querySelector("input").files[0];
  const formData = new FormData();

  formData.append("captcha", captcha);
  fetch("/", { method: "POST", body: formData })
    .then((response) => response.json())
    .then((response) => (document.querySelector(".result p").innerHTML = response.message));
}
