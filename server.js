// require = require("esm")(module);
// const  = require('node-rpsls').default;
import('node-rpsls').then((module) => {
    const { rps, rpsls } = module
    const minimist = require('minimist')
    const express = require('express')

    const rpsAcceptedShots = [
        'rock',
        'paper',
        'scissors'
    ]

    const rpslsAcceptedShots = [
        'rock',
        'paper',
        'scissors',
        'lizard',
        'spock'
    ]

    const rpsRouter = express.Router({ mergeParams: true })
        .get('/', (req, res) => {
            res.status(200).send(rps())
        })
        .get('/play/', (req, res) => {
            console.log(req.body)
            console.log(req.headers)
            let { shot } = req.body || {}
            shot = shot?.toLowerCase?.() || ''
            // if (!rpsAcceptedShots.includes(shot)) {
            //     res.status(400).send("400 BAD REQUEST")
            //     return;
            // }
            res.status(200).send(rps(shot))
        })
        .get("/play/:shot", (req, res) => {
            let { shot } = req.params
            shot = shot?.toLowerCase?.() || ''
            // if (!rpsAcceptedShots.includes(shot)) {
            //     res.status(400).send("400 BAD REQUEST, not an acceptable shot")
            //     return;
            // }
            res.status(200).send(rps(shot))
        })
    const rpslsRouter = express.Router({ mergeParams: true })
        .get('/', (req, res) => {
            res.status(200).send(rps())
        })
        .get('/play/', (req, res) => {
            let { shot } = req.body || {}
            shot = shot?.toLowerCase?.() || ''
            // if (!rpslsAcceptedShots.includes(shot)) {
            //     res.status(400).send("400 BAD REQUEST, not an acceptable shot")
            //     return;
            // }bean
            res.status(200).send(rpsls(shot))
        })
        .get("/play/:shot", (req, res) => {
            let { shot } = req.params
            shot = shot?.toLowerCase?.() || ''
            // if (!rpslsAcceptedShots.includes(shot)) {
            //     res.status(400).send("400 BAD REQUEST, not an acceptable shot")
            //     return;
            // }
            res.status(200).send(rpsls(shot))
        })

    const appRouter = express.Router({ mergeParams: true })
        .get("/", (req, res) => {
            res.status(200).send('200 OK')
        })
        .use('/rps', rpsRouter)
        .use('/rpsls', rpslsRouter)

    const args = minimist(process.argv.slice(2));
    const PORT = args.port || 5001;

    const app = express()

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use((req, res, next) => {
        // If the Content-Type header is missing, try parsing the request body as URL-encoded form data first
        if (!req.headers['content-type']) {
            try {
                express.urlencoded({ extended: true })(req, res, next);
            } catch (error) {
                // If parsing as URL-encoded form data fails, try parsing as JSON next
                if (error instanceof SyntaxError) {
                    express.json()(req, res, next);
                } else {
                    next(error);
                }
            }
        } else {
            next();
        }
    });

    app.use("/app", appRouter)

    app.use((req, res, next) => {
        res.status(404).send('404 NOT FOUND');
    });

    app.listen(PORT)

})