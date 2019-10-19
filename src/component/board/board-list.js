import Grid from '@material-ui/core/Grid'
import React from 'react'
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import * as axios from "axios";
import {BoardCard} from "./board-card"
import Fab from "@material-ui/core/Fab"
import AddIcon from '@material-ui/icons/Add'
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

export class BoardList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            boardList: [],
            modalView: false,
        }

        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleCreateBoard = this.handleCreateBoard.bind(this)
    }

    componentDidMount() {

        axios.get('https://task-app-ana-api.herokuapp.com/boards')
            .then((data) => {
                let boardList = []
                data.data.forEach((board) => {
                    boardList.push(
                        <BoardCard key={board.id} id={board.id} title={board.name}/>
                    )
                })
                this.setState({boardList: boardList})
            })
    }

    handleOpen() {

        this.setState({modalView: true,})
    }

    handleClose() {

        this.setState({modalView: false,})
    }

    handleCreateBoard() {

        console.log(document.getElementById('boardName').value)
        //TODO do post to create board
    }

    render() {

        const Transition = React.forwardRef(function Transition(props, ref) {
            return <Slide direction="up" ref={ref} {...props} />;
        });

        return (
            <div>
                <form className="form-inline md-form mr-auto mb-4">
                    <MDBContainer style={{width: '95%'}}>
                        <MDBRow>
                            <MDBCol sm="3"/>
                            <MDBCol sm="6">
                                <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
                                <button className="btn heavy-rain-gradient btn-rounded btn-sm my-0"  style={{ 'borderRadius': '46px', color: 'white'}}type="submit">Search</button>
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
                <div>
                    <MDBContainer style={{width: '95%'}}>
                        <MDBRow>
                            <MDBCol sm="10"/>
                            <MDBCol sm="1">
                                <Fab style={{color: 'rgba(0, 0, 0, 0.18)'}} aria-label="add">
                                    <AddIcon onClick={this.handleOpen}/>
                                </Fab>
                            </MDBCol>
                            <MDBCol sm="1"/>
                        </MDBRow>
                    </MDBContainer>
                    <div>
                        <Dialog
                            open={this.state.modalView}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle id="alert-dialog-slide-title">
                                {"Write the name for a new board"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    <input type="text"
                                           className="form-control"
                                           placeholder='Name'
                                           id='boardName'
                                    />
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                    cancel
                                </Button>
                                <Button onClick={this.handleCreateBoard} color="primary">
                                    create
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>

            </div>
        )
    }
}
