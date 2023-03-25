const user = require('../models/User');

const getDetail = async (req, res) => {
    try {
        const userId = req.user.id;
        const User = await user.findById(userId).select("-password");
        // console.log(User);
        res.send(User);
    } catch (error) {
        // if any unwanted error occured then this will run and show the 500 error status.
        console.log({ error: error.message });
        res.status(500).send("Internal Server Error.");
    }
};

module.exports = getDetail;