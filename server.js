// require = require("esm")(module);

const { parse } = require('path')

// const  = require('node-rpsls').default;
import('node-rpsls').then((module) => {
    const { rps, rpsls } = module
    const minimist = require('minimist')
    const express = require('express')
    const querystring = require('querystring')

    function parseBody(req, res, next) {
        let data = '';
      
        req.on('data', chunk => {
          data += chunk;
        });
      
        req.on('end', () => {
          if (data) {
            try {
              // Try to parse as JSON
              req.body = JSON.parse(data);
              next();
            } catch (e) {
              // If JSON parsing fails, parse as URL-encoded
              req.body = require('querystring').parse(data);
              next();
            }
          } else {
            req.body = {};
            next();
          }
        });
      }
      

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
        .all('/play/', (req, res) => {
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
        .all("/play/:shot", (req, res) => {
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
        .all('/play/', (req, res) => {
            let { shot } = req.body || {}
            shot = shot?.toLowerCase?.() || ''
            // if (!rpslsAcceptedShots.includes(shot)) {
            //     res.status(400).send("400 BAD REQUEST, not an acceptable shot")
            //     return;
            // }bean
            res.status(200).send(rpsls(shot))
        })
        .all("/play/:shot", (req, res) => {
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

    app.use((req, res, next) => {
        let data = '';
      
        req.on('data', chunk => {
          data += chunk;
        });
      
        req.on('end', () => {
          if (data) {
            try {
              // Try to parse as JSON
              req.body = JSON.parse(data);
              next();
            } catch (e) {
              // If JSON parsing fails, parse as URL-encoded
              req.body = require('querystring').parse(data);
              next();
            }
          } else {
            req.body = {};
            console.log("NO BODY")
            next();
          }
        });
      })
    // app.use(express.urlencoded({ extended: true }));
    // app.use(express.json());
    
// app.use((req, res, next) => {
//     if (!req.headers['content-type']) {
//       // If the Content-Type header is missing, manually parse the request body
//       let body = '';
//       req.on('data', (chunk) => {
//         body += chunk;
//       });
//       req.on('end', () => {
//          console.log("B: ", body)
//         try {
//           const parsedBody = querystring.parse(body);
//           req.body = parsedBody;
//           next();
//         } catch (error) {
//           try {
//             // req.headers['content-type'] = 'application/json';
//             // express.json({ type: '*/*' })(req, res, next);
//             const parsedBody = JSON.parse(body);
//             req.body = parsedBody;
//             next();
//           } catch (error) {
//             res.status(400).send();
//           }
//         }
//       });
//     } else {
//       next();
//     }
//   });

    app.use("/app", appRouter)

    app.use((req, res, next) => {
        console.log(req.url)
        res.status(404).send('404 NOT FOUND');
    });

    app.listen(PORT)

})