import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import DatePicker from 'react-datepicker'
import React, {Component} from 'react'
import {TodoList} from './todo-list'
import moment from 'moment'
import '../css/app.css'

export class TodoApp extends Component {

    constructor(props) {

        super(props);
        this.state = {items: [], text: '', priority: 0, dueDate: moment()};
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {

        return (
            <div className="TodoApp" >
                <br/>
                <Card className="todo-form">
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Create a New TODO
                        </Typography>
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                <TextField
                                    id="text"
                                    label="Text"
                                    onChange={this.handleTextChange}
                                    value={this.state.text}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="priority"
                                    type="number"
                                    onChange={this.handlePriorityChange}
                                    value={this.state.priority}
                                    label="Priority"
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <DatePicker
                                    id="due-date"
                                    selected={this.state.dueDate}
                                    placeholderText="Due date"
                                    onChange={this.handleDateChange}>
                                </DatePicker>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={this.handleSubmit}>
                            <Typography color="textSecondary" gutterBottom>
                                Add
                            </Typography>
                        </Button>
                    </CardActions>
                </Card>
                <br/><br/>
                <TodoList todoList={this.state.items}/>
            </div>
        )
    }

    handleTextChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    handlePriorityChange(e) {
        this.setState({
            priority: e.target.value
        });
    }

    handleDateChange(date) {
        this.setState({
            dueDate: date
        });
    }

    handleSubmit(e) {

        e.preventDefault();

        if (!this.state.text.length || !this.state.priority.length || !this.state.dueDate)
            return;

        const newItem = {
            text: this.state.text,
            priority: this.state.priority,
            dueDate: this.state.dueDate,

        };
        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            text: '',
            priority: '',
            dueDate: ''
        }));
    }
}