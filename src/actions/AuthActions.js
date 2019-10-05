import { AsyncStorage } from 'react-native';
import DevstagranApi from '../DevstagranApi';

export const checkLogin = () => {
    return (dispatch) => {
        AsyncStorage.getItem('jwt')
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

export const registerNewUser = (name, email, password) => {
    return (dispatch) => {

        devstagranApi.req({
            endpoint: 'users/new',
            method: 'POST',
            data: {
                name: name,
                email: email,
                pass: password
            },
            success: (json) => {
                if (json.error == "") {
                    AsyncStorage.setItem('jwt', json.jwt);
                    dispatch({
                        type: 'changeStatus',
                        payload: {
                            status: 1
                        }
                    });
                } else {
                    alert(json.error);
                }
            },
            error: (error) => {
                alert('Erro de requisição');
            }
        });
    };
};

export const userLogin = (email, pass) => {
    return (dispatch) => {

        DevstagranApi.req({
            endpoint: 'users/login',
            method: 'POST',
            data: {
                email: email,
                pass: pass
            },
            success: (json) => {
                if (json.error == '') {


                    AsyncStorage.setItem('jwt', json.jwt);


                    dispatch({
                        type: 'changeStatus',
                        payload: {
                            status: 1
                        }
                    });

                } else {
                    alert(json.error);
                }
            },
            error: (error) => {
                alert("Erro de requisição");
            }
        });
    };
};

export const logout = () => {
    AsyncStorage.setItem('jwt','');
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

export const changeName = (name) => {
    return {
        type: 'changeName',
        payload: {
            name
        }
    }
}