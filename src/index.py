import ddddocr
import uvicorn
from typing import Union
from fastapi import FastAPI, UploadFile
from fastapi.staticfiles import StaticFiles

app = FastAPI(
    version="1.0",
    title="Captcha API",
    swagger_ui_parameters={"defaultModelsExpandDepth": -1}
)

ocr = ddddocr.DdddOcr(
    beta=False,
    show_ad=False,
    import_onnx_path="model/captcha.onnx", charsets_path="model/charsets.json"
)


@app.post("/", tags=["Captcha"])
async def handle_captcha_post(captcha: Union[UploadFile, None] = None):
    if not captcha:
        return {"success": False, "message": "No file"}
    elif captcha.filename.split(".")[-1].lower() not in ["jpg", "jpeg", "png", "svg", "wepb"]:
        return {"success": False, "message": "File type not support"}
    else:
        data = await captcha.read()
        if len(data) > 1*1024**2:
            return {"success": False, "message": "File too big"}
        else:
            return {"success": True, "message": ocr.classification(data)}


app.mount("/", StaticFiles(directory="public", html=True), name="public")
if __name__ == "__main__":
    uvicorn.run("index:app", host="0.0.0.0", port=45547, log_level="info")
