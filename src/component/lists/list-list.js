import React from 'react'
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import * as axios from "axios";
import {Card} from "../cards/card";
import Grid from "@material-ui/core/Grid";

export class ListList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            cards: [],
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleSearch(e) {

        // TODO review what is happening with this
        console.log(e.target.value)
        let card = this.state.cards.filter((c) =>{
            return c.name.includes(e.target.value)
        })

        console.log(card)
    }

    componentDidMount() {
        axios.get(`https://task-app-ana-api.herokuapp.com/api/v1/cards`,{
            headers: {
                Authorization: 'Bearer '+ localStorage.getItem('accessToken'),
            },
        })
            .then((data) => {
                let cards = []
                data.data.forEach((c) => {
                    cards.push(
                        <Card key={c.name} title={c.name} member={c.user.name} endDate={c.dueDate} description={c.description}
                            priority={c.priority}/>
                    )
                    this.setState({cards: cards})
                })
            })

    }

    render() {

        return (
            <div>
                <form className="form-inline md-form mr-auto mb-4">
                    <MDBContainer style={{width: '95%'}}>
                        <MDBRow>
                            <MDBCol sm="3"/>
                            <MDBCol sm="6">
                                <input className="form-control mr-sm-2" type="text" placeholder="Search by name" aria-label="Search"/>
                                <button className="btn heavy-rain-gradient btn-rounded btn-sm my-0"
                                        style={{ 'borderRadius': '46px', color: 'white'}}
                                        type="submit"
                                        onClick={this.handleSearch}
                                >Search</button>
                            </MDBCol>
                            <MDBCol sm="3"/>
                        </MDBRow>
                        <br/>
                        <MDBRow>
                            <MDBCol sm="3"/>
                            <MDBCol sm="6">
                                <Grid container id='todoList' direction="column" justify="space-evenly" alignItems="stretch">
                                    <Grid item>
                                        {this.state.boardList}
                                    </Grid>
                                </Grid>
                            </MDBCol>
                            <MDBCol sm="3"/>
                        </MDBRow>
                    </MDBContainer>
                </form>
                <form className="form-inline md-form mr-auto mb-4">
                    <MDBContainer style={{width: '95%'}}>
                        <MDBRow>
                            <MDBCol sm="3"/>
                            <MDBCol sm="6">
                                <Grid container id='cardsList' direction="column" justify="space-evenly" alignItems="stretch">
                                    <Grid item>
                                        {this.state.cards}
                                    </Grid>
                                </Grid>
                            </MDBCol>
                            <MDBCol sm="3"/>
                        </MDBRow>
                        <br/>
                    </MDBContainer>
                </form>
            </div>
        )
    }
}
