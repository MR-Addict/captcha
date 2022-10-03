# 图形验证API

## 如何使用

curl：

```bash
curl -skL http://202.119.245.12:51080 -F captcha=@captcha.jpg | sed -E 's/.*"message":"?([^,"]*)"?.*/\1/'
```

python：

```python
import json
import requests

files = {'captcha': open("images/captcha.jpg", 'rb')}
response = requests.post("http://202.119.245.12:51080", files=files)
result = json.loads(response.text)

print(result["data"])
```
