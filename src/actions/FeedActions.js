import DevstagranApi from '../DevstagranApi';
import { AsyncStorage } from 'react-native';
import { logout } from './AuthActions';

export const getFeed = () => {

    return (dispatch) => {
        AsyncStorage.getItem('access-token')
            .then((data) => {
                if (data != null && data != '') {
                    AsyncStorage.getItem('client')
                        .then((clientdata) => {
                            if (clientdata != null && clientdata != '') {
                                AsyncStorage.getItem('uid')
                                    .then((uiddata) => {
                                        if (uiddata != null && uiddata != '') {
                                            //alert(data + "\n" + clientdata + "\n" + uiddata);

                                            DevstagranApi.req({
                                                endpoint: 'enterprises',
                                                method: 'GET',
                                                headers: {
                                                    'access-token': data,
                                                    'client': clientdata,
                                                    'uid': uiddata
                                                },
                                                tipo: 'json',
                                                success: (json) => {
                                                    dispatch({
                                                        type: 'incrementFeed',
                                                        payload: {
                                                            feed: json
                                                        }
                                                    });

                                                },
                                                error: (error) => {
                                                    alert("Erro na requisição")
                                                }
                                            });

                                        } else {
                                            dispatch(logout());
                                        }
                                    })
                            } else {
                                dispatch(logout());
                            }
                        });
                } else {
                    dispatch(logout());
                }
            })
    }
}