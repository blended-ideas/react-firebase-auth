import React, {useRef, useState} from 'react';
import {Card, Form, Button, Alert} from "react-bootstrap";
import {useAuth} from "../contexts/AuthContext";
import {Link, useHistory} from "react-router-dom";

const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const history = useHistory();

    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);
    const {signup} = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setFormError('Passwords do not match.');
        }

        try {
            setLoading(true);
            setFormError('');
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push('/login');
        } catch (e) {
            setFormError('Failed to login.');
            setLoading(false);
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-2">Sign Up</h2>
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


                        <Form.Group id="passwordConfirm">
                            <label htmlFor="passwordConfirm">Password Confirmation</label>
                            <Form.Control type="password" ref={passwordConfirmRef} required/>
                        </Form.Group>

                        <Button type="submit" className="w-100" disabled={loading}>Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </>
    );
};

export default Signup;
