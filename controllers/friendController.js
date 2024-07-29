const db = require('../db.js');
const { Op } = require('sequelize');

const Friend = db.friends;
const User = db.users;
const FriendRequest = db.friendRequests;

const getFriends = async (req, res) => {
    try {
        const user_id = req.user.id;
        if (!user_id) return res.status(400).send({ message: 'Please provide the user id.' });
        const friends = await Friend.findAll({ where: { [db.Sequelize.Op.or]: [{ user_1_id: user_id }, { user_2_id: user_id }] } });
        return res.status(200).send({ friends });
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
        const friend = await Friend.destroy({ where: { [db.Sequelize.Op.or]: [{ user_1_id: user_id, user_2_id: friend_id }, { user_1_id: friend_id, user_2_id: user_id }] } });
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

const getMyFriends = async (req, res) => {
    try {
        const id = req.user.id;
        if (!id) return res.status(400).send({ message: 'Please provide the user id.' });

        // Obtener los IDs de los amigos
        const friends = await Friend.findAll({
            where: {
                [Op.or]: [
                    { user_1_id: id },
                    { user_2_id: id }
                ]
            }
        });
        const friendIds = friends.map(friend =>
            friend.user_1_id === id ? friend.user_2_id : friend.user_1_id
        );
        const friendDetails = await User.findAll({
            where: {
                id: {
                    [Op.in]: friendIds
                }
            },
            attributes: ['id', 'name', 'last_name', 'profile_photo']
        });

        return res.status(200).send({ friends: friendDetails });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Some error occurred while retrieving the friends.'
        });
    }
};

const getMyNotFriends = async (req, res) => {
    try {
        const id = req.user.id;
        if (!id) return res.status(400).send({ message: 'Please provide the user id.' });

        const friends = await Friend.findAll({
            where: {
                [Op.or]: [
                    { user_1_id: id },
                    { user_2_id: id }
                ]
            }
        });

        const friendIds = friends.map(friend =>
            friend.user_1_id === id ? friend.user_2_id : friend.user_1_id
        );

        friendIds.push(id);

        const sentRequests = await FriendRequest.findAll({
            where: {
                sender_id: id,
                status: 'pending'
            }
        });

        const sentRequestIds = sentRequests.map(request => request.receiver_id);

        const excludeIds = friendIds.concat(sentRequestIds);

        const notFriends = await User.findAll({
            where: {
                id: {
                    [Op.notIn]: excludeIds
                }
            },
            attributes: ['id', 'name', 'last_name', 'profile_photo']
        });

        return res.status(200).send({ message: 'Users found', notFriends });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Some error occurred while retrieving the not friends.'
        });
    }
}

module.exports = {
    getFriends,
    deleteFriend,
    getMyFriends,
    getMyNotFriends
};
