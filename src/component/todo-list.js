import Grid from "@material-ui/core/Grid";
import {Todo} from './todo'
import React from 'react'

export class TodoList extends React.Component {

    render() {
        const todoList = this.props.todoList.map((todo, i) => {
            return (
                <Todo key={i} text={todo.text} priority={todo.priority} dueDate={todo.dueDate}/>
            )
        })

        return (
            <Grid container direction="column" justify="space-evenly" alignItems="stretch">
                <Grid item>
                    {todoList}
                </Grid>
            </Grid>
        )
    }
}