import { Suspense } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import AuthRoute from './AuthRoute'
import Standard from '../components/template/standard'
import SignIn from '../components/main/sign-in'
import Dashboard from '../components/main/dashboard'

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Router>
                <div>
                    <Switch>
                        <Route path="/sign-in">
                            <SignIn />
                        </Route>
                        <AuthRoute path="/dashboard">
                            <Standard>
                                <Route exact path="/dashboard">
                                    <Dashboard />
                                </Route>
                            </Standard>
                        </AuthRoute>
                        <Route path="/">
                            <Redirect to={"/sign-in"} />
                        </Route>
                    </Switch>
                </div>
            </Router >
        </Suspense>
    );
}

export default App;
