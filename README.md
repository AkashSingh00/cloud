


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

change the gradel version of react-native-volume-control to 3.4.0


Create config.js in the root of this project and save your [Mapbox access token](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/) there
```js
export const config = {
  API_TOKEN: "your_mapbox_api_key_here",
}
```


run app on development mode
```js
$ react-native run-android
```

logs
```js
$ react-native log-android
```
