# Captcha 识别器 ![docker](https://github.com/MR-Addict/captcha/actions/workflows/docker.yml/badge.svg?branch=main)

## 1. 如何搭建

### 1.1 Docker 部署

#### 1.1.1 一键部署

一键部署：

```bash
docker run --restart=unless-stopped -p 45547:45547 -d --name captcha mraddict063/captcha
```

docker-compose 版：

```bash
docker-compose up -d
```

#### 1.1.2 手动编译

克隆文档：

```bash
git clone https://github.com/MR-Addict/captcha.git
```

编译镜像：

```bash
docker build -t captcha .
```

启动镜像：

```bash
docker run --restart=always -p 45547:45547 -d --name captcha captcha
```

### 1.2 本地部署

克隆文档：

```bash
git clone https://github.com/MR-Addict/captcha.git
```

安装 python 依赖：

```bash
python install -r requirements
```

启动 App：

```bash
uvicorn index:app --reload
```

## 2. 如何使用

### 2.1 使用 API 接口

服务器请自行部署，API 接口用法如下：

|  参数   |    值    |
| :-----: | :------: |
| method  |   post   |
| captcha | 本地图片 |

#### 2.1.1 curl

```bash
curl -skL http://localhost:45547 -F captcha=@captcha.jpg
```

#### 2.1.2 python

```python
import json
import requests


def decode_captcha(img_path):
    files = {'captcha': open(img_path, 'rb')}
    response = requests.post("http://localhost:45547", files=files)
    return json.loads(response.text)


if __name__ == '__main__':
    print(decode_captcha("image/path.jpg"))
```

> 注意：其他语言和脚本使用方法可自行查询参考

### 2.2 使用 Web UI

部署好服务器后，直接打开其本地 Web 地址上传图片即可：

- [http://localhost:45547](http://localhost:45547)

![captcha](images/captcha.png)

## 3. 说明

本项目核心 Captcha 识别使用了 ddddocr 的 Python 库，详细内容可参考 sml2h3 的[GitHub 项目](https://github.com/sml2h3/ddddocr)。

另外本项目也使用了 sml2h3 的[ddddocr 训练项目](https://github.com/sml2h3/dddd_trainer)，来训练适合南京工业大学的校园网登录图形验证码。

使用自己训练的模型，1000 张样本识别的成功率可保持在 100%。默认模型识别的成功率也很高，1000 张样本只有 6、7 张左右的错误。

如果你想使用默认的模型，可以注释掉`src/index.py`中的有关 model 的内容：

```python
ocr = ddddocr.DdddOcr(
    beta=False,
    show_ad=False,
    import_onnx_path="model/captcha.onnx", charsets_path="model/charsets.json"
)
```

目前南京工业大学校园网登录图形验证码大致如下：

![Njtech-Captcha](images/5958.jpg)
