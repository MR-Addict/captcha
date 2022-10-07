import ddddocr
import requests
from flask import Flask, send_from_directory, render_template, request

app = Flask(__name__, static_folder='templates')
# 默认模型
# ocr = ddddocr.DdddOcr(beta=False, show_ad=False)
# 我自己训练的模型
ocr = ddddocr.DdddOcr(beta=False, show_ad=False,
                      import_onnx_path="models/captcha.onnx", charsets_path="models/charsets.json")


@app.route('/<path:filename>')
def route_static_files(filename):
    return send_from_directory(app.static_folder, filename)


@app.route('/', methods=["GET"])
def route_home_get():
    return render_template('index.html')


@app.route('/', methods=["POST"])
def route_home_post():
    # upload image
    if request.files and "captcha" in request.files:
        captcha = request.files['captcha'].read()
        if request.files["captcha"].filename.split(".")[-1].lower() not in ["jpg", "jpeg", "png", "svg"]:
            return '{"status":"false","message":"File not supported"}'
        if len(captcha) > 1*1024*1024:
            return '{"status":"false","message":"File size too big"}'
        return '{"status":"true","message":"{}"}'.replace("{}", ocr.classification(captcha))
    # bad request
    else:
        return '{"status":"false","message":"Bad request"}'


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)
