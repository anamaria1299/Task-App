import Grid from '@material-ui/core/Grid'
import {TodoCard} from './todo-card'
import React from 'react'
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";

export class TodoList extends React.Component {

    render() {

        let todoList

        try {

            todoList = JSON.parse(localStorage.getItem('items')).map((todo, i) => {
                return (
                    <TodoCard key={i}
                      title={todo.title} endDate={todo.endDate}
                      priority={todo.priority} description={todo.description}/>
                )
            })
        } catch(e) {
            todoList =  'There are not cards here! yet'
        }

        return (
            <div>
                <form className="form-inline md-form mr-auto mb-4">
                    <MDBContainer style={{width: '95%'}}>
                        <MDBRow>
                            <MDBCol sm="9">
                                <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
                                <button className="btn young-passion-gradient btn-rounded btn-sm my-0"  style={{ 'borderRadius': '46px', color: 'white'}}type="submit">Search</button>
                                <Grid container id='todoList' direction="column" justify="space-evenly" alignItems="stretch">
                                    <br/>
                                    <Grid item>
                                        {todoList}
                                    </Grid>
                                </Grid>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </form>
            </div>
        )
    }
}
