import React, {useRef, useState} from 'react';
import {Alert, Button, Card, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

const ForgotPassword = () => {
    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const {resetPassword} = useAuth();

    const emailRef = useRef();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);
            setFormError('');
            await resetPassword(emailRef.current.value);
            setMessage('Check your Inbox for further instructions.');
        } catch (e) {
            setFormError('Failed to send password reset mail.');
            setLoading(false);
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-2">Forgot Password</h2>
                    {formError && <Alert variant="danger">{formError}</Alert>}
                    {message && <Alert variant="info">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <label htmlFor="email">Email</label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>

                        <Button type="submit" className="w-100" disabled={loading}>Reset Password</Button>
                    </Form>

                    <div className="w-100 mt-3 text-center">
                        <Link to="/login">Login</Link>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default ForgotPassword;
