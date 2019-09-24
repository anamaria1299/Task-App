import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import React, {Component} from 'react'
import {TodoList} from './todo-list'
import moment from 'moment'
import '../css/todoApp.css'

export class TodoApp extends Component {

    constructor(props) {

        super(props)
        this.state = {items: [], description: '', priority: 0, endDate: moment().format('YYYY-MM-DD'), title: '', open: false}
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handlePriorityChange = this.handlePriorityChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleLocalStorage = this.handleLocalStorage.bind(this)
    }

    render() {
        return (
            <div>

                <div className="card">

                    <h5 className="card-header white-text text-center py-4 young-passion-gradient">
                        <strong>New Card</strong>
                    </h5>

                    <div className="card-body px-lg-5 pt-0">

                        <form className="md-form" style={{color: '#757575'}} onSubmit={this.handleSubmit}>


                            <input type="text"
                                   className="form-control"
                                   placeholder='Title'
                                   value={this.state.title}
                                   onChange={this.handleTitleChange}
                            />

                            <input placeholder="Due date" type="date" id="endDate"
                                   className="form-control datepicker" onChange={this.handleDateChange}
                                   value={this.state.endDate}
                            />

                            Priority <Select
                                value={this.state.priority}
                                open={this.state.open}
                                onClose={this.handleClose}
                                onOpen={this.handleOpen}
                                onChange={this.handlePriorityChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Select>

                            <textarea type="text" id="description"
                              className="form-control md-textarea" rows="3" placeholder='description'
                              onChange={this.handleDescriptionChange} value={this.state.description}
                            />

                            <button className="btn btn-rounded btn-block z-depth-0 my-4 waves-effect
                                young-passion-gradient" style={{ 'borderRadius': '46px', color: 'white'}} type="submit"
                                onClick={this.handleSubmit}>
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    handleLocalStorage(items) {

        localStorage.setItem('items', JSON.stringify(items))
    }

    handleClose() {
        this.setState({open: false})
    }

    handleOpen() {
        this.setState({open: true})
    }

    handleTitleChange(e) {
        this.setState({
            title: e.target.value
        })
    }
    
    handleDescriptionChange(e) {
        this.setState({
            description: e.target.value
        })
    }

    handlePriorityChange(e) {
        this.setState({
            priority: e.target.value
        });
    }

    handleDateChange(date) {
        this.setState({
            endDate: date
        });
    }

    handleSubmit(e) {

        e.preventDefault();

        if (!this.state.title.length || !this.state.priority || !this.state.endDate)
            return;

        const newItem = {
            title: this.state.title,
            priority: this.state.priority,
            endDate: this.state.endDate,
            description: this.state.description,
        }
        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            title: '',
            priority: '',
            endDate: moment().format('YYYY-MM-DD'),
            description: '',
        }))


        this.handleLocalStorage(this.state.items.concat(newItem))
    }
}
