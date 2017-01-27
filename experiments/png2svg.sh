#!/bin/bash


if [ "$1" == "" ]; then
  echo Usage: $0 pngfile
  exit 0;
fi

FILE=`basename $1 .png`

echo $FILE

if [ ! -e $1 ]; then
  echo $1 does not exist
  exit 1;
fi

convert $1 $FILE.pnm
potrace -s -o "SvgArticles/"$FILE"$2".jpg $FILE.pnm
rm $FILE.pnm