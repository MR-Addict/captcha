import argparse
from os import walk
from pathlib import Path
from captcha import decode_captcha_local


parser = argparse.ArgumentParser()
parser.add_argument("-d", "--Dest", help="Image destination")


def test_accuray(img_path):
    for (dirpath, dirnames, filenames) in walk(img_path):
        accuray = 0
        for file in filenames:
            file_path = dirpath+'/'+file
            decode_captcha = decode_captcha_local(file_path)
            if decode_captcha == Path(file_path).stem:
                accuray = accuray+1
            else:
                print(file_path, decode_captcha)
    print("{0:.0%}".format(accuray/len(filenames)))


if __name__ == '__main__':
    args = parser.parse_args()
    if args.Dest:
        test_accuray(args.Dest)
