import { AppRegistry } from 'react-native';
import App from './components/App.jsx';

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {
  rootTag: document.getElementById('root')
});