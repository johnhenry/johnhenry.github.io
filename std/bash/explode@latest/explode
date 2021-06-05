#! /bin/bash
if [ $1 == "--help" ]; then
  echo "explode <folder>"
  echo "explodes child folder into current folder"
  echo "Warning: unxpected behavior if files already exist in current folder"
else
  mv $1/* ./
  rmdir $1
fi
