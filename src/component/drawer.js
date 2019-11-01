import ReorderOutlinedIcon from '@material-ui/icons/ReorderOutlined'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import SettingsIcon from '@material-ui/icons/Settings'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import LockIcon from '@material-ui/icons/Lock'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import {Link} from 'react-router-dom'
import React from 'react'

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
                        <Link to='/app'>
                            <DashboardIcon style={{color:'rgb(142, 46, 56)'}}/>
                        </Link>
                        <ListItemText primary='Cards'/>
                    </ListItem>
                    <ListItem button>
                        <Link to='/new-todo'>
                            <DashboardIcon style={{color:'rgb(142, 46, 56)'}}/>
                        </Link>
                        <ListItemText primary='Add card'/>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {['Configurations', 'log out'].map((text, index) => (
                        <ListItem button key={text} >
                            <ListItemIcon>{index % 2 === 0 ? <SettingsIcon style={{color:'rgb(142, 46, 56)'}} /> :
                                <Link to='/login'>
                                    <LockIcon onClick={this.handleLogOut} style={{color:'rgb(142, 46, 56)'}}/>
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
