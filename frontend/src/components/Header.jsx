import React from "react"

export default class Header extends React.Component
{
    static propTypes = {
        customerID   : React.PropTypes.string,
        setCustomerId: React.PropTypes.func.isRequired
    };

    onUserChange(event) {
        this.props.setCustomerId(
            event.target.options[event.target.selectedIndex].value
        )
    }

    render() {
        return (
            <div>
                <h2 className="page-header">
                    <img src="data:image/jpeg;base64,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" height="55" style={{
                        margin: "-15px 10px -9px 0"
                    }}/>
                    Product Selection
                    <small> - SKY technology unattended programming test</small>
                </h2>
                <div className="alert alert-warning form-horizontal">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="col-sm-2 control-label">
                            <i className="glyphicon glyphicon-user"/> Select user
                        </label>
                        <div className="col-sm-3">
                            <select className="form-control" onChange={ ::this.onUserChange } value={ this.props.customerID || "" }>
                                <option value="guest">Guest</option>
                                <option value="london_user">User from London </option>
                                <option value="liverpool_user">User from Liverpool</option>
                            </select>
                        </div>
                        <div className="col-sm-7">
                            <p className="form-control-static small">
                            (pretend that you have logged in as the selected
                            user for the purpose of the example)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
