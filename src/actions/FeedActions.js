import DevstagranApi from '../DevstagranApi';
import { AsyncStorage } from 'react-native';
import { logout } from './AuthActions';

export const getFeed = () => {

    return (dispatch) => {
        dispatch({
            type: 'changeFeedLoadingStatus',
            payload: {
                status: true
            }
        });
        AsyncStorage.getItem('jwt')
            .then((data) => {
                if (data != null && data != '') {
                    DevstagranApi.req({
                        endpoint: 'users/feed',
                        method: 'GET',
                        data: { jwt: data },
                        success: (json) => {
                            if (json.logged === true) {
                                dispatch({
                                    type: 'changeFeedLoadingStatus',
                                    payload: {
                                        status: false
                                    }
                                });
                                dispatch({
                                    type: 'incrementFeed',
                                    payload: {
                                        feed: json.data
                                    }
                                });
                            } else {
                                dispatch(logout());
                            }
                        },
                        error: (error) => {
                            alert("Erro na requisição")
                        }
                    });
                } else {
                    dispatch(logout());
                }
            })
            .catch(() => {
                dispatch(logout());
            })

    };
};

export const likePhoto = (id, is_liked) => {
    return (dispatch) => {
        let method = '';
        if (id != null) {
            if (is_liked) {
                method = 'DELETE';

                dispatch({
                    type: 'removeLike',
                    payload: {
                        id: id
                    }
                })
            } else {
                method = 'POST';

                dispatch({
                    type: 'addLike',
                    payload: {
                        id: id
                    }
                })
            }

            AsyncStorage.getItem('jwt')
                .then((data) => {
                    if (data != null && data != '') {
                        DevstagranApi.req({
                            endpoint: 'photos/' + id + '/like',
                            method: method,
                            data: { jwt: data },
                            success: (json) => {
                                if (json.logged === true) {
                                    if (json.error != '') {
                                        alert(json.error);
                                        if (is_liked) {
                                            dispatch({
                                                type: 'addLike',
                                                payload: {
                                                    id: id
                                                }
                                            })
                                        } else {
                                            dispatch({
                                                type: 'removeLike',
                                                payload: {
                                                    id: id
                                                }
                                            })
                                        }
                                    }
                                } else {
                                    dispatch(logout());
                                }
                            },
                            error: (error) => {
                                alert("Erro na requisição")
                            }
                        });
                    } else {
                        dispatch(logout());
                    }
                })
                .catch(() => {
                    dispatch(logout());
                })

        }
    }
};

//suporte@b7web.com.br
//123456