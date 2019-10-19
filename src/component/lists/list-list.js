import React from 'react'
import {MDBCol, MDBContainer, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBRow} from "mdbreact";
import * as axios from "axios";
import {Card} from "../cards/card";
import Grid from "@material-ui/core/Grid";

export class ListList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            list: [],
            boardList: '',
            listName: '',
            cards: [],
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleListOnClick = this.handleListOnClick.bind(this)
    }

    componentDidMount() {

        this.setState({ boardList: this.props.location.boardId})

        axios.get(`https://task-app-ana-api.herokuapp.com/boards/${this.props.location.boardId}/lists`, {
                Authorization: 'Bearer '+ localStorage.getItem('accessToken')
            })
            .then((data) => {
                let list = []
                data.data.forEach((l) => {
                    list.push(
                        <div key={l.name}>
                            <MDBDropdownItem
                                value={l.name}
                                onClick={this.handleListOnClick}
                            >
                                {l.name}
                            </MDBDropdownItem>
                            <MDBDropdownItem divider />
                        </div>
                    )
                })
                this.setState({list: list})
            })
    }

    handleListOnClick(e) {

        //todo review board id
        this.setState({listName: e.target.value})
        axios.get(`https://task-app-ana-api.herokuapp.com/boards/${this.state.boardList}/lists/${e.target.value}/cards`,{
            Authorization: 'Bearer '+ localStorage.getItem('accessToken')
        })
            .then((data) => {
                let cards = []
                data.data.forEach((c) => {
                    console.log(c)
                    cards.push(
                        <Card key={c.name} title={c.name} member={c.member.name} endDate={c.dueDate} description={c.description}/>
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
                                <MDBDropdown>
                                    <MDBDropdownToggle caret className="heavy-rain-gradient" style={{borderRadius: "70%"}}>
                                        Lists
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu basic>
                                        {this.state.list}
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBCol>
                            <MDBCol sm="3"/>
                        </MDBRow>
                        <br/>
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
