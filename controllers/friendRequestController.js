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

const acceptFriendRequest = async (req, res) => {
    try {
        const sender_id = req.user.id;
        const receiver_id = req.body.receiver_id;
        const status = 'accepted';
        if ([sender_id, status, receiver_id].includes(undefined)) {
            return res.status(400).send({ message: 'Please provide all the required fields.' });
        }
        const friendRequest = await FriendRequest.update({ status }, { where: { sender_id, receiver_id } });
        const newFriend = await Friend.create({ user_1_id: sender_id, user_2_id: receiver_id });
        return res.status(200).send({ message: 'Friend request accepted successfully', friendRequest, newFriend });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while updating the friend request.'
        });
    }
}

const cancelFriendRequest = async (req, res) => {
    try {
        const sender_id = req.user.id;
        const receiver_id = req.body.receiver_id;
        const status = 'rejected';
        if ([sender_id, status, receiver_id].includes(undefined)) {
            return res.status(400).send({ message: 'Please provide all the required fields.' });
        }
        const friendRequest = await FriendRequest.update({ status }, { where: { sender_id, receiver_id } });
        return res.status(200).send({ message: 'Friend request updated successfully', friendRequest });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while updating the friend request.'
        });
    }
}


module.exports = {
    getFriendRequests,
    addFriendRequest,
    acceptFriendRequest,
    cancelFriendRequest
}
