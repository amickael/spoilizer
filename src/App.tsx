import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Landing, SharedLog } from './features';

const App = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Landing />
            </Route>
            <Route exact path="/:logId">
                <SharedLog />
            </Route>
        </Switch>
    );
};

export default App;
