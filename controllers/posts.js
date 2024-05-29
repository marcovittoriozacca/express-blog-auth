const { type } = require('os');
let postsList = require('../db/posts.json');
const path = require('path');
const fs = require('fs');
const { updatePostJson,generateSlug } = require('../utils.js');

const index = (req, res) => {
    res.format({
        html: () => {
            let html = ` <ul>
                            ${postsList.map(p => `
                            <li>
                                <h2>${p.title}</h2>
                                <p>${p.content}</p>
                                <img width="250" src="/imgs/posts/${p.image}">
                                <br>${p.tags.map(t => `<small>${t}</small>`).join(' - ')}
                            `
                    ).join('')}
            `
            res.send(html);
        },
        json: () => {
            res.json(postsList);
        }
    })
}

const store = (req, res) => {
    const {title, content, tags} = req.body;
    if(!title || !content || !tags || !req.file){

        const filePath = path.join(__dirname, '..', 'public', 'imgs', 'posts', `${req.file.filename}`);
        fs.unlinkSync(filePath);

        res.format({
            json: () => res.status(400).send({
                            success: false,
                            error: "One or more information are missing"
                        }),
            html: () => {res.status(400).send("<h1>One or more information are missing</h1>")}
        })
    }else{
        const slug = generateSlug(title);
        const newPost = {
            title,
            slug,
            content,
            image: `${req.file.filename}`,
            tags,
        };

        postsList = updatePostJson([...postsList, newPost]);

        res.format({
            json: () => {            
                res.send({
                    success: true,
                    statusCode: 200,
                    newPost
                });
            },
            html: () => {
                res.redirect('/posts');
            },
            default: () => {
                res.status(406).send('Error 406 - Not Acceptable')
            }
        })
    }
}



module.exports = {
    index,
    store,
}