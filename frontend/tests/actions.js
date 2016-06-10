/* global describe, it */
import chai            from "chai"
import thunkMiddleware from "redux-thunk"
import initialState    from "../src/reducer"
import * as actions    from "../src/actions"
import { getCookie }   from "../src/lib"
import {
    createStore as originalCreateStore,
    applyMiddleware
} from "redux"


const expect = chai.expect

function createStore() {
    return originalCreateStore(initialState, applyMiddleware(thunkMiddleware))
}

describe("Actions", () => {

    // setIsLoading ------------------------------------------------------------
    it ("setIsLoading() toggles the isLoading flag as boolean", () => {
        let store = createStore();
        [
            { input: true     , expected: true  },
            { input: false    , expected: false },
            { input: ""       , expected: false },
            { input: "false"  , expected: true  },
            { input: -1       , expected: true  },
            { input: 0        , expected: false },
            { input: null     , expected: false },
            { input: undefined, expected: false }
        ].forEach(opt => {
            store.dispatch(actions.setIsLoading(opt.input));
            expect(store.getState().isLoading).to.equal(opt.expected)
        })
    })

    // setError ----------------------------------------------------------------
    it ("setError() sets the error message as string", () => {
        let store = createStore();
        [
            { input: true     , expected: "true"  },
            { input: false    , expected: ""      },
            { input: ""       , expected: ""      },
            { input: "false"  , expected: "false" },
            { input: -1       , expected: "-1"    },
            { input: 0        , expected: ""      },
            { input: null     , expected: ""      },
            { input: undefined, expected: ""      }
        ].forEach(opt => {
            store.dispatch(actions.setError(opt.input));
            expect(store.getState().error).to.equal(opt.expected)
        })
    })

    // setProducts -------------------------------------------------------------
    it ("setProducts() updates the products array", () => {
        let store = createStore();
        [
            { input: true     , expected: [true]      },
            { input: false    , expected: [false]     },
            { input: ""       , expected: [""]        },
            { input: []       , expected: []          },
            { input: -1       , expected: [-1]        },
            { input: 0        , expected: [0]         },
            { input: null     , expected: [null]      },
            { input: undefined, expected: [undefined] }
        ].forEach(opt => {
            store.dispatch(actions.setProducts(opt.input));
            expect(store.getState().products).to.deep.equal(opt.expected)
        })
    })

    // setOrder ----------------------------------------------------------------
    it ("setOrder() updates the order array", () => {
        let store = createStore();
        [
            { input: true     , expected: [true]      },
            { input: false    , expected: [false]     },
            { input: ""       , expected: [""]        },
            { input: []       , expected: []          },
            { input: -1       , expected: [-1]        },
            { input: 0        , expected: [0]         },
            { input: null     , expected: [null]      },
            { input: undefined, expected: [undefined] }
        ].forEach(opt => {
            store.dispatch(actions.setOrder(opt.input));
            expect(store.getState().order).to.deep.equal(opt.expected)
        })
    })

    // toggleProduct -----------------------------------------------------------
    it ("toggleProduct() can be used to toggle the product's selected state", () => {
        let store = createStore();
        store.dispatch(actions.setProducts([{ product: "product 1" }]));
        [
            { input: ["product 1", false ], expected: false },
            { input: ["product 1", true  ], expected: true  },
            { input: ["product 1"        ], expected: false },
            { input: ["product 1", null  ], expected: false },
            { input: ["product 1", 0     ], expected: false },
            { input: ["product 1", 1     ], expected: true  },
            { input: ["product 1", "yes" ], expected: true  },
            { input: ["product 1", -1    ], expected: true  }
        ].forEach(opt => {
            store.dispatch(actions.toggleProduct(...opt.input));
            expect(store.getState().products[0].selected).to.equal(opt.expected)
        })
    })

    // setCustomerId -----------------------------------------------------------
    it ('"setCustomerId()" triggers the corrct chain of actions', () => {
        let store = createStore()
        let user  = 'london_user'
        store.dispatch(actions.setOrder(['whatever']))
        store.dispatch(actions.setCustomerId(user))
        expect(getCookie("customerID")).to.equal(user);
        let state = store.getState()
        expect(state.customerID).to.equal(user)
        expect(state.isLoading).to.equal(true)
        expect(state.order).to.deep.equal([])
    })

    // fetchCustomerLocationID -------------------------------------------------
    it ('Sets "isLoading" to true when fetchCustomerLocationID() is called', () => {
        let store = createStore()
        store.dispatch(actions.fetchCustomerLocationID())
        expect(store.getState().isLoading).to.equal(true)
    })

    // setLocationId -----------------------------------------------------------
    it ('"setLocationId()" triggers the corrct chain of actions', () => {
        let store = createStore()
        let locID = 'LONDON'
        store.dispatch(actions.setLocationId(locID))
        let state = store.getState()
        expect(state.locationID).to.equal(locID)
        expect(state.error).to.equal("")
        expect(state.isLoading).to.equal(true)
    })

    // fetchCatalogue ----------------------------------------------------------
    it ('Sets "isLoading" to true when fetchCatalogue() is called', () => {
        let store = createStore()
        store.dispatch(actions.fetchCatalogue())
        expect(store.getState().isLoading).to.equal(true)
    })

    // confirmOrder ------------------------------------------------------------
    it ('Sets "isLoading" to true when confirmOrder() is called', () => {
        let store = createStore()
        store.dispatch(actions.confirmOrder())
        expect(store.getState().isLoading).to.equal(true)
    })

})
