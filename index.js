// INDEX: the first file that runs when the app starts

// Expo function that registers the main component of the app
import { registerRootComponent } from "expo";

// The main component of our app (from app.js)
import App from "./app";

// Tell Expo to start the app with the App component
registerRootComponent(App);
