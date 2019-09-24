import ReorderOutlinedIcon from '@material-ui/icons/ReorderOutlined'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import AssignmentIcon from '@material-ui/icons/Assignment'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import SettingsIcon from '@material-ui/icons/Settings'
import ListItem from '@material-ui/core/ListItem'
import QueueIcon from '@material-ui/icons/Queue'
import Divider from '@material-ui/core/Divider'
import LockIcon from '@material-ui/icons/Lock'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import React from 'react'
import {Link} from "react-router-dom";

export class Drawer extends React.Component {

    constructor(props) {

        super(props)
        this.state = {left: false}
        this.drawerAction = this.drawerAction.bind(this)
        this.items = this.items.bind(this)
    }

    render() {

        return (
            <div>
                <Button onClick={this.drawerAction}>
                    <ReorderOutlinedIcon/>
                </Button>
                <SwipeableDrawer
                    open={this.state.left}
                    onClose={this.drawerAction}
                    onOpen={this.drawerAction}
                >
                    <div
                        style={ {width: '250'} }
                        role="presentation"
                        onClick={this.drawerAction}
                        onKeyDown={this.drawerAction}
                    >
                        {this.items()}
                    </div>
                </SwipeableDrawer>
            </div>
        )
    }

    drawerAction() {

        if(this.state.left ) {
            this.setState({left: false})
        } else {
            this.setState({left: true})
        }
    }

    handleLogOut() {

        localStorage.clear()
    }

    items() {

        return (
            <div>
                <List>
                    <ListItem button>
                        <DashboardIcon style={{color:'rgba(238, 114, 127, 0.81)'}}/>
                        <ListItemText primary='Boards'/>
                    </ListItem>
                    <ListItem button>
                        <Link to='/cards'>
                            <AssignmentIcon style={{color:'rgba(238, 114, 127, 0.81)'}}/>
                        </Link>
                        <ListItemText primary='Cards' />
                    </ListItem>
                    <ListItem button>
                        <Link to='/new'>
                            <QueueIcon style={{color:'rgba(238, 114, 127, 0.81)'}}/>
                        </Link>
                        <ListItemText primary='new card' />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {['Configurations', 'log out'].map((text, index) => (
                        <ListItem button key={text} >
                            <ListItemIcon>{index % 2 === 0 ? <SettingsIcon style={{color:'rgba(238, 114, 127, 0.81)'}} /> :
                                <Link to='/login'>
                                    <LockIcon onClick={this.handleLogOut} style={{color:'rgba(238, 114, 127, 0.81)'}}/>
                                </Link>
                            }</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        )
    }
}
