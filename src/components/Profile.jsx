import React, {useRef, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";
import {Alert, Button, Card, Form} from "react-bootstrap";

const Profile = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const history = useHistory();
    const {currentUser} = useAuth();

    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);
    const {updatePassword, updateEmail} = useAuth();

    function handleSubmit(e) {
        e.preventDefault();
        const updatePromises = [];

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setFormError('Passwords do not match.');
        }

        if (emailRef.current.value !== currentUser.email) {
            updatePromises.push(updateEmail(emailRef.current.value));
        }
        if (passwordRef.current.value) {
            updatePromises.push(updatePassword(passwordRef.current.value));
        }

        setFormError('');
        setLoading(true);
        Promise.all(updatePromises)
            .then(() => {
                history.push('/');
            })
            .catch(() => {
                setFormError('Failed to update account');
            })
            .finally(() => {
                setLoading(false);
            });
    }


    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-2">Update User</h2>
                    {formError && <Alert variant="danger">{formError}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <label htmlFor="email">Email</label>
                            <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                        </Form.Group>


                        <Form.Group id="password">
                            <label htmlFor="password">Password</label>
                            <Form.Control type="password" ref={passwordRef} placeholder="Leave Blank to retain"/>
                        </Form.Group>


                        <Form.Group id="passwordConfirm">
                            <label htmlFor="passwordConfirm">Password Confirmation</label>
                            <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave Blank to retain"/>
                        </Form.Group>

                        <Button type="submit" className="w-100" disabled={loading}>Update Profile</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/">Cancel</Link>
            </div>
        </>
    );
};

export default Profile;
