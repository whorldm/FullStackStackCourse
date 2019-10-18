import { createStore, applyMiddleware } from 'redux';

const toutiaoProcessor = (state, action) => {
    console.log('I got an action:::', action);
    if (action.type === 'PUSH_LIST') {
        return {
            ...state,
            list: state.list.concat(action.data)
        };
    }
    return state;
};

const reduxPromise = ({dispatch, getState}) => next => action => {
    console.log('reduxPromise:::', action, next);
    if (typeof action.then === 'function') {
        return action .then(next);
    }
    return next(action);
}

const store = (initState = {list: []}) => {
    return createStore(toutiaoProcessor, initState, applyMiddleware(reduxPromise));
} 

export default store;