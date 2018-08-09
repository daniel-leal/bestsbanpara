import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';

import SignIn from './pages/signIn';
import Main from './pages/main';
import DadosLiga from './pages/dadosLiga';

const Routes = createStackNavigator({
  SignIn,
  Main,
  DadosLiga,
});

export default Routes
