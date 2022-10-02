import json
import requests


def decode_captcha(image, token):
    # post data
    post_url = "http://www.bhshare.cn/imgcode/"
    data = {'token': token, 'type': 'local'}
    # convert images to binary files
    files = {'file': open(image, 'rb')}
    response = requests.post(post_url, files=files, data=data)
    # handle data
    result = json.loads(response.text)
    if result['code'] == 200:
        return result
    else:
        return 'error'


if __name__ == '__main__':
    # message, times = decode_captcha('images/captcha.jpg', "95bf31cca")
    message, times = 2221, 27
    print(message)
    print(times)
