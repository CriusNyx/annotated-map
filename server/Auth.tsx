import API from './API';
import express from 'express';

function validatePasswordLogin(request : API.ValidatePasswordLoginRequest) : API.ValidatePasswordLoginResponse{
    return {};
}

function validateLinkLogin(request: API.ValidateLinkLoginRequest) : API.ValidateLinkLoginResponse{
    return {};
}

function generateLinkLoginRequest(request: API.GenerateLinkLoginRequest) : API.GenerateLinkLoginResponse{
    return {link: ''};
}

function bindEndpoints(app: any){
    app.get('/api/validatePasswordLogin', (req, res) => {
        console.log('validatePasswordLogin' + JSON.stringify(Object.keys(req)));
    });
    app.get('/api/validateLinkLogin', (req, res) => {
        console.log('validateLinkLogin' + JSON.stringify(Object.keys(req)));
    });
    app.get('/api/generateLinkLoginRequest', (req, res) => {
        console.log('generateLinkLoginRequest' + JSON.stringify(Object.keys(req)));
    });
}

export default {bindEndpoints};