## Rocks

#### `node svg-compile.js`

To transform svg files into react components you must follow these steps

    $ cd ./config
    $ node svg-compile.js

svg files must be at 
    
    rootFolder/assets/svg
    
generated file will be at

    rootFolder/src/assets/svg/index.js

#### Run
If you want to use xcode or Android Studio  
you must start expo tunnel
  
    $ exp start  

### `Build for IOS`

At first in IOS you must execute pod install

    $ cd ios
    $ pod install
    
### `Build for Android`

Just click on button Run in Android Studio


#### TODO: Generate release versions
