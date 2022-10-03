import json
import requests


# 上传本地图片
def decode_captcha_local(img_path):
    data = {"type": "local"}
    files = {'captcha': open(img_path, 'rb')}
    response = requests.post("http://localhost:8000", data=data, files=files)
    result = json.loads(response.text)


# 上传在线图片
def decode_captcha_online(img_url):
    data = {"type": "online", "captcha": img_url}
    response = requests.post("http://localhost:8000", data=data)
    result = json.loads(response.text)


if __name__ == '__main__':
    print(decode_captcha_local("images/captcha.jpg")["message"])
    print(decode_captcha_online("http://online/image/url")["message"])
