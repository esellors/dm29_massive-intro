module.exports = {
    getInventory: (req, res) => {
        const db = req.app.get('db')

        if (req.params.inventory_id) {
            // get_item
            //I've added the + in front of req.params.inventory_id to ensure that it goes into the sql statement as a number, which is how the IDs are stored in the heroku db.
            db.inventory.get_item(+req.params.inventory_id).then(dbresponse => res.status(200).json(dbresponse))

        } else {
            db.inventory.get_items().then(dbresponse => res.status(200).json(dbresponse))
        }
    },
    addInventory: (req, res) => {
        // res.sendStatus(200);
        const {name, type} = req.body;
        const db = req.app.get('db')

        db.inventory.add_item(name, type).then(dbresponse => {
            console.log(dbresponse)
            res.status(200).json(dbresponse)
        });
    }
}