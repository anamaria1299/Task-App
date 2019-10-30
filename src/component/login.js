import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact'
import '../css/login.css'
import React from 'react'
import {Link} from "react-router-dom";
import * as axios from "axios";

export class Login extends React.Component {

    submit() {

        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        console.log('on submit')

        axios.post('https://task-app-ana-api.herokuapp.com/users/login', {
            name: email,
            email: email,
            password: password
        })
        .then(function (response) {
            console.log(response.data);
            localStorage.setItem("accessToken",response.data.accessToken);
            localStorage.setItem("isLoggedIn", true);
            window.location.href = "/app";
        })
        .catch(function (error) {
            alert("Failed when try to login");
            console.log(error);
        });
    }

    render() {

        return (
            <div className="bg">
                <MDBContainer style={{width: '75%'}}>
                    <MDBRow>
                        <MDBCol sm="3"/>
                        <MDBCol sm="6" style={{marginTop: '30%',
                            backgroundColor: 'rgba(255, 255, 255, 0.76)',
                            'borderRadius': '46px'}}>
                            <form>
                                <br/>
                                <p className="h5 text-center mb-4">Log in</p>
                                <div className="grey-text">
                                    <MDBInput
                                        id='email'
                                        label="Your email"
                                        icon="user"
                                        group
                                        type="email"
                                        validate
                                        error="wrong"
                                        success="right"
                                    />
                                    <MDBInput
                                        id='password'
                                        label="Your password"
                                        icon="lock"
                                        group
                                        type="password"
                                        validate
                                        error="wrong"
                                        success="right"
                                    />
                                </div>
                                <div className="text-center">
                                    <MDBBtn style={{background:'rgb(142, 46, 56)', 'borderRadius': '46px', color: 'white'}}
                                            color='rgb(142, 46, 56)' onClick={this.submit}>
                                        Send
                                        <MDBIcon far icon="paper-plane" className="ml-1" />
                                    </MDBBtn>
                                    <br/><br/>
                                    <Link to='/registration' style={{color:'rgba(74, 16, 22, 0.81)'}}>
                                        you want to register you
                                    </Link>
                                    <br/>
                                    <br/>
                                </div>
                            </form>
                        </MDBCol>
                        <MDBCol sm="3"/>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}
