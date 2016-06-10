import $             from "jquery"
import { setCookie } from "./lib"

export const SET_CUSTOMER_ID = "SET_CUSTOMER_ID"
export const SET_LOCATION_ID = "SET_LOCATION_ID"
export const SET_PRODUCTS    = "SET_PRODUCTS"
export const SET_IS_LOADING  = "SET_IS_LOADING"
export const SET_ERROR       = "SET_ERROR"
export const TOGGLE_PRODUCT  = "TOGGLE_PRODUCT"
export const SET_ORDER       = "SET_ORDER"

const SERVER = [
    "http://",
    process.env.HOST || "localhost",
    ":",
    process.env.PORT || "3210"
].join("")


export function setOrder(order) {
    return {
        type: SET_ORDER,
        order: Array.isArray(order) ? order : [ order ]
    }
}

export function setProducts(products) {
    return {
        type: SET_PRODUCTS,
        products: Array.isArray(products) ? products : [ products ]
    }
}

export function setIsLoading(isLoading) {
    return { type: SET_IS_LOADING, isLoading: !!isLoading }
}

export function setError(error) {
    return { type: SET_ERROR, error: String(error || "") }
}

export function toggleProduct(productName, isSelected) {
    return { type: TOGGLE_PRODUCT, productName, isSelected }
}

// The following actions will trigger AJAX requests and/or dispatch other actions...
// -----------------------------------------------------------------------------
export function fetchCustomerLocationID() {
    return dispatch => {
        dispatch(setIsLoading(true))
        $.ajax({
            method: "POST",
            url   : `${SERVER}/api/v1/services/customer-location`,
            xhrFields: {
                withCredentials: true
            }
        }).then(
            locationID => {
                dispatch(setLocationId(locationID))
                dispatch(setIsLoading(false))
            },
            xhr => {
                // console.log(xhr.responseText)
                dispatch(setError(xhr.responseJSON.message))
                dispatch(setIsLoading(false))
            }
        )
    }
}

export function fetchCatalogue(locationID) {
    return dispatch => {
        dispatch(setIsLoading(true))
        $.ajax({
            url : `${SERVER}/api/v1/services/catalogue`,
            data: { locationID }
        }).then(
            products => {
                dispatch(setProducts(products))
                dispatch(setIsLoading(false))
            },
            xhr => {
                // console.log(xhr.responseText)
                dispatch(setError(xhr.responseJSON.message))
                dispatch(setIsLoading(false))
            }
        )
    }
}

export function confirmOrder(products = []) {
    return dispatch => {
        dispatch(setIsLoading(true))
        $.ajax({
            method: "POST",
            url   : `${SERVER}/api/v1/order`,
            data  : JSON.stringify(products),
            contentType: "application/json; charset=utf-8"
        }).then(
            orderedProducts => {
                dispatch(setOrder(orderedProducts))
                dispatch(setIsLoading(false))
            },
            xhr => {
                dispatch(setError(xhr.responseJSON.message))
                dispatch(setIsLoading(false))
            }
        )
    }
}

export function setCustomerId(id) {
    return dispatch => {
        setCookie("customerID", id);
        dispatch(setOrder([]))
        dispatch(setProducts([]))
        dispatch({ type: SET_CUSTOMER_ID, id })
        dispatch(fetchCustomerLocationID(id))
    }
}

export function setLocationId(id) {
    return dispatch => {
        dispatch({ type: SET_LOCATION_ID, id })
        dispatch(setError(null))
        dispatch(fetchCatalogue(id))
    }
}
