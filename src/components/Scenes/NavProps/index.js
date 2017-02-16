import { Actions } from 'react-native-router-flux';
import { } from '../../../actions';

export const mainSceneNavProps = {
  rightButton: 'newRequest',
  leftButton: 'sideMenu',
  title: 'requests_and_thank_yous',
  onRightPress: Actions.EntryCreationScene,
};
