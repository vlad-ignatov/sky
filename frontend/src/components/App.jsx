import React         from "react"
import Panel         from "./Panel"
import ProductList   from "./ProductList"
import Basket        from "./Basket"
import Header        from "./Header"
import Footer        from "./Footer"
import { connect }   from "react-redux"
import { getCookie } from "../lib"
import {
    setCustomerId,
    setLocationId,
    fetchCustomerLocationID,
    fetchCatalogue,
    confirmOrder,
    toggleProduct
} from "../actions"

const TYPES = React.PropTypes;

/**
 * This is the root component.
 */
export default class App extends React.Component
{
    static propTypes = {
        isLoading              : TYPES.bool,
        customerID             : TYPES.string,
        error                  : TYPES.string,
        setCustomerId          : TYPES.func,
        fetchCustomerLocationID: TYPES.func,
        confirmOrder           : TYPES.func,
        products               : TYPES.array,
        toggleProduct          : TYPES.func,
        order                  : TYPES.array
    };

    /**
     * The flux container. This will be used to create an istance of the App
     * component with actions and props bound to the store.
     */
    static Container = connect(
        state => state,
        dispatch => {
            return {
                setCustomerId          : id => dispatch(setCustomerId(id)),
                setLocationId          : id => dispatch(setLocationId(id)),
                fetchCustomerLocationID: () => dispatch(fetchCustomerLocationID()),
                fetchCatalogue         : () => dispatch(fetchCatalogue()),
                confirmOrder           : (...args) => dispatch(confirmOrder(...args)),
                toggleProduct          : (...args) => dispatch(toggleProduct(...args))
            }
        }
    )(App);

    /**
     * Everything starts by setting some customerID. This will trigger a request
     * to the CustomerLocationService which in turn will trigger another one to
     * the CatalogueService and all the data wil be "injected" in very natural
     * way...
     * @return {void}
     */
    componentDidMount() {
        this.props.setCustomerId(getCookie("customerID") || "guest")
    }

    /**
     * Invoked in case of error to render it in an error alert
     */
    renderError() {
        return (
            <div className="alert alert-danger">
                <i className="glyphicon glyphicon-minus-sign">&nbsp;</i>
                { this.props.error }
            </div>
        )
    }

    /**
     * Invoked if there is a reply from the order page API to render the
     * completed order.
     */
    renderCompletedOrder() {
        return (
            <div className="row">
                <div className="col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                    <h3 className="text-success page-header">You order is complete!</h3>
                    <div>
                        <b>You have selected:</b>
                        { this.props.order.map((item, i) => (
                            <div key={i}>
                                <i className="glyphicon glyphicon-ok text-success"/> { item }
                            </div>
                        ))}
                    </div>
                    <br/>
                    <p className="text-muted">
                        <i className="glyphicon glyphicon-info-sign"/>&nbsp;
                        To start over refresh the page or select another user.
                    </p>
                </div>
            </div>
        )
    }

    /**
     * Renders the three panels in the main page
     */
    renderSelectionScreen() {
        return (
            <div className="row">
                <div className="col-sm-4">
                    <Panel label="Sports" labelClassName="text-primary">
                        <ProductList products={
                            this.props.products.filter(p => p.category == "Sports")
                        } toggleProduct={ this.props.toggleProduct }/>
                    </Panel>
                </div>
                <div className="col-sm-4">
                    <Panel label="News" labelClassName="text-primary">
                        <ProductList products={
                            this.props.products.filter(p => p.category == "News")
                        } toggleProduct={ this.props.toggleProduct }/>
                    </Panel>
                </div>
                <div className="col-sm-4">
                    <Basket label="Basket" className="panel-primary" products={
                        this.props.products.filter(p => p.selected)
                    } confirmOrder={ this.props.confirmOrder }/>
                </div>
            </div>
        )
    }

    /**
     * Renders the contents of the main page
     */
    renderContents() {
        if (this.props.error) {
            return this.renderError()
        }

        if (this.props.order.length) {
            return this.renderCompletedOrder()
        }

        return this.renderSelectionScreen()
    }

    /**
     * Renders the component (the entire page)
     */
    render() {
        return (
            <div className="container">
                <Header customerID={ this.props.customerID } setCustomerId={ this.props.setCustomerId }/>
                { this.renderContents() }
                <Footer name="Vladimir Ignatov" email="vlad.ignatov@gmail.com" />
            </div>
        )
    }
}
