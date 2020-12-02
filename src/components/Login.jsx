import React, {useRef, useState} from 'react';
import {useAuth} from "../contexts/AuthContext";
import {Alert, Button, Card, Form} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();

    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);
            setFormError('');
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch (e) {
            setFormError('Failed to login.');
            setLoading(false);
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-2">Login</h2>
                    {formError && <Alert variant="danger">{formError}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <label htmlFor="email">Email</label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>


                        <Form.Group id="password">
                            <label htmlFor="password">Password</label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>

                        <Button type="submit" className="w-100" disabled={loading}>Login</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                New User? <Link to="/sign-up">Sign Up</Link>
            </div>
        </>
    );
};

export default Login;
