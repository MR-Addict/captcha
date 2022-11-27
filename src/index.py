import ddddocr
import uvicorn
from typing import Union
from fastapi import FastAPI, UploadFile
from fastapi.staticfiles import StaticFiles

app = FastAPI(
    title="Captcha API",
    version="1.0",
    swagger_ui_parameters={"defaultModelsExpandDepth": -1}
)
ocr = ddddocr.DdddOcr(
    beta=False,
    show_ad=False,
    import_onnx_path="model/captcha.onnx", charsets_path="model/charsets.json"
)


@app.post("/")
async def handle_captcha_upload(captcha: Union[UploadFile, None] = None):
    if not captcha:
        return {"status": False, "message": "No file upload"}
    elif captcha.filename.split(".")[-1].lower() not in ["jpg", "jpeg", "png", "svg"]:
        return {"status": False, "message": "File type not support"}
    else:
        data = await captcha.read()
        if len(data) > 1*1024**2:
            return {"status": False, "message": "File size too big"}
        else:
            return {"status": True, "message": ocr.classification(data)}


app.mount("/", StaticFiles(directory="public", html=True), name="public")
# if __name__ == "__main__":
#     uvicorn.run("index:app", host="0.0.0.0", port=8000, log_level="info")
