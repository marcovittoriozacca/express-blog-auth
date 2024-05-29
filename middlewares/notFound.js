module.exports = (req, res) => {
    res.format({
        html: () => {
            res.status(404).send('Page not found, sorry!');
        },
        json: () => {
            res.status(404).json({
                error: true,
                description: `The page: ${req.url} has not been found`,
            })
        }
    })
}