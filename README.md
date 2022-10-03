# 图形验证API

## 如何使用

### curl

```bash
# 上传本地图片
curl -skL http://localhost:8000 -F type=local -F captcha=@3913.jpg | sed -E 's/.*"message":"?([^,"]*)"?.*/\1/'
# 上传云端图片
curl -skL http://localhost:8000 -F type=online -F captcha="http://localhost:8000/3913.jpg" | sed -E 's/.*"message":"?([^,"]*)"?.*/\1/'
```

### python

```python
import json
import requests


# 上传本地图片
def decode_local_img:
    data = {"type": "local"}
    files = {'captcha': open("images/captcha.jpg", 'rb')}
    response = requests.post("http://localhost:8000", data=data, files=files)
    result = json.loads(response.text)


# 上传云端图片
def decode_online_img:
    data = {"type": "online","captcha":"http://localhost:8000/3913.jpg"}
    response = requests.post("http://localhost:8000", data=data)
    result = json.loads(response.text)


print(result["data"])
```
