# Merhaba App
Note: readme to change

This is the repo for an app being made for the congressional app challenge.
It is meant to be a help to Muslim refugees in the United States.

## Setup

To setup is simple thanks to the wonderful tools expo go.
1. Clone the repo.
   - `git clone https://github.com/AIM-to-AID/merhaba-app`
   - `cd ./merhaba-app`
2. Run `npm i expo`
   - make sure npm is installed (https://nodejs.org/en/download)
3. Copy the contents of `./src/env-example.js` into a new file `./src/env.js` (Contact me for the actual keys although it will still run regardless, just missing some features)
4. Make a `people` directory in `./assets/page-specific/faq` and add the correct images. The images should be the same dimensions as `PeopleReplacement.png`
5. Run `npx expo start`
6. Follow the instructions that appear in the terminal (You may need to have a device and download the expo go app)

This should give the current build and set anyone up for development and testing.
