import ddddocr
ocr = ddddocr.DdddOcr(show_ad=False)


def decode_captcha(img_path):
    with open(img_path, 'rb') as f:
        return ocr.classification(f.read())


if __name__ == '__main__':
    print(decode_captcha("uploads/captcha.jpg"))
