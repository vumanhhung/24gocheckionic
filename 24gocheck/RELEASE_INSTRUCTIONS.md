##IONIC UPLOAD
ionic upload --note "v1.0.2" --deploy=production


##RELEASE

cordova plugin remove cordova-plugin-console
preen --preview
preen
ionic build android --release



##PUSH NOTIFICATION SETUP

ionic push --google-api-key AI*********************ogKNy44-u8gg2w
ionic config set gcm_key 1*********0597



##TO SIGN WITH CERTIFICATE ANDROID

1. CREATE THE KEYSTORE (1 TIME. SAVE THE .keystore FILE SOMEWHERE AND START FROM STEP 2)
keytool -genkey -v -keystore i2cs-release-key.keystore -alias alias_i2cs -keyalg RSA -keysize 2048 -validity 10000

2. COPY THE BUILD TO ROOT PATH
copy "platforms\android\build\outputs\apk\android-release-unsigned.apk" ".\i2cs-release-unsigned.apk" /Y

3. SIGN THE APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore i2cs-release-key.keystore i2cs-release-unsigned.apk alias_i2cs

4. ZIPALIGN
"C:\Program Files (x86)\Android\android-sdk\build-tools\23.0.1\zipalign" -v 4 i2cs-release-unsigned.apk i2cs.apk