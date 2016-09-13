import { combineReducers } from 'redux'


const exampleReducer1 = function(state = {}, action) {
    switch (action.type) {
        default:
            return state;
    }
}

const exampleReducer2 = function(state = {}, action) {
    switch (action.type) {
        default:
            return state;
    }
}

const globalReducer = combineReducers({
    exampleReducer1,
    exampleReducer2
});

export default globalReducer;
