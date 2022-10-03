# 图形验证API

## 如何使用

curl：

```bash
curl -skL http://localhost:8000 -F captcha=@captcha.jpg | sed -E 's/.*"message":"?([^,"]*)"?.*/\1/'
```

python：

```python
import json
import requests

files = {'captcha': open("images/captcha.jpg", 'rb')}
response = requests.post("http://localhost:8000", files=files)
result = json.loads(response.text)

print(result["data"])
```
