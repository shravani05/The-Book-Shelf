import React from 'react';
import {Switch, BrowserRouter, Route} from 'react-router-dom';

import Home from './components/Home/index';
import Login from './components/Users/login';
import Logout from './components/Users/logout';
import Article from './components/Article';

//Admin
import Admin from './components/Users/Admin';
import AdddPosts from './components/Users/Admin/Posts/add';
import EditPost from './components/Users/Admin/Posts/edit';
import AdminPosts from './components/Users/Admin/Posts/posts';

//HOC
import MainLayout from './hoc/mainLayout';
import Auth from './hoc/auth';



const Routes = () => {
    return(
        <BrowserRouter>
            <MainLayout>
                <Switch>
                    <Route path = "/admin/posts/edit/:id" component = {Auth(EditPost, true)}/>
                    <Route path = "/admin/posts/create" component = {Auth(AdddPosts, true)}/>
                    <Route path = "/admin/posts" component = {Auth(AdminPosts, true)}/>
                    <Route path = "/article/:id" component = {Auth(Article)}/>
                    <Route path = "/admin" component = {Auth(Admin, true)}/>
                    <Route path = "/logout" component = {Auth(Logout, true)}/>
                    <Route path = "/login" component = {Auth(Login, false)}/>
                    <Route path = "/" component = {Auth(Home)}/>
                </Switch>
            </MainLayout>
        </BrowserRouter>
    )
}

export default Routes;