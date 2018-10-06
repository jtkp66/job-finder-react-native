import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from '../../../Library/Caches/typescript/2.6/node_modules/@types/react-native';
import axios from 'axios';

const PUSH_END_POINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
    let previousToken = await AsyncStorage.getItem('pushtoken');

    if (previousToken) {
        return;
    } else {
        let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

        if (status !== 'granted') {
            return;
        }

        let token = await Notifications.getExpoPushTokenAsync();
        axios.post(PUSH_END_POINT, { token:{ token } });
        AsyncStorage.setItem('pushtoken', token);
    }
};
