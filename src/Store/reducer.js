import * as     actionTypes from './action';

const initialState={
    ingredients:{
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
    totalPrice:4,
}

const  INGREDIENT_PRICE={
    salad:10,
    bacon:11.25,
    cheese:5.25,
    meat:30.56
 
}

const reducer=(state=initialState,action)=>{
switch(action.type){
    case actionTypes.ADD_INGREDIENT:
        return{
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            },
            totalPrice:state.totalPrice+INGREDIENT_PRICE[action.ingredientName]
        }
     case actionTypes.REMOVE_INGREDIENT:
        return{
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            },
            totalPrice:state.totalPrice-INGREDIENT_PRICE[action.ingredientName]
        }
    default :
    return state 
    }
};

export default reducer;