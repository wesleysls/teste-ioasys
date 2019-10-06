import EmpresasApi from '../EmpresasApi';
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

                                            EmpresasApi.req({
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

export const getEmpresa = (id,callback) => {

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

                                            EmpresasApi.req({
                                                endpoint: 'enterprises/'+id,
                                                method: 'GET',
                                                headers: {
                                                    'access-token': data,
                                                    'client': clientdata,
                                                    'uid': uiddata
                                                },
                                                tipo: 'json',
                                                success: (json) => {
                                                    
                                                    //alert(JSON.stringify(json.enterprise['id']));
                                                    callback(json)
                                                    dispatch({
                                                        type: 'getEmpresa',
                                                        payload: {
                                                            empresa: json
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

export const getFilteredIdFeed = (valor) => {
    let url = '';
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    if (isNumber(valor)) {
        url = '?enterprise_types=' + valor;
        valor = null;
    }

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

                                            EmpresasApi.req({
                                                endpoint: 'enterprises'+url,
                                                method: 'GET',
                                                data: {
                                                    name: valor,
                                                },
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