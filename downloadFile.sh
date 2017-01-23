if curl --fail -s -o pic.jpg $1 ;then
	echo "Yes"

else
	echo "No" >&2

fi