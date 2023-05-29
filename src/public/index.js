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
  const message = await respone.json();
  if (respone.ok && message.success) {
    document.querySelector(".main p").innerText = message.message;
  } else {
    document.querySelector(".main p").innerText = "识别失败";
  }
}
