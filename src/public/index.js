// load footer
window.onload = function () {
  const footer = document.createElement("footer");
  footer.innerHTML = `<footer">&copy; Copyright ${new Date().getFullYear()} MR-Addict</footer>`;
  document.body.appendChild(footer);
};

// handle upload
async function handleUpload(event) {
  const captcha = event.target.files[0];
  if (!captcha) return;
  const image = document.querySelector(".main img");
  image.src = URL.createObjectURL(captcha);
  // fetch backend data
  const formData = new FormData();
  formData.append("captcha", captcha);
  const respone = await fetch("/", { method: "POST", body: formData });
  if (respone.ok) {
    const message = await respone.json();
    document.querySelector(".main p").innerText = message.message;
  } else {
    document.querySelector(".main p").innerText = "识别失败";
  }
}
