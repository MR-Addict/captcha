import ddddocr
import requests
import argparse

ocr = ddddocr.DdddOcr(beta=False, show_ad=False)
parser = argparse.ArgumentParser()
parser.add_argument("-d", "--Dest", help="Image destination")
parser.add_argument("-t", "--Type", help="Captcha type")


def decode_captcha_local(img_path):
    with open(img_path, 'rb') as f:
        return ocr.classification(f.read())


def decode_captcha_online(img_url):
    res = requests.get(url=img_url, verify=False)
    return ocr.classification(res.content)


if __name__ == '__main__':
    args = parser.parse_args()
    if args.Dest and args.Type == "local":
        print(decode_captcha_local(args.Dest))
    elif args.Dest and args.Type == "online":
        print(decode_captcha_online(args.Dest))
    else:
        print("error")
