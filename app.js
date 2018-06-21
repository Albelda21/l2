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

    // let domain = req.headers.host.split(".")[0];
    let domain = 'zazu';
    let data;
    let landingData;

    curl.get('localhost:3030/api/landing/'+domain)
        .then(({statusCode, body, headers}) => {

            data = JSON.parse(body)

            landingData = data[0]

            //snippets for general settings
            res.render('home', {
                title: landingData ? landingData.meta.title : "",
                keywords:landingData ? landingData.meta.keywords : "",
                description:landingData ? landingData.meta.description : "",
                copyright:landingData ? landingData.footer.copyright : "",
                text:landingData ? landingData.footer.text : "",
                logo:landingData ? landingData.media.logo : "",
                favicon:landingData ? landingData.media.favicon : "",
                color:landingData ? landingData.color.accent : ""
            })
        })
        .catch((e) => {
            console.log("Api does not response!");

            res.render('home', {
                title: landingData ? landingData.meta.title : "",
                keywords:landingData ? landingData.meta.keywords : "",
                description:landingData ? landingData.meta.description : "",
                copyright:landingData ? landingData.footer.copyright : "",
                text:landingData ? landingData.footer.text : "",
                logo:landingData ? landingData.media.logo : "",
                favicon:landingData ? landingData.media.favicon : "",
                color:landingData ? landingData.color.accent : ""
            })
        });
})

// render `home.ejs` with the list of posts
app.get(['/confirmation', '/contact', '/privacy', '/terms', '/thankyou'], (req, res) => {


    let domain = 'zazu';

    if(!domain){
        domain = req.headers.host.split(".")[0];
    }

    let renderView = req.path.replace(/\//g, "");
    let dataForPage

    curl.get('localhost:3030/api/landing/'+domain)
        .then(({statusCode, body, headers}) => {

            data = JSON.parse(body)

            landingData = data[0];
            pageData = data[1];

            for(index in pageData) {
               if( pageData[index].type === renderView){
                   dataForPage = pageData[index]
               }
            }

            // console.log(dataForPage)

            //snippets for general settings
            res.render(renderView, {
                title: landingData ? landingData.meta.title : "",
                keywords:landingData ? landingData.meta.keywords : "",
                description:landingData ? landingData.meta.description : "",
                copyright:landingData ? landingData.footer.copyright : "",
                text:landingData ? landingData.footer.text : "",
                logo:landingData ? landingData.media.logo : "",
                favicon:landingData ? landingData.media.favicon : "",
                color:landingData ? landingData.color.accent : "",
                content:dataForPage ? dataForPage.content : ""
            })
        })
        .catch((e) => {
            console.log(e);
        });
})

// blog post
app.get('/post/:id', (req, res) => {
    // find the post in the `posts` array
    const post = posts.filter((post) => {
        return post.id == req.params.id
    })[0]

    // render the `confirmation.ejs` template with the post content
    res.render('post', {
        author: post.author,
        title: post.title,
        body: post.body
    })
})

app.listen(3001)

console.log('listening on port 3001')
