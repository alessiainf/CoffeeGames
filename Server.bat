@ECHO OFF
CLS

:MENU
CLS
ECHO ===================================================
ECHO                Robe-con-Internet-LTW
ECHO ===================================================
ECHO    Options available:
ECHO        1. Start server with NodeJS Nodemon
ECHO        2. Seed Database
ECHO        3. [Not available]
ECHO        4. Install NPM Dependencies
ECHO        5. Install NodeJs v18.15.0
ECHO        6. Quit
ECHO ===================================================


CHOICE /C 123456 /N /M "Select an option => "

IF ERRORLEVEL 6 GOTO QUIT
IF ERRORLEVEL 5 GOTO INSTALLNODE
IF ERRORLEVEL 4 GOTO INSTALLDEP
IF ERRORLEVEL 3 GOTO ALLNI
IF ERRORLEVEL 2 GOTO SEEDDB
IF ERRORLEVEL 1 GOTO STARTNDEMJS
IF NOT ERRORLEVEL 0 GOTO MENU

:SEEDDB
ECHO Start sedding database
cd database
npx sequelize-cli db:seed --seed mainSeed
PAUSE
GOTO MENU

:STARTNDEMJS
ECHO Starting server with NodeJS Nodemon
npm run initServerDm
PAUSE
GOTO MENU

:ALLNI
ECHO [Choice not available]
PAUSE
GOTO MENU

:INSTALLDEP
ECHO Installation of NodeJS Dependencies
npm install
PAUSE 
GOTO MENU

:INSTALLNODE
ECHO Installation of NodeJS LTS v18.15.0 (includes npm 9.5.0)
.\node-v18.15.0-x64\node-v18.15.0-x64.msi
PAUSE
GOTO MENU

:QUIT
ECHO ===================================================
ECHO                        END
ECHO ===================================================
PAUSE

CLS
@ECHO ON