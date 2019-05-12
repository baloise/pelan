


gource -1280x720 -o gource.ppm C:\Users\Elia\Code\pelan

C:\\Users\\Elia\\Documents\\ffmpeg\\bin\\ffmpeg -y -r 60 -f image2pipe -vcodec ppm -i gource.ppm -vcodec libx264 -preset ultrafast -pix_fmt yuv420p -crf 1 -threads 0 -bf 0 gource.mp4




S = Color
Scroll = Zoom
M = Mouse

-------------------------------------------------------
GENERATE RAW:
gource -1920x1080 --output-framerate 60 --output-ppm-stream output.ppm --background FFFFFF --font-size 18 --font-colour 444444 --title "Pelan Development Process" --key --auto-skip-seconds 1 --highlight-all-users --max-file-lag 6 C:\Users\Elia\Code\pelan



gource -2560x1440 -r 60 --background FFFFFF --font-size 18 --font-colour 444444 --title "Pelan Development Process" --key --auto-skip-seconds 1 -o gource.ppm C:\Users\Elia\Code\pelan

--------------------------------------------------
CONVERT TO VIDEO:

C:\Users\Elia\Documents\ffmpeg\bin\ffmpeg -i output.ppm -c:v libx264 -b:v 1M -maxrate 1M -bufsize 2M -pass 2 output.mp4


----------------------------------------------------
NOT WORKING:
C:\Users\Elia\Documents\ffmpeg\bin\ffmpeg -y -r 60 -f image2pipe -vcodec ppm -i output.ppm -vcodec wmv1 -r 60 -qscale 0 out.wmv


C:\\Users\\Elia\\Documents\\ffmpeg\\bin\\ffmpeg -y -r 60 -f image2pipe -vcodec ppm -i output.ppm -vcodec libvpx -fpre "C:\\Users\\Elia\\Documents\\ffmpeg\\presets\\libvpx-360p.ffpreset" gource.avi


C:\Users\Elia\Documents\ffmpeg\bin\ffmpeg -y -r 60 -f image2pipe -vcodec ppm -i gource.ppm -vcodec libx264 -preset medium -pix_fmt yuv420p -crf 1 -threads 0 -bf 0 gource.x264.mp4

C:\Users\Elia\Documents\ffmpeg\bin\ffmpeg -framerate 60 -i "gource.ppm" output