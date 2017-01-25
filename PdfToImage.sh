#Requires SUDO Permssion
echoerr()
{
echo "Test cases failed !!!" >&2
exit 60

}      

resetDirector(){
	
rm -rf $1 > /dev/null

mkdir -p "$1"sd
mkdir -p "$1"fd
mkdir -p "$1"hd
mkdir -p "$1"thumb
}

ClearShit(){
	
rm -rf $1 > /dev/null
echoerr "Conversion Failed" >&2

}

BurpOutput(){

printf $2
for entry in "$1"*
do
  printf "||$entry"
done


}

ImageOutput="ShellImages/"$2"/"
InputDirectory=$1

if [ -z "$InputDirectory" ];then
echoerr "No Input File Specified"; 
fi


if !(resetDirector $ImageOutput);then
echoerr "Unable To Create Directory.. Check for required permissions"
fi



if gs -sDEVICE=jpeg -dTextAlphaBits=4 -r300   -o "$ImageOutput"fd/tmp%03d.jpg $InputDirectory > /dev/null;then
BurpOutput "$ImageOutput"fd/ "FD"
printf '\n'
else
ClearShit $ImageOutput
fi

if gs -sDEVICE=jpeg -dTextAlphaBits=4 -r100 -o "$ImageOutput"sd/tmp%03d.jpg $InputDirectory > /dev/null;then
BurpOutput "$ImageOutput"sd/ "SD"
printf '\n'
else
ClearShit $ImageOutput
fi



if gs -sDEVICE=jpeg -dTextAlphaBits=4 -r100 -o "$ImageOutput"hd/tmp%03d.jpg $InputDirectory > /dev/null;then
BurpOutput "$ImageOutput"hd/ "HD"
printf '\n'
else
ClearShit $ImageOutput
fi

if gs -sDEVICE=jpeg -dTextAlphaBits=4 -r20  -o "$ImageOutput"thumb/tmp%03d.jpg $InputDirectory > /dev/null;then
BurpOutput "$ImageOutput"thumb/ "THUMB"
else
ClearShit $ImageOutput
fi




