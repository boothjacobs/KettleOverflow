POST-LUNCH COMMIT: creating .env with database details, working on session secret (.env.example is up to date)


//already exists: Session table, session middleware (app.use)

Routes, validation stuff, views? for login

AUTHORIZATION STEPS
1. path for /user/signup
    --view
    --route
    User enters information

    express validates
    2. validating user input
        --helper functions? to be reused

3. user is created in database

4. user is logged in and redirected to home
    (log out button appears on nav bar?)




Log in

LOG IN PAGE
--username
--password

VALIDATED by express to confirm valid entries
    IF VALID, check database for existing user
    IF USER, persist user login state to session
        checking for a cookie (req.session.auth)




LOG OUT
    delete session cookie
