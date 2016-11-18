module.exports = function (mongoshema) {

    var api = {
        /**
         * Read ALL entries from database
         * @param {Object} req - request object
         * @param {Object} res - response object
         * */
        getAll: function (req, res) {
            mongoshema.find({}, null, {sort: {_id: -1}}, function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(404).json({error: "Server error"});
                } else {
                    res.status(200).json(data);
                }
            });
        },

        /**
         * Read entity from database by its ID or comma separated IDs string
         * @param {Object} req - request object
         * @param {Object} res - response object
         * */
        getById: function (req, res) {
            var id = req.params.id;
            if (id.indexOf(",") > -1) {
                // comma-separated string handles with another method
                return api.getByIdRange(req, res);
            }

            mongoshema.findById(req.params.id, function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(404).json({error: "Server error"});
                } else {
                    res.status(200).json(data);
                }
            });
        },


        /**
         * Remove specific entity from database by its ID
         * @param {Object} req - request object
         * @param {Object} res - response object
         * */
        removeById: function (req, res) {
            mongoshema.remove({_id: req.params.id}, function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(404).json({error: "Server error"});
                }
            }).then(function () {
                mongoshema.find({}, null, {sort: {_id: -1}}, function (err, data) {
                    if (err) {
                        console.log(err);
                        res.status(404).json({error: "Server error"});
                    } else {
                        res.status(200).json(data);
                    }
                });
            });
        },

        /**
         * Update specific entity from database by its ID
         * @param {Object} req - request object
         * @param {Object} res - response object
         * */
        updateById: function (req, res) {
            mongoshema.findOneAndUpdate({_id: req.body.data._id}, req.body.data, {new: true}, function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(404).json({error: "Server error"});
                } else {
                    console.log(data)
                    res.status(200).json(data);
                }
            });
        },

        /**
         * Create specific entity in database
         * @param {Object} req - request object
         * @param {Object} res - response object
         * */
        create: function (req, res) {
            mongoshema.create(req.body, function (err, data) {
                if (err) {
                    res.statusCode = 500;
                    console.log(err);
                    res.status(500).json({error: "Server error"});
                } else {
                    res.status(201).json(data);
                }
            });
        }
    };

    return api;
};
