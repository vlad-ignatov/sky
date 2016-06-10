import React from "react"

const TYPES = React.PropTypes;

/**
 * The Sidebar component.
 */
export default class Panel extends React.Component
{
    /**
     * Describes the type of props that the component accepts
     * @type {Object}
     */
    static propTypes = {

        // The text to display in the panel heading
        label: TYPES.string.isRequired,

        // Optional custom panel heading className(s)
        labelClassName: TYPES.string,

        // Optional className for the panel
        className: TYPES.string,

        children: TYPES.any
    };

    /**
     * Default values for props
     * @type {Object}
     */
    static defaultProps = {
        className: "panel-default"
    };

    /**
     * Renders the component
     * @return {React.Component}
     */
    render() {
        return (
            <div className={ "panel " + this.props.className }>
                <div className="panel-heading">
                    <b className={ this.props.labelClassName }>{ this.props.label }</b>
                </div>
                { this.props.children }
            </div>
        )
    }
}
