import _ from 'lodash'
import {
    Route,
    Redirect
} from "react-router-dom";
import { useRecoilValue } from 'recoil'

function AuthRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                true ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/sign-in",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

export default AuthRoute