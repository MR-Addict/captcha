#! /bin/bash

for i in {1..10}
do
  file_path=../dataset/tmp/
  file_name="$(date +%s)".jpg
  curl -skL https://u.njtech.edu.cn/cas/captcha.jpg -o $file_path$file_name
  captcha=$(python captcha.py -t local -d $file_path$file_name)
  mv $file_path$file_name "$file_path$captcha".jpg
  echo "Num.$i Done"
done
