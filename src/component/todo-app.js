import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import DatePicker from 'react-datepicker'
import React, {Component} from 'react'
import '../css/todoApp.css'
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import * as axios from "axios";

export class TodoApp extends Component {
    state;

    constructor(props) {

        super(props)
        this.state = {
            items: [],
            users: [],
            usersInformation: [],
            responsible: {},
            responsibleName: '',
            description: '',
            priority: 0,
            endDate: moment(),
            title: '',
            state: '',
            openUsers: false,
            openState: false,
            open: false,
            file: ''
        }

        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handlePriorityChange = this.handlePriorityChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleStateClose = this.handleStateClose.bind(this)
        this.handleStateOpen = this.handleStateOpen.bind(this)
        this.handleStateChange = this.handleStateChange.bind(this)
        this.handleUserClose = this.handleUserClose.bind(this)
        this.handleUserOpen = this.handleUserOpen.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleLocalStorage = this.handleLocalStorage.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleResponsibleChange = this.handleResponsibleChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentDidMount() {
        axios.get(`https://task-app-ana-api.herokuapp.com/users`,{
            headers: {
                Authorization: 'Bearer '+ localStorage.getItem('accessToken'),
            },
        })
            .then((data) => {
                let users = []
                let usersInformation = []
                data.data.forEach((u) => {
                    usersInformation.push(u)
                    users.push(
                        <MenuItem key={u.email} value={u.email}>{u.name}</MenuItem>
                    )
                    this.setState({users: users, usersInformation: usersInformation})
                })
            })
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

                            <DatePicker
                                id="due-date"
                                placeholderText="Due date"
                                selected={this.state.endDate}
                                onChange={this.handleDateChange}>

                            </DatePicker>

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

                            <input type="file" id="file" onChange={this.handleInputChange}/>

                            Responsible <Select
                                value={this.state.responsibleName}
                                open={this.state.openUsers}
                                onClose={this.handleUserClose}
                                onOpen={this.handleUserOpen}
                                onChange={this.handleResponsibleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {this.state.users}
                            </Select>

                            State <Select
                                value={this.state.state}
                                open={this.state.openState}
                                onClose={this.handleStateClose}
                                onOpen={this.handleStateOpen}
                                onChange={this.handleStateChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"TODO"}>TODO</MenuItem>
                                <MenuItem value={"IN PROGRESS"}>IN PROGRESS</MenuItem>
                                <MenuItem value={"DONE"}>DONE</MenuItem>
                            </Select>


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

    handleStateClose() {
        this.setState({openState: false})
    }

    handleStateOpen() {
        this.setState({openState: true})
    }

    handleUserClose() {
        this.setState({openUsers: false})
    }

    handleUserOpen() {
        this.setState({openUsers: true})
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
        })
    }

    handleStateChange(e) {
        this.setState({
            state: e.target.value
        })
    }

    handleResponsibleChange(e) {

        let responsible = {}
        this.state.usersInformation.forEach((u) => {
            if(u.email === e.target.value) {
                responsible = u
            }
        })
        this.setState({
            responsible: responsible,
            responsibleName: responsible.name
        })
    }

    handleDateChange(date) {

        this.setState({
            endDate: date
        });
    }

    handleInputChange(e) {
        this.setState({
            file: e.target.files[0]
        });
    }

    handleSubmit(e) {

        let data = new FormData();
        data.append('file', this.state.file);

        axios.post('http://localhost:8080/api/files', data)
            .then(function (response) {
                console.log("file uploaded!", data);
            })
            .catch(function (error) {
                console.log("failed file upload", error);
            });

        e.preventDefault();

        if (!this.state.title.length || !this.state.priority || !this.state.endDate)
            return;

        const newItem = {
            title: this.state.title,
            priority: this.state.priority,
            endDate: this.state.endDate,
            description: this.state.description,
            responsible: this.state.responsible,
            state: this.state.state,
        }

        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            title: '',
            priority: '',
            endDate: moment(),
            description: '',
            responsible: {},
            state: '',
            responsibleName: '',
        }))

        console.log(newItem)

        axios.post('https://task-app-ana-api.herokuapp.com/api/v1/cards', {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: 'Bearer '+ localStorage.getItem('accessToken'),
            }
        },{
            user: this.state.responsible,
            name: this.state.title,
            dueDate: this.state.endDate,
            description: this.state.description,
            priority: this.state.priority,
            state: this.state.state
        })

        this.handleLocalStorage(this.state.items.concat(newItem))
    }
}
