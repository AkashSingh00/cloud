


Prequisites

react-native-cli: latest

```bash
$ npm i -g react-native-cli
```

This is how project was created (don't run this)
```bash
$ react-native init Cloud --version 0.59.9
```

run jetify on splash code only

change the gradle version of react-native-volume-control to 3.4.0


Create config.js in the root of this project and save your [Mapbox access token](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/) there
```js
export const config = {
  API_TOKEN: "your_mapbox_api_key_here",
}
```

run app on development mode
```js
$ yarn dev
```

logs
```js
$ yarn log
```

build apk
```bash
$ cd cloud
$ keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
$ mv my-release-key.keystore ./android/app
$ # replace **** with your password
$ cat > ./android/gradle.properties << EOF
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=****
MYAPP_RELEASE_KEY_PASSWORD=****
EOF
$ cat > ./android/app/build.gradle << EOF
android {
    
	...

    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    
    ...

    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
    
    ...
}
EOF
$ cd android && ./gradlew assembleRelease
$ adb install -r ./app/build/outputs/apk/release/app-release.apk
```