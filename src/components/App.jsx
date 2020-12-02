import Signup from "./signup";
import {Container} from "react-bootstrap";
import {AuthProvider} from "../contexts/AuthContext";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {
    return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100">
            <div className="w-100" style={{maxWidth: '400px'}}>
                <Router>
                    <AuthProvider>
                        <Switch>
                            <Route path="/sign-up" component={Signup}/>
                            <Route exact path="/" component={Dashboard}/>
                            <Route path="/login" component={Login}/>
                        </Switch>
                    </AuthProvider>
                </Router>
            </div>
        </Container>
    );
}

export default App;