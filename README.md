## Synopsis

Flight planning in the browser. Navigate to a point of interest on the map through either a text search or by dragging on the map. Then draw and edit geofences, takeoff and landing maneuvers that the aircraft will fly. Visualize no-fly zones on the map and clearly indicates conflicts when user draws over a no-fly zone.

## Code Architecture

Show what the library does as concisely as possible, developers should be able to figure out **how** your project solves their problem by looking at the code example. Make sure the API you are showing off is obvious, and that your code is short and concise.

- The project is entirely front-end based and built on React. 
- The project was started using the create-react-app tool, the new officially supported method to create single-page React Applications.
- Styling and layout uses the Material Design Lite library from Google.
- Leafletjs and Leaflet Draw are used for all of the map based UX and UI. 
- The excellent react-leaflet-draw and react-leaflet provided the bindings between leaflet and React.
- Redux is used as the state container that glues all the interactions on the page.
- intro.js was used to provide the walkthrough help feature of the app

## Motivation

This project is my conception of a simple flight planning tool using exclusively browser capabilities.

## Installation

To run a local version of this project, first clone the project and then start it using npm.
```bash
git clone https://github.com/virajranjankumar/airmap
cd airmap
npm install
npm start
```

The server will start on localhost:3000 and a browser will be automatically opened, loading that URL.

## License

Copyright Viraj Ranjankumar, 2016