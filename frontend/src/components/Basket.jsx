import React from "react"
import Panel from "./Panel"

const TYPES = React.PropTypes;

/**
 * The Basket component.
 */
export default class Basket extends React.Component
{
    /**
     * Describes the type of props that the component accepts
     * @type {Object}
     */
    static propTypes = {
        products    : TYPES.array,  // The products to list
        emptyMessage: TYPES.string, // What to display if the basket is empty
        confirmOrder: TYPES.func    // The checkout action
    };

    /**
     * Default values for props
     * @type {Object}
     */
    static defaultProps = {
        products    : [],
        emptyMessage: "Your basket is empty"
    };

    /**
     * Renders the list of products within the basket (or the empty message)
     * @param  {Array}  products     Array of prodyct objects
     * @param  {String} emptyMessage The message to show if the basket is empty
     * @return {React.Component}     ReactDOM.ul
     */
    renderContents(products, emptyMessage) {

        if (!products.length) { // if empty
            return (
                <p className="text-center text-muted">
                    { emptyMessage }
                </p>
            )
        }

        return (
            <ul>
                { products.map( (p, i) => (
                    <li key={i}>{ p.product }</li>
                )) }
            </ul>
        )
    }

    /**
     * Renders the component
     * @return {Panel}
     */
    render() {
        let { products, emptyMessage, confirmOrder, ...panelProps } = this.props

        return (
            <Panel { ...panelProps }>
                <div className="panel-body">
                    { this.renderContents(products, emptyMessage) }
                </div>
                <div className="panel-footer text-center">
                    <button
                        className="btn btn-success"
                        disabled={ !products.length }
                        style={{ minWidth: "10em" }}
                        onClick={ () => { confirmOrder(products.map(p => p.product))} }
                    >Checkout</button>
                </div>
            </Panel>
        )
    }
}
