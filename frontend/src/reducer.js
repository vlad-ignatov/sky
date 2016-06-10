import {
    SET_CUSTOMER_ID,
    SET_LOCATION_ID,
    SET_PRODUCTS,
    SET_IS_LOADING,
    SET_ERROR,
    TOGGLE_PRODUCT,
    SET_ORDER
} from "./actions"

const INITIAL_STATE =  {
    customerID: null,
    locationID: null,
    isLoading : false,
    error     : null,
    products  : [],
    order     : []
};


export default function(state = INITIAL_STATE, action) {
    switch ( action.type ) {

    case SET_CUSTOMER_ID:
        return Object.assign({}, state, { customerID: action.id })

    case SET_LOCATION_ID:
        return Object.assign({}, state, { locationID: action.id })

    case SET_IS_LOADING:
        return Object.assign({}, state, { isLoading: action.isLoading })

    case SET_ERROR:
        return Object.assign({}, state, { error: action.error })

    case SET_PRODUCTS:
        return Object.assign({}, state, { products: action.products })

    case SET_ORDER:
        return Object.assign({}, state, { order: action.order })

    case TOGGLE_PRODUCT:
        let products = Object.assign([], state.products)
        let product  = products.find(p => p.product == action.productName)
        product.selected = !!action.isSelected
        return Object.assign({}, state, { products })

    default:
        return state;
    }
}
