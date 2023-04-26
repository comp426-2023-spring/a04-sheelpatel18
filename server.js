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

    const rpsRouter = express.Router({ mergeParams: true})
        .get('/', (req, res) => {
            res.status(200).send(rps())
        })
        .post('/play', (req, res) => {
            if (req.is('json') || req.is('application/x-www-form-urlencoded')) {
                const { shot } = req.body || {}
                if (!rpsAcceptedShots.includes(shot)) {
                    res.status(400).send()
                    return;
                }
                res.status(200).send(rps(shot))
             } else {
                res.status(400).send()
            }
        })
        .post("/play/:shot", (req, res) => {
            const { shot } = req.params
            if (!rpsAcceptedShots.includes(shot)) {
                res.status(400).send()
                return;
            }
            res.status(200).send(rps(shot))
        })
    const rpslsRouter = express.Router({ mergeParams: true})
        .get('/', (req, res) => {
            res.status(200).send(rps())
        })
        .post('/play', (req, res) => {
            if (req.is('json') || req.is('application/x-www-form-urlencoded')) {
                const { shot } = req.body || {}
                if (!rpslsAcceptedShots.includes(shot)) {
                    res.status(400).send()
                    return;
                }
                res.status(200).send(rpsls(shot))
            } else {
                res.status(400).send()
            }
        })
        .post("/play/:shot", (req, res) => {
            const { shot } = req.params
            if (!rpslsAcceptedShots.includes(shot)) {
                res.status(400).send()
                return;
            }
            res.status(200).send(rpsls(shot))
        })

    const appRouter = express.Router({ mergeParams: true})
        .get("/", (req, res) => {
            res.status(200).send()
        })
        .use('/rps', rpsRouter)
        .use('/rpsls', rpslsRouter)

    const args = minimist(process.argv.slice(2));
    const PORT = args.port || 5001;

    const app = express()

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use("/app", appRouter)
    
    app.use((req, res, next) => {
        res.status(404).send("Sorry, that route doesn't exist.");
      });

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })

})