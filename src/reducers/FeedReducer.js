const initialState = {
    feed: []
};

const FeedReducer = (state = initialState, action) => {

    if (action.type == 'incrementFeed') {
        return { ...state, feed:action.payload.feed};
    }

    return state;
}

export default FeedReducer;