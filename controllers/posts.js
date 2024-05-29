const postsList = require('../db/posts.json');

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




module.exports = {
    index,
}