import Signup from "./signup";
import {Container} from "react-bootstrap";
import {AuthProvider} from "../contexts/AuthContext";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import Profile from "./Profile";

function App() {
    return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100">
            <div className="w-100" style={{maxWidth: '400px'}}>
                <Router>
                    <AuthProvider>
                        <Switch>
                            <Route path="/sign-up" component={Signup}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/forgot-password" component={ForgotPassword}/>
                            <PrivateRoute exact path="/" component={Dashboard}/>
                            <PrivateRoute exact path="/update-profile" component={Profile}/>
                        </Switch>
                    </AuthProvider>
                </Router>
            </div>
        </Container>
    );
}

export default App;
