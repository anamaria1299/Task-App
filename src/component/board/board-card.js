import {Link} from 'react-router-dom'
import React from 'react'

export class BoardCard extends React.Component{

    render() {
        return (
            <Link to={{
                pathname: "/cards/:boardId",
                boardId: this.props.id
            }}>
                <div id={this.props.title}>
                    <div className="card card-cascade wider mb-4" style={{borderRadius: "20%"}}>

                        <div className="view view-cascade gradient-card-header text-center heavy-rain-gradient"
                             style={{borderRadius: "20%"}}>

                            <h2 className="card-header-title mb-3" style={{'fontWeight': 'bolder', color: 'white'}}>
                                {this.props.title}
                            </h2>
                        </div>
                    </div>
                </div>
            </Link>
        )

    }
}
