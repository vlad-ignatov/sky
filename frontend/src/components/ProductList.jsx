import React from "react"

const TYPES = React.PropTypes;

/**
 * The Sidebar component.
 */
export default class ProductList extends React.Component
{
    /**
     * Describes the type of props that the component accepts
     * @type {Object}
     */
    static propTypes = {

        // The products to list
        products: TYPES.array,

        // The action to invoke when the options are clicked
        toggleProduct: TYPES.func
    };

    /**
     * Default values for props
     * @type {Object}
     */
    static defaultProps = {
        products: []
    };

    /**
     * Renders the component
     * @return {React.Component}
     */
    render() {
        return (
            <div className="list-group">
                { this.props.products.map( (p, i) => (
                    <label className="list-group-item" key={i} onMouseDown={
                        // just because fast clicks are making ugly selection...
                        e => e.preventDefault()
                    }>
                        <input
                            type="checkbox"
                            onChange={ this.props.toggleProduct.bind(this, p.product, !p.selected) }
                            checked={ !!p.selected }
                        />
                        &nbsp;{ p.product }
                    </label>
                )) }
            </div>
        )
    }
}
