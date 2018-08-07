import { createStackNavigator } from 'react-navigation';

import SignIn from './pages/signIn';
import Main from './pages/main';

const Routes = createStackNavigator({
  SignIn,
  Main,
});

export default Routes;
