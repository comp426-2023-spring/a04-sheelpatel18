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
        .get('/play', (req, res) => {
                let { shot } = req.body || {}
                console.log(shot)
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
    const rpslsRouter = express.Router({ mergeParams: true})
        .get('/', (req, res) => {
            res.status(200).send(rps())
        })
        .get('/play', (req, res) => {
                let { shot } = req.body || {}
                shot = shot?.toLowerCase?.() || ''
                // if (!rpslsAcceptedShots.includes(shot)) {
                //     res.status(400).send("400 BAD REQUEST, not an acceptable shot")
                //     return;
                // }
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

    const appRouter = express.Router({ mergeParams: true})
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
    app.use("/app", appRouter)
    
    app.use((req, res, next) => {
        res.status(404).send('404 NOT FOUND');
      });

    app.listen(PORT)

})