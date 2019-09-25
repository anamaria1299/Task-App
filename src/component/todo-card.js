import React from 'react'

export class TodoCard extends React.Component{

    render() {
        return (
            <div id={this.props.title}>
                <div className="card card-cascade wider mb-4">

                    <div className="view view-cascade gradient-card-header young-passion-gradient text-center">

                        <h2 className="card-header-title mb-3" style={{'fontWeight': 'bolder', color: 'white'}}>
                            {this.props.title}
                        </h2>
                    </div>

                    <div className="card-body card-body-cascade text-center">
                        <h6 className="card-header-title mb-3" style={{'fontStyle': 'italic'}}>
                            Priority: {this.props.priority}
                        </h6>
                        <p className="mb-0">
                            <i className="fas fa-calendar mr-2"/>
                            {this.props.endDate.split("T")[0]}
                        </p>
                        <p className="card-text justify">{this.props.description}</p>
                    </div>
                </div>
            </div>
        )

    }
}
