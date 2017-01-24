# | Seperated Articles 
# In each of them $,$:$,$ would be the coordinates
#BigPicture="$(identify -format "%[fx:w]*%[fx:h]" draw_rect.png)"
#echo "${BigPicture}"
echoerr()
{
echo "Test cases failed !!!" $1 >&2
exit 60

}  

PREVIOUS_TMP=""

ImageCutter()
{
myArray=$1
echo BOOM"$1"
# output=convert -size output xc:white -stroke none  -strokewidth 0 -fill "rgba( 0, 0, 0 , 1 )" $rectangleSubCommand  draw_rect.png
    




rectangleSubCommand=""
IFS="|"
for i in $myArray;
do

    i=${i/:/ }

    rectangleSubCommand=$rectangleSubCommand' -draw "rectangle '$i'"' 

    
    # do something with the argument "arg"
done


if output=$(identify -format "%[fx:w]x%[fx:h]" pic.jpg); then

    CMD='convert -quiet -size '$output' xc:white -stroke none  -strokewidth 0 -fill "rgba( 0, 0, 0 , 1 )" '$rectangleSubCommand' -fill "rgba( 255, 255, 255 , 1 )" '$PREVIOUS_TMP' "draw_rect.png"'
    $(echo $CMD > CMD)
    if output=$(sh "CMD"); then
    	if convert -quiet pic.jpg   draw_rect.png   -compose screen    -composite -trim 'Articles/draw_rect'"$2"'.jpg';then
    		# echo "Yes"$convert pic.jpg   draw_rect.png   -compose screen -crop $3   -composite  'Articles/draw_rect'"$2"'.png'
			
			PREVIOUS_TMP=$rectangleSubCommand

			echo $CMD
		else
			echoerr "Error"
		fi
    else
    	printf 'some_command failed\n'
	fi


else
    echoerr 'some_command failed\n'
fi



}
DirectoryName="Articles"

initArticleDirectory()
{
	rm -fr ./"$DirectoryName"
	mkdir "$DirectoryName"
}

INPUT="$@"






MAIN_ARRAY=()

NEW_ARRAY=()
splitArticles()
{
IFS="_"
Articles=$1

for Article in $Articles;do
	# echo $Article
	MAIN_ARRAY+=($Article)

done


IFS="|"

COUNTER=0


for i in "${MAIN_ARRAY[@]}";
do
	# echo $i

	TOP=-1
	LEFT=-1
	RIGHT=-1
	BOTTOM=-1
	

	TP=$i
	
	IFS="|"
	for y in $TP;do

		IFS=":"
		ARRAY_POS=0
		for TMP in $y;do
			VAL=$TMP

			IFS=","
			# echo $VAL
			for VALUE in $VAL;do
				# echo $VALUE

				if [ $ARRAY_POS -eq "0" ];then

					if [ $LEFT -eq "-1" ];then
						LEFT=$VALUE
					else
						if [ $LEFT -gt $VALUE ];then
							LEFT=$VALUE
						fi
					fi

				elif [ $ARRAY_POS -eq "1" ];then

					if [ $TOP -eq "-1" ];then
						TOP=$VALUE
					else
						if [ $TOP -gt $VALUE ];then
							TOP=$VALUE
						fi
					fi


				elif [ $ARRAY_POS -eq "2" ];then

					if [ $RIGHT -eq "-1" ];then
						RIGHT=$VALUE
					else
						if [ $RIGHT -lt $VALUE ];then
							RIGHT=$VALUE
						fi
					fi


				elif [ $ARRAY_POS -eq "3" ];then

					if [ $BOTTOM -eq "-1" ];then
						BOTTOM=$VALUE
					else
						if [ $BOTTOM -lt $VALUE ];then
							BOTTOM=$VALUE
						fi
					fi

				fi


				ARRAY_POS=$((ARRAY_POS+1))
			done
			IFS=":"


			#echo $TMP
		done	
		IFS="|"
	done
	
	CROPPER=$((RIGHT-LEFT))"x"$((BOTTOM-TOP))+$LEFT+$TOP
	echo $CROPPER

	

	#echo $CROPPER
	echo LOG"$i"
	IFS=" "


		#L T WIDTH HEIGHT
	ImageCutter $i $COUNTER $CROPPER
	

	IFS="|"
	COUNTER=$((COUNTER+1))
	

done

}

initArticleDirectory
splitArticles $INPUT
