const path = require('path');
const fs = require('fs');
const postsList = require('./db/posts.json');

const updatePostJson = data => {
    const filePath = path.join(process.cwd(), 'db', 'posts.json');
    const string = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, string);

}

const generateSlug = (name) => {
    let baseSlug = name
                .toString()
                .toLowerCase()
                .normalize('NFD')
                .trim()
                .replace(/\s+/g, '-')
                .replace(/[^\w\-]+/g, '')
                .replace(/\-\-+/g, '-');


    let slug = baseSlug;
    let counter = 1;
    const slugsList = postsList.map(p => p.slug);

    while(slugsList.includes(slug)){
        slug = `${baseSlug}-${counter}`;
        counter++;
    }
    return slug;
}

module.exports = {
    updatePostJson,
    generateSlug,
}