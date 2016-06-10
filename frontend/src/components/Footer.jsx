import React from "react"

export default class Footer extends React.Component
{
    static propTypes = {
        email: React.PropTypes.string.isRequired,
        name : React.PropTypes.string.isRequired
    };

    render() {
        return (
            <div>
                <hr/>
                <p className="text-center text-muted small">
                    By <a href={"mailto:" + this.props.email }>{ this.props.name }</a>
                </p>
            </div>
        )
    }
}
