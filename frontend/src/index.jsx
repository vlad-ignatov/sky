import $                                 from "jquery"
import React                             from "react"
import { render }                        from "react-dom"
import App                               from "./components/App"
import { Provider }                      from "react-redux"
import { createStore, applyMiddleware }  from "redux"
import thunkMiddleware                   from "redux-thunk"
import state                             from "./reducer"
import { logger }                        from "./lib"

// export this because the bootstrap js requires it
window.$ = window.jQuery = $

let store = createStore(state, applyMiddleware(thunkMiddleware, logger))

render(
    <Provider store={ store }>
        <App.Container/>
    </Provider>,
    document.getElementById("main")
)
