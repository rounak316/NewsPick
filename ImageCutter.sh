#BigPicture="$(identify -format "%[fx:w]*%[fx:h]" draw_rect.png)"
#echo "${BigPicture}"
myArray=( "$@" )

# output=convert -size output xc:white -stroke none  -strokewidth 0 -fill "rgba( 0, 0, 0 , 1 )" $rectangleSubCommand  draw_rect.png
echoerr()
{
echo "Test cases failed !!!" $1 >&2
exit 60

}      





rectangleSubCommand=""

for i in $myArray;
do

    i=${i/:/ }

    rectangleSubCommand=$rectangleSubCommand' -draw "rectangle '$i'"' 

    
    # do something with the argument "arg"
done




if output=$(identify -format "%[fx:w]x%[fx:h]" pic.jpg); then

    CMD='convert -size '$output' xc:white -stroke none  -strokewidth 0 -fill "rgba( 0, 0, 0 , 1 )" '$rectangleSubCommand'  "draw_rect.png"'
    $(echo $CMD > CMD)
    if output=$(sh "CMD"); then
    	if convert pic.jpg  draw_rect.png  -compose screen   -composite sd.png;then
    		echo "Yes"
		else
			echoerr "Error"
		fi
    else
    	printf 'some_command failed\n'
	fi


else
    echoerr 'some_command failed\n'
fi