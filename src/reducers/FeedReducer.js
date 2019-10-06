const initialState = {
    feed: [],
    empresa:[]
};

const FeedReducer = (state = initialState, action) => {

    if (action.type == 'incrementFeed') {
        return { ...state, feed:action.payload.feed};
    }
    if (action.type == 'idFilteredFeed') {
        return { ...state, feed:action.payload.feed};
    }
    if (action.type == 'getEmpresa') {
        return { ...state, empresa:action.payload.empresa};
    }

    return state;
}

export default FeedReducer;