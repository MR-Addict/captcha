$ErrorActionPreference = 'silentlycontinue'
$ProgressPreference = 'SilentlyContinue'

for ($i = 0; $i -lt 10; $i++) {
    $file_path = "../dataset/tmp/" + ([int64](([datetime]::UtcNow) - (get-date "1/1/1970")).TotalMilliseconds) + ".jpg"
    Invoke-WebRequest -Uri "https://u.njtech.edu.cn/cas/captcha.jpg" -OutFile $file_path
    $captcha = python captcha.py -t local -d $file_path
    Rename-Item -Path $file_path -NewName ($captcha + '.jpg') -Force
    Write-Host "Num.$i"
}
