const db = require('../db.js');

const Friend = db.friends;

const getFriends = async (req, res) => {
    try {
        const user_id = req.user.id;
        if(!user_id) return res.status(400).send({ message: 'Please provide the user id.' });
        const friends = await Friend.findAll({ where: { [db.Sequelize.Op.or]: [{ user_1_id: user_id }, { user_2_id: user_id }] }});
        return res.status(200).send({friends});
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while retrieving the friends.'
        });
    }
}

const deleteFriend = async (req, res) => {
    try {
        const user_id = req.user.id;
        const friend_id = req.body.friend_id;
        console.log(user_id, friend_id);
        if ([user_id, friend_id].includes(undefined)) {
            return res.status(400).send({ message: 'Please provide all the required fields.' });
        }
        const friend = await Friend.destroy({ where: { [db.Sequelize.Op.or]: [{ user_1_id: user_id, user_2_id: friend_id }, { user_1_id: friend_id, user_2_id: user_id }] }});
        if (friend === 0) {
            return res.status(404).send({ message: 'That person is not in your friend list.' });
        }
        return res.status(200).send({ message: 'Friend deleted successfully', friend });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while deleting the friend.'
        });
    }
}

module.exports = {
    getFriends,
    deleteFriend
};
