/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import RootNavigation from './src/Navigation/RootNavigation';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => RootNavigation);
