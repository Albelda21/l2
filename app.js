const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const curl = new (require( 'curl-request' ))();


// set the view engine to ejs
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));

// blog home page
app.get('/', (req, res) => {

    let domain = 'zazu';
    let data;
    let landingData;

    curl.get('localhost:3030/api/landing/'+domain)
        .then(({statusCode, body, headers}) => {

            data = JSON.parse(body)

            landingData = data[0]

            console.log(landingData)

            // render `home.ejs` with the list of posts
            res.render('home', { title: landingData.meta.title })
        })
        .catch((e) => {
            console.log(e);
        });
})

// render `home.ejs` with the list of posts
app.get(['/apply', '/contact', '/privacy', '/terms', '/thankyou'], (req, res) => {

    let renderView = req.path.replace(/\//g, "");

    res.render(renderView, { content: '<h1>APPLY!#!@#!@#!@#!@#!@#</h1>', title:"Contact"})
})

// blog post
app.get('/post/:id', (req, res) => {
    // find the post in the `posts` array
    const post = posts.filter((post) => {
        return post.id == req.params.id
    })[0]

    // render the `apply.ejs` template with the post content
    res.render('post', {
        author: post.author,
        title: post.title,
        body: post.body
    })
})

app.listen(8080)

console.log('listening on port 8080')
