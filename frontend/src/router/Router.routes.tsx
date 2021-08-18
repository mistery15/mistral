import React from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Home from '../features/home/Home';

import { MainLayout } from '../library/layout';

export interface RouteType {
    name: string,
    link: string,
    component: React.FunctionComponent
}
const routes: RouteType[] = [
    {
        name: 'Movies',
        link: '/movies',
        component: Home
    },
];
const Router = () => {
    return (
        <Switch>
            <MainLayout>
                {routes.map(route => {
                    return <Route exact key={route.link} path={route.link} component={route.component} />;
                })}
                <Route path="/" exact component={Home} />
                <Redirect to="/movies" />
            </MainLayout>
        </Switch>
    );
};

export { Router, routes };