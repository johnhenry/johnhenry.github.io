#! /bin/bash
# https://stackoverflow.com/questions/965053/extract-filename-and-extension-in-bash
if [ $1 == "--help" ]; then
  echo "implode <filename with extension>"
  echo "implodes file into folder of same name (minus extension)"
else
  filename=$(basename -- "$1")
  extension="${filename##*.}"
  folder="${filename%.*}"
  if [ $1 == $folder ]; then
    file=$(cat /dev/urandom | tr -cd 'a-f0-9' | head -c 16)
    mv "$1" "$file"
    mkdir "$folder"
    mv "$file" "$folder/$filename"
  else
    mkdir "$folder"
    mv "$1" "$folder"
  fi
fi
