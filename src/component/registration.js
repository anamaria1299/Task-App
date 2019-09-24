import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact'
import '../css/login.css'
import React from 'react'

export class Registration extends React.Component {

    submit() {

        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        if(email!=='' && password!=='') {
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('email', email)
            localStorage.setItem('password', password)
        }
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
                                <p className="h5 text-center mb-4">Registration</p>
                                <div className="grey-text">
                                    <MDBInput
                                        id='name'
                                        label="Your name"
                                        icon="user"
                                        group
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right"
                                    />
                                    <MDBInput
                                        id='email'
                                        label="Your email"
                                        icon="envelope"
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
                                    <MDBInput
                                        id='password_repeated'
                                        label="Repeat your password"
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
                                            color='rgb(142, 46, 56)' onClick={this.submit} href='/login'>
                                        Send
                                        <MDBIcon far icon="paper-plane" className="ml-1" />
                                    </MDBBtn>
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
