import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid/Grid';


class LoginPage extends React.Component {


    render() {
        return (
            <div>
                <Grid container direction="column" alignItems="center">
                    <Form>
                    <Grid item xs={12}>
                        <Form.Label>Sign In!</Form.Label>
                    </Grid>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit" href="/homepage">
                            Submit
                 </Button>
                    </Form>
                </Grid>
            </div>
        );
    }
}
export default LoginPage; 