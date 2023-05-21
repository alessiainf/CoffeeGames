const http = require('http');   
const fs = require('fs');       
const url = require('url');     
const os = require('os');       
const ip = require('ip');       
const ni = require('network-interfaces');   
const express = require('express');     
const bcrypt = require('bcrypt')   
const { Op, QueryTypes } = require("sequelize");    
const cookierParser = require('cookie-parser') 
const nodemailer = require("nodemailer");    

const dbConnection = require('../database/databaseInit');      
const User = require('../database/models/User');            
const Achievement = require('../database/models/Achievement');           
const ResetQuestion = require('../database/models/ResetQuestion');      
const Contact = require('../database/models/Contact');

const transporter = nodemailer.createTransport({
    service: '',
    auth: {
        user: '',
        pass: ''
    }
});

const serverPort = 51555;
const serverHost1 = '127.0.0.1';        
const serverHost2 = '0.0.0.0';         
var serverHost3 = '';

try{
    serverHost3 = serverHost1;
    console.log("");
    console.log("========================================================");
    console.log("                   Guest User :/");
}catch(err){
    console.log(err);
}

const serverHost0 = serverHost3;
const app = express();
const saltRounds = 10; 
app.use(express.static('./'));       
app.use(express.static('./site/'));     
app.use(express.static('./site/views/'));      
app.use(express.static('./site/stylesheets/'));      
app.use(express.static('./site/javascript/'));      
app.set('views', './site/views/');
app.use(express.json());    
app.use(express.urlencoded({ extended: true }));
app.use(cookierParser());

app.use(async function (request, response, next) {
    
    if (request.cookies['userID'] === undefined || request.cookies.status === undefined) {
      
        response.cookie('userID', 'NULL', {
            expires: new Date(Date.now() + 3600000)      
        })
        response.cookie('status', 'NULL', {
            expires: new Date(Date.now() + 3600000)      
        })
        console.log('Start Cookie created successfully');
    } else {
      
        console.log('Cookie already exists', request.cookies);
        
        try{

            var userRank = await Achievement.findOne({  
                where: {            
                    username: request.cookies['userID']
                }
            });
    
            if(userRank != null){
                levelnew = Math.floor(userRank.xp/10);    
        
                await Achievement.update(
                    {
                        level: levelnew
                    },
                    {
                        where: {            
                            username: userRank.username
                        }
                    }
                )
                console.log('Ok level update');
            }

        } catch (error){
            console.log(error);
            response.redirect("/404");
        }
    
    } 
    next(); 
});

console.log("");
console.log("========================================================");
console.log("=> Booting CoffeGames 1.0.0");
console.log("========================================================");
console.log("CoffeGames Starting on HomePage");
console.log("The HTTP server is listening on");
console.log("        ========================================        ");
console.log("===>          http://" + serverHost0 + ":" + serverPort + "/home" + "        <===");
console.log("        ========================================        ");
console.log("Use => Ctrl-C <= to stop the server");
console.log("========================================================");
dbConnection.sync({ alter: false }).then(() => {           
    console.log("========================================================");
    console.log("The database is setted up :)");
    console.log("========================================================");
});

app.get(['/', '/home'], async (request, response) => {
    console.log("Richiesta Home page", request.cookies);

    if(request.cookies['userID'] != undefined){

        var user = await User.findOne({  
            where: {            
                username: request.cookies['userID']
            }
        });
    }

    var usr5RanksTTT = await Achievement.findAll({
        where:{
            playedGame: "Tic-Tac-Toe"
        },
        order: [
            ['wins', 'DESC']
        ],
        limit: 5
    });

    for(let j = usr5RanksTTT.length; j < 5 ; j++){
        var usr5RanksTTTND = await Achievement.findOne({
            where: {
                username: "not.defined"
            }
        });
        usr5RanksTTT.push(usr5RanksTTTND);
    }

    var usr5RanksMS = await Achievement.findAll({
        where:{
            playedGame: "ms"
        },
        order: [
            ['wins', 'DESC']
        ],
        limit: 5
    });

    for(let j = usr5RanksMS.length; j < 5 ; j++){
        var usr5RanksMSND = await Achievement.findOne({
            where: {
                username: "not.defined"
            }
        });
        usr5RanksMS.push(usr5RanksMSND);
    }

    var usr5RanksC4 = await Achievement.findAll({
        where:{
            playedGame: "Connect-4"
        },
        order: [
            ['wins', 'DESC']
        ],
        limit: 5
    });

    for(let j = usr5RanksC4.length; j < 5 ; j++){
        var usr5RanksC4ND = await Achievement.findOne({
            where: {
                username: "not.defined"
            }
        });
        usr5RanksC4.push(usr5RanksC4ND);
    }

    if(user != null && request.cookies['status'] === 'LOGGED'){
            
        response.render('indexHome.ejs', {successLogin: true, usr5RanksTTT: usr5RanksTTT, usr5RanksMS: usr5RanksMS, usr5RanksC4: usr5RanksC4});
    }
    else{
        response.render('indexHome.ejs', {successLogin: false, usr5RanksTTT: usr5RanksTTT, usr5RanksMS: usr5RanksMS, usr5RanksC4: usr5RanksC4});
    }
    
});

app.get('/account', async (request, response) => {
    console.log("Richiesta SignUp page", request.cookies);

    if(request.cookies['userID'] != undefined){

        var usrSess = await User.findOne({  
            where: {            
                username: request.cookies['userID']
            }
        });
    }

    if(usrSess != null && request.cookies['status'] === 'LOGGED'){

        var usr5Ranks = await Achievement.findAll({
            where: {
                playedGame: "GLOBAL"
            },
            order: [
                ['wins', 'DESC']
            ],
            limit: 5
        });

        for(let j = usr5Ranks.length; j < 5 ; j++){
            var usr5RanksND = await Achievement.findOne({
                where: {
                    username: "not.defined",
                    playedGame: "GLOBAL"
                }
            });
            usr5Ranks.push(usr5RanksND);
        }

        var usr5List = await Achievement.findAll({
            attributes: [
                'username'
            ],
            order: [
                ['wins', 'DESC']
            ],
            limit: 5,
            raw: true,
        });

        var usr5ListStr = [];

        for(let i = 0; i < usr5List.length; i++){
            if(usr5List[i] != null){
                usr5ListStr.push(usr5List[i].username);
            }
        }

        var usr5 = await User.findAll({
            where:{
                username: {
                    [Op.in]: usr5ListStr
                }
            }
        });

        for(let j = usr5.length; j <= 5 ; j++){
            var usr5ND = await User.findOne({
                where: {
                    username: "not.defined"
                }
            });
            usr5.push(usr5ND);
        }

        var usrSessRank = await Achievement.findOne({
            where: {
                username: usrSess.username,
                playedGame: "GLOBAL"
            }            
        }); 

        response.render('indexAccount.ejs', { 
            usrSess: usrSess,
            usrSessRank: usrSessRank, 
            usr5Ranks: usr5Ranks,
            usr5: usr5
        });
    }
    else{
        response.redirect('/home');
    }
});

app.get('/login', (request, response) => {
    console.log("Richiesta Login page", request.cookies);

    if(request.cookies['status'] == 'NULL' || request.cookies['status'] == 'LOGOUT' || request.cookies['status'] == 'SIGNIN'){
        response.render('indexLogin.ejs', { loginError: false, chekPswError: false });
    }
    else{
        response.redirect('/home');
    }
    
});

app.get('/signup', (request, response) => {
    console.log("Richiesta SignUp page", request.cookies);

    if(request.cookies['userID'] == 'NULL'){
        response.render('indexSignUp.ejs', { signupError: false, chekPswError: false });
    }
    else{
        response.redirect('/home');
    }

});

app.get('/reset', async (request, response) => {
    console.log("Richiesta Reset password page", request.cookies);

    if(request.cookies['userID'] != undefined){

        var user = await User.findOne({  
            where: {            
                username: request.cookies['userID']
            }
        });
    }

    if(user != null && request.cookies['status'] === 'LOGGED'){

        const question = await ResetQuestion.findOne({     
            where: {            
                idQuestion: user.resetQuestion
            }
        })

        response.render('indexReset.ejs', {chekPswError: false, chekCodeError: false, resetQuestion: question.question });
    }
    else{
        response.redirect('/login');
    }

});

app.get('/forget', (request, response) => {
    console.log("Richiesta Forget page", request.cookies);

    if(request.cookies['status'] == 'NULL' || request.cookies['status'] == 'LOGOUT' || request.cookies['status'] == 'SIGNIN'){
        response.render('indexForgotten.ejs', { loginError: false, chekCodeError: false, resetQuestion: "Domanda di Sicurezza" });
    }
    else{
        response.redirect('/home');
    }
    
});

app.get('/contacts', async (request, response) => {
    console.log("Richiesta Contacts page", request.cookies);

    if(request.cookies['userID'] != undefined){

        var user = await User.findOne({  
            where: {            
                username: request.cookies['userID']
            }
        });
    }

    if(user != null && request.cookies['status'] === 'LOGGED'){
            
        response.render('indexContacts.ejs', { successLogin: true, cntsName: user.username, cntsEmail: user.email });
    }
    else{
        response.render('indexContacts.ejs', { successLogin: false, cntsName: "", cntsEmail: "" });
    }
    
});

app.get('/games', (request, response) => {
    console.log("Richiesta Games page", request.cookies);
    response.redirect('/home#games');
});

app.get('/tic-tac-toe', async (request, response) => {
    console.log("Richiesta Tic-Tac-Toe page", request.cookies);

    if(request.cookies['userID'] != undefined){

        var user = await User.findOne({  
            where: {            
                username: request.cookies['userID']
            }
        });

        var userRank = await Achievement.findOne({  
            where: {            
                username: request.cookies['userID']
            }
        });
    }

    if(user != null && request.cookies['status'] === 'LOGGED'){
            
        response.render('tic-tac-toe.ejs', { successLogin: true, user: user, userRank: userRank});
    }
    else{
        response.render('tic-tac-toe.ejs', { successLogin: false, user: "", userRank: ""});
    }
});

app.get('/connect-4', async (request, response) => {
    console.log("Richiesta Connect-4 page", request.cookies);
    
    if(request.cookies['userID'] != undefined){

        var user = await User.findOne({  
            where: {            
                username: request.cookies['userID']
            }
        });

        var userRank = await Achievement.findOne({  
            where: {            
                username: request.cookies['userID']
            }
        });
    }

    if(user != null && request.cookies['status'] === 'LOGGED'){
            
        response.render('connect-4.ejs', { successLogin: true, user: user, userRank: userRank});
    }
    else{
        response.render('connect-4.ejs', { successLogin: false, user: "", userRank: ""});
    }
});

app.get('/minesweeper/easy', async (request, response) => {
    console.log("Richiesta Minesweeper Easy page", request.cookies);
    
    if(request.cookies['userID'] != undefined){

        var user = await User.findOne({  
            where: {            
                username: request.cookies['userID']
            }
        });

        var userRank = await Achievement.findOne({  
            where: {            
                username: request.cookies['userID']
            }
        });
    }

    if(user != null && request.cookies['status'] === 'LOGGED'){
            
        response.render('msEasy.ejs', { successLogin: true, user: user, userRank: userRank});
    }
    else{
        response.render('msEasy.ejs', { successLogin: false, user: "", userRank: ""});
    }
});

app.get('/minesweeper/normal', async (request, response) => {
    console.log("Richiesta Minesweeper Normal page", request.cookies);

    if(request.cookies['userID'] != undefined){

        var user = await User.findOne({  
            where: {            
                username: request.cookies['userID']
            }
        });

        var userRank = await Achievement.findOne({  
            where: {            
                username: request.cookies['userID']
            }
        });
    }

    if(user != null && request.cookies['status'] === 'LOGGED'){
            
        response.render('msNormal.ejs', { successLogin: true, user: user, userRank: userRank});
    }
    else{
        response.render('msNormal.ejs', { successLogin: false, user: "", userRank: ""});
    }
});

app.get('/minesweeper/hard', async (request, response) => {
    console.log("Richiesta Minesweeper Hard page", request.cookies);
    
    if(request.cookies['userID'] != undefined){

        var user = await User.findOne({  
            where: {            
                username: request.cookies['userID']
            }
        });

        var userRank = await Achievement.findOne({  
            where: {            
                username: request.cookies['userID']
            }
        });
    }

    if(user != null && request.cookies['status'] === 'LOGGED'){
            
        response.render('msHard.ejs', { successLogin: true, user: user, userRank: userRank});
    }
    else{
        response.render('msHard.ejs', { successLogin: false, user: "", userRank: ""});
    }
});

app.get('/minesweeper/rr', async (request, response) => {
    console.log("Richiesta Minesweeper RR page", request.cookies);
    
    if(request.cookies['userID'] != undefined){

        var user = await User.findOne({  
            where: {            
                username: request.cookies['userID']
            }
        });

        var userRank = await Achievement.findOne({  
            where: {            
                username: request.cookies['userID']
            }
        });

    }

    if(user != null && request.cookies['status'] === 'LOGGED'){
            
        response.render('msRR.ejs', { successLogin: true, user: user, userRank: userRank});
    }
    else{
        response.render('msRR.ejs', { successLogin: false, user: "", userRank: ""});
    }
});

app.post('/signup', async (request, response) => {

    console.log("Recived data from signup form");
    console.log(request.body);  
    console.log("========================================================");

    try{
        var user = await User.findOne({     
            where: {
                [Op.or]: [            
                    {email: request.body.signupEmail},
                    {username: request.body.signupUser}
                ]
            }
        });

        if(user != null){
            console.log('User already exist');
            response.render('indexSignUp.ejs', { signupError: true, chekPswError: false });
            return;
        }
        else{
            console.log('New user');
        }

    } catch (error){
        console.log(error);
        response.redirect("/404");
    }

    if(request.body.signupPassword === request.body.signupPasswordCheck && !(response.headersSent)){

        try{
            const hashedPassword = await bcrypt.hash(request.body.signupPassword, saltRounds);
            const hashedResetResponse= await bcrypt.hash(request.body.signupResponse, saltRounds);   
            User.create({
                username: request.body.signupUser,   
                email: request.body.signupEmail,            
                password: hashedPassword,
                resetQuestion: request.body.signupQuestion,
                resetResponse: hashedResetResponse
            }).then(() => {
                console.log('User created on Users');
            });
            Achievement.create({
                username: request.body.signupUser
            }).then(() => {
                console.log('User created on Archivements');
            });

            response.cookie('userID', 'NULL', {
                expires: new Date(Date.now() + 3600000)      
            })
            response.cookie('status', 'SIGNIN', {
                expires: new Date(Date.now() + 3600000)      
            })

            response.redirect("/login");

        } catch (error){
            console.log(error);
            response.redirect("/404");
        }
    }
    else{
        console.log("No match password check");
        response.render('indexSignUp.ejs', { signupError: false, chekPswError: true });
    }

})

app.post('/login', async (request, response) => {
    
    console.log("Recived data from login form");
    console.log(request.body);  
    console.log("========================================================");

    try{
        var user = await User.findOne({     
            where: {            
                username: request.body.loginUser
            }
        });
        
        if(user != null){
            const validPswHash = await bcrypt.compare(request.body.loginPassword, user.password);
            if(validPswHash){
                console.log('User Logged Successfully');
                response.cookie('userID', user.username, {
                    expires: new Date(Date.now() + 3600000)      
                })
                response.cookie('status', 'LOGGED', {
                    expires: new Date(Date.now() + 3600000)      
                })
                console.log('User Cookie Created Successfully');
                response.redirect("/home");
            }
            else{
                console.log('Wrong password');
                response.render('indexLogin.ejs', { loginError: false, chekPswError: true });
            }
        }
        else{
            console.log('User not found');
            response.render('indexLogin.ejs', { loginError: true, chekPswError: false });
        }

    } catch (error){
        console.log(error);
        response.redirect("/404");
    }
})

app.post('/reset', async (request, response) => {

    console.log("Recived data from login form");
    console.log(request.body);  
    console.log("========================================================");

    try{
        var user = await User.findOne({     
            where: {            
                username: request.cookies['userID']
            }
        });
        
        if(user != null){

            const question = await ResetQuestion.findOne({     
                where: {            
                    idQuestion: user.resetQuestion
                }
            })

            const validPswHash = await bcrypt.compare(request.body.resetOldPassword, user.password);
            if(validPswHash){
                console.log('Ok old password');
                const validResetResponseHash = await bcrypt.compare(request.body.resetQuestResponse, user.resetResponse);
                if(validResetResponseHash){
                    console.log('Ok reset response');
                    const hashedPassword = await bcrypt.hash(request.body.resetNewPassword, saltRounds);
                    await User.update(
                        {
                            password: hashedPassword
                        },
                        {
                            where: {            
                                username: request.cookies['userID']
                            }
                        }
                    )
                    console.log('Ok reset password');
                    response.redirect('/login');
                }
                else{
                    console.log('Wrongh reset code');
                    response.render('indexReset.ejs', {chekPswError: false, chekCodeError: true, resetQuestion: question.question });
                }
            }
            else{
                console.log('Wrongh old password');
                response.render('indexReset.ejs', {chekPswError: true, chekCodeError: false, resetQuestion: question.question });
            }
        }
        else{
            console.log('User not found');
            response.render('indexReset.ejs', {chekPswError: false, chekCodeError: false, resetQuestion: "" });
        }

    } catch (error){
        console.log(error);
        response.redirect("/404");
    }
});

app.post('/forget', async (request, response) => {

    console.log("Recived data from forget form");
    console.log(request.body);  
    console.log("========================================================");

    try{
        var user = await User.findOne({     
            where: {            
                email: request.body.forgetEmail
            }
        });
        
        if(user != null){

            console.log("User found");

            const question = await ResetQuestion.findOne({     
                where: {            
                    idQuestion: user.resetQuestion
                }
            })

            const validResetResponseHash = await bcrypt.compare(request.body.forgetQuestResponse, user.resetResponse);
            if(validResetResponseHash){
                console.log('Ok reset response');
                const hashedPassword = await bcrypt.hash(request.body.forgetNewPassword, saltRounds);
                await User.update(
                    {
                        password: hashedPassword
                    },
                    {
                        where: {            
                            email: request.body.forgetEmail
                        }
                    }
                )
                console.log('Ok reset password');
                response.redirect('/login');
            }
            else{
                console.log('Wrong reset code');
                response.render('indexForgotten.ejs', { loginError: false, chekCodeError: true, resetQuestion: question.question });
            }
        }
        else{
            console.log('User not found');
            response.render('indexForgotten.ejs', { loginError: true, chekCodeError: false, resetQuestion: "" });
        }

    } catch (error){
        console.log(error);
        response.redirect("/404");
    }

});

app.post('/contacts', async (request, response) => {
    
    console.log("Recived data from contact form");
    console.log(request.body);  
    console.log("========================================================");

    try{
        
        Contact.create({
            name: request.body.contactsName,   
            email: request.body.contactsEmail,            
            message: request.body.contactsMessaggio
        }).then(() => {
            console.log('Contact acquired');
            response.redirect("/home");
        });  

        var  mailOptions = {
            from: 'customer.service@coffegames.com',
            to: request.body.contactsEmail,
            subject: 'CoffeGames Form contacts',
            attachments: [
                {
                    filename: 'banneraccount.png',
                    path: process.cwd() + '/site/assets/images/banneraccountcrop.png',
                    cid: 'banneraccount@cid'
                }
            ],
            html: `<!doctype html>
                    <html lang="en">
                        <head>
                            <meta name="kewords" content="HTML, meta-informazione">
                            <meta name="author" content="Robe-con-Internet">
                            <meta name="generator" content="VSCode">
                            <meta charset="UTF-8"/>
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <style>
                                .card {
                                    position: relative;
                                    display: flex;
                                    flex-direction: column;
                                    width: 50%;
                                    word-wrap: break-word;
                                    background-clip: border-box;
                                    border-radius: 10px;
                                    border-color: #4a0c85;
                                    border: 5px solid;
                                }
                    
                                .card-body {
                                    flex: 1 1 auto;
                                    padding: 20px;
                                    background-color: #0d0349;
                                    color: #ffffff;
                                    border-radius-right: 20px;
                                    position: center;
                                }
                    
                                .card-title {
                                    margin-bottom: var(--bs-card-title-spacer-y);
                                    font-size: var(--bs-card-title-font-size);
                                }
                    
                                .card-text{
                                    margin-bottom: 0;
                                    color: #ffffff;
                                }
                                .card-img-top {
                                    width: 50%;
                                    height: 50%;
                                    border-radius-left: 20px;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="card">
                                <img src="cid:banneraccount@cid" class="card-img-top">
                                <div class="card-body">
                                    <h3 class="card-title" id="name">Ciao,</h3>
                                    <h4 class="card-text">Il messaggio che hai inviato è stato ricevuto correttamente. Ti risponderemo al più presto.</h4>
                                    <h5 class="card-text"><small class="text">Il team di CoffeGames</small></h5>
                                </div>
                            </div>
                        </body>
                    </html>`,
            };
        
        transporter.sendMail(mailOptions, function(error, info){

            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            
        });

    } catch (error){
        console.log(error);
        
    }
    
});

app.post('/account/userchange', async (request, response) => {
    
    console.log("Recived data from account change username form");
    console.log(request.body);  
    console.log("========================================================");

    try{
        
        await User.update(
            {
                username: request.body.accountNameChange
            },
            {
                where: {            
                    username: request.cookies['userID']
                }
            }
        )

        await Achievement.update(
            {
                username: request.body.accountNameChange
            },
            {
                where: {            
                    username: request.cookies['userID']
                }
            }
        )

        console.log('Ok change username');
        response.cookie('userID', request.body.accountNameChange, {
            expires: new Date(Date.now() + 3600000)      
        })
        response.cookie('status', 'LOGGED', {
            expires: new Date(Date.now() + 3600000)      
        })
        response.redirect('/account');

    } catch (error){
        console.log(error);
        response.redirect("/404");
    }
    
});

app.post('/account/iconchange', async (request, response) => {
    
    console.log("Recived data from account change icon form");
    console.log(request.body);  
    console.log("========================================================");

    try{
        if(request.body.dot != 'NULL'){
        
            await User.update(
                {
                    icon: request.body.dot
                },
                {
                    where: {            
                        username: request.cookies['userID']
                    }
                }
            )
            console.log('Ok change icon');
        }else{
            console.log('Non change icon');
        }

        response.cookie('userID', request.cookies['userID'], {
            expires: new Date(Date.now() + 3600000)      
        })
        response.cookie('status', 'LOGGED', {
            expires: new Date(Date.now() + 3600000)      
        })

        response.redirect('/account');

    } catch (error){
        console.log(error);
        response.redirect("/404");
    }
    
});

app.post('/account/backgroundchange', async (request, response) => {
    
    console.log("Recived data from account change background form");
    console.log(request.body);  
    console.log("========================================================");

    try{
        
        await User.update(
            {
                background: request.body.bgValue
            },
            {
                where: {            
                    username: request.cookies['userID']
                }
            }
        )
        console.log('Ok change background');

        response.cookie('userID', request.cookies['userID'], {
            expires: new Date(Date.now() + 3600000)      
        })
        response.cookie('status', 'LOGGED', {
            expires: new Date(Date.now() + 3600000)      
        })

        response.redirect('/account');

    } catch (error){
        console.log(error);
        response.redirect("/404");
    }

});

app.get('/logout', async (request, response) => {

    
    console.log("Logout request"); 
    console.log("========================================================");

    try{
        response.cookie('userID', 'NULL', {
            expires: new Date(Date.now() + 3600000)      
        })
        response.cookie('status', 'LOGOUT', {
            expires: new Date(Date.now() + 3600000)      
        })
        response.redirect("/home");
    } catch (error){
        console.log(error);
        response.redirect("/404");
    }

})

app.post('/account/delete', async (request, response) => {

    console.log("Delete account request"); 
    console.log("========================================================");

    try{
        var user = await User.findOne({     
            where: {            
                username: request.cookies['userID']
            }
        });
        
        if(user != null){

            console.log("User found");

            await User.destroy(
                {
                    where: {            
                        username: request.cookies['userID']
                    }
                }
            )
            await Achievement.destroy(
                {
                    where: {            
                        username: request.cookies['userID']
                    }
                }
            )
            console.log('Ok delete account');

            response.cookie('userID', 'NULL', {
                expires: new Date(Date.now() + 3600000)      
            })
            response.cookie('status', 'NULL', {
                expires: new Date(Date.now() + 3600000)      
            })
            response.redirect("/home");
        }
        else{
            console.log('User not found');
            response.redirect("/home");
        }

    } catch (error){
        console.log(error);
        response.redirect("/404");
    }

})

app.post('/games/result', async (request, response) => {
    
    console.log("========================================================");
    console.log("Recived data from ended games");
    console.log(request.body);  
    console.log("========================================================");

    try{

        var user = await User.findOne({  
            where: {            
                username: request.cookies['userID']
            }
        });

        var userRankG = await Achievement.findOne({  
            where: {            
                username: request.cookies['userID'],
                playedGame: request.body.game
            }
        });

        var userRankU = await Achievement.findOne({  
            where: {            
                username: request.cookies['userID'],
                playedGame: "GLOBAL"
            }
        });

        if(userRankG == null){
            await Achievement.create({
                username: request.cookies['userID'],
                playedGame: request.body.game
            }).then(async () => {
                userRankG = await Achievement.findOne({  
                    where: {            
                        username: request.cookies['userID'],
                        playedGame: request.body.game
                    }
                });
                userRankU = await Achievement.findOne({  
                    where: {            
                        username: request.cookies['userID'],
                        playedGame: "GLOBAL"
                    }
                });
            });
        }
        
        if(user != null){

            console.log("User found");

            switch(request.body.result) {

                case 'win':
                    await Achievement.update(
                        {
                            wins: (userRankG.wins + 1),
                            xp: (userRankG.xp + 5)
                        },
                        {
                            where: {            
                                username: user.username,
                                playedGame: request.body.game
                            }
                        }
                    );
                    await Achievement.update(
                        {
                            wins: (userRankU.wins + 1),
                            xp: (userRankU.xp + 5)
                        },
                        {
                            where: {            
                                username: user.username,
                                playedGame: "GLOBAL"
                            }
                        }
                    );
                    console.log('Progress inserted');  
                break;

                case 'lose':
                    await Achievement.update(
                        {
                            loses: (userRankG.loses + 1),
                            xp: (userRankG.xp + 1)
                        },
                        {
                            where: {            
                                username: user.username,
                                playedGame: request.body.game
                            }
                        }
                    )
                    await Achievement.update(
                        {
                            loses: (userRankU.loses + 1),
                            xp: (userRankU.xp + 1)
                        },
                        {
                            where: {            
                                username: user.username,
                                playedGame: "GLOBAL"
                            }
                        }
                    )
                    console.log('Progress inserted');
                break;

                case 'drow':
                    await Achievement.update(
                        {
                            drows: (userRankG.drows + 1),
                            xp: (userRankG.xp + 3)
                        },
                        {
                            where: {            
                                username: user.username,
                                playedGame: request.body.game
                            }
                        }
                    )
                    await Achievement.update(
                        {
                            drows: (userRankU.drows + 1),
                            xp: (userRankU.xp + 3)
                        },
                        {
                            where: {            
                                username: user.username,
                                playedGame: "GLOBAL"
                            }
                        }
                    )
                    console.log('Progress inserted'); 
                break;

            default:
                    console.log('No result');
            }
        }else{
            console.log('User not found');
        }
        
    } catch (error){
        console.log(error);
        response.redirect("/404");
    }
    
});

app.all('*', (request, response) => {
    response.sendFile('404.html', { root: "." + "/public" });
});

app.get('/404', (request, response) => {
    response.sendFile('404.html', { root: "." + "/public" });
});

app.listen({
    host: serverHost0,
    port: serverPort,
});



