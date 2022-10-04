function loadLocalImage(event) {
  if (!event.target.files[0]) return;
  const image = document.getElementById("local_img");
  image.src = URL.createObjectURL(event.target.files[0]);
  uploadLocalImage();
}

function uploadLocalImage() {
  const formData = new FormData();
  const captcha = document.getElementById("captcha_local").files[0];
  if (!captcha) return;

  formData.append("type", "local");
  formData.append("captcha", captcha);
  fetch("/", { method: "POST", body: formData })
    .then((response) => response.json())
    .then((response) => (document.querySelector("#local_tab .result p").innerText = response.message));
}

function loadOnlineImage(event) {
  img_url = event.target.value;
  const image = document.getElementById("online_img");
  image.src = img_url;
  uploadOnlineImage(img_url);
}

function uploadOnlineImage(img_url) {
  const formData = new FormData();

  formData.append("type", "online");
  formData.append("captcha", img_url);
  fetch("/", { method: "POST", body: formData })
    .then((response) => response.json())
    .then((response) => (document.querySelector("#online_tab .result p").innerText = response.message));
}

// set image error image
function img_error(event) {
  event.target.src = "404.png";
}

function showTab(num) {
  local_button = document.getElementById("local_button");
  online_button = document.getElementById("online_button");

  local_form = document.getElementById("local_tab");
  online_form = document.getElementById("online_tab");

  if (num) {
    local_button.style.background = "var(--pri-grey)";
    local_button.style.color = "var(--pri-dark-grey)";

    online_button.style.background = "var(--pri-green)";
    online_button.style.color = "var(--pri-white)";

    local_form.style.display = "none";
    online_form.style.display = "";
  } else {
    local_button.style.background = "var(--pri-green)";
    local_button.style.color = "var(--pri-white)";

    online_button.style.background = "var(--pri-grey)";
    online_button.style.color = "var(--pri-dark-grey)";

    local_form.style.display = "";
    online_form.style.display = "none";
  }
}

showTab(0);

local_button.addEventListener("click", () => showTab(0));
online_button.addEventListener("click", (event) => showTab(1));
