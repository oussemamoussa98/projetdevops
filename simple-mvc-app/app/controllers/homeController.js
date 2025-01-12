const homeController = {
    getHome: (req, res) => {
        const items = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
        ];
        res.render('index', { title: 'Simple MVC App', items });
    },
};

module.exports = homeController;
