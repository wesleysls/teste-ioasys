import { AsyncStorage } from 'react-native';
import EmpresasApi from '../EmpresasApi';

export const checkLogin = () => {
    return (dispatch) => {
        AsyncStorage.getItem('access-token')
            .then((data) => {
                if (data != null && data != '') {
                    dispatch({
                        type: 'changeStatus',
                        payload: {
                            status: 1
                        }
                    });
                } else {
                    dispatch({
                        type: 'changeStatus',
                        payload: {
                            status: 2
                        }
                    });
                }
            })
            .catch((error) => {
                alert("ERRO, REINICIE O SEU APP!");
            });
    };
};

export const userLogin = (email, pass) => {
   
    return (dispatch) => {
        EmpresasApi.req({
            endpoint: 'users/auth/sign_in?email=' + email + '&password=' + pass,
            method: 'POST',
            data: {
                email: email,
                password: pass
            },
            tipo:'puro',
            success: (json) => {
                AsyncStorage.setItem('access-token', json.headers.get('access-token'));
                AsyncStorage.setItem('client', json.headers.get('client'));
                AsyncStorage.setItem('uid', json.headers.get('uid'));

                if (json.headers.get('access-token')!= null && json.headers.get('access-token')!= '') {
                    dispatch({
                        type: 'changeStatus',
                        payload: {
                            status: 1
                        }
                    });
                }
            },
            error: (error) => {
                alert("Erro de requisição");
            }
        });
    };
};

export const logout = () => {
    AsyncStorage.setItem('access-token', '');
    AsyncStorage.setItem('client','');
    AsyncStorage.setItem('uid','');
    return {
        type: 'changeStatus',
        payload: {
            status: 2
        }
    }
}

export const changeEmail = (email) => {
    return {
        type: 'changeEmail',
        payload: {
            email
        }
    }
}

export const changePassword = (password) => {
    return {
        type: 'changePassword',
        payload: {
            password
        }
    }
}