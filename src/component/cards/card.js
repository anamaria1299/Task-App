import React from 'react'

export class Card extends React.Component{

    render() {
        return (
            <div id={this.props.title}>
                <div className="card card-cascade wider mb-4" style={{borderRadius: "20%"}}>

                    <div className="view view-cascade gradient-card-header heavy-rain-gradient text-center">

                        <h2 className="card-header-title mb-3" style={{'fontWeight': 'bolder', color: 'white'}}>
                            {this.props.title}
                        </h2>
                    </div>

                    <div className="card-body card-body-cascade text-center">

                        <p className="card-text justify">Member: {this.props.member}</p>
                        <p className="card-header-title mb-3" style={{'fontStyle': 'italic'}}>
                            Priority: {this.props.priority}
                        </p>
                        <p className="card-text justify">Description:</p>
                        <p className="card-text justify">{this.props.description}</p>
                        <p className="mb-0">
                            <i className="fas fa-calendar mr-2"/>
                            {this.props.endDate.split("T")[0]}
                        </p>
                    </div>
                </div>
            </div>
        )

    }
}
