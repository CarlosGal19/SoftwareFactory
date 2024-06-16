const db = require('../db.js');

const FriendRequest = db.friendRequests;
const Friend = db.friends;

const getFriendRequests = async (req, res) => {
    try {
        const receiver_id = req.user.id;
        if(!receiver_id) return res.status(400).send({ message: 'Please provide the sender id.' });
        const friendRequests = await FriendRequest.findAll({ where: { receiver_id } });
        return res.status(200).send({friendRequests});
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while retrieving the friend requests.'
        });
    }
}

const addFriendRequest = async (req, res) => {
    try {
        const sender_id = req.user.id
        const receiver_id = req.body.receiver_id;
        if ([sender_id, receiver_id].includes(undefined)) {
            return res.status(400).send({ message: 'Please provide all the required fields.' });
        };
        const status = 'pending';
        const friendRequest = await FriendRequest.create({
            sender_id,
            receiver_id,
            status
        });

        return res.status(200).send({ message: 'Friend request created successfully', friendRequest });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while creating the friend request.'
        });
    }
}

const updateFriendRequest = async (req, res) => {
    try {
        const receiver_id = req.user.id;
        const { sender_id, status } = req.body;
        if ([sender_id, status, receiver_id].includes(undefined)) {
            return res.status(400).send({ message: 'Please provide all the required fields.' });
        }
        if (status !== 'accepted' && status !== 'rejected') {
            return res.status(400).send({ message: 'Invalid status. Please provide either accepted or rejected.' });
        }
        const friendRequest = await FriendRequest.update({ status }, { where: { sender_id, receiver_id } });
        if (status === 'rejected') {
            return res.status(200).send({ message: 'Friend request rejected successfully', friendRequest });
        }
        const newFriend = await Friend.create({ user_1_id: sender_id, user_2_id: receiver_id });
        return res.status(200).send({ message: 'Friend request accepted successfully', friendRequest, newFriend });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while updating the friend request.'
        });
    }
}

module.exports = {
    getFriendRequests,
    addFriendRequest,
    updateFriendRequest
}
