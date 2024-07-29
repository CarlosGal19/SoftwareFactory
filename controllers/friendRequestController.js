const db = require('../db.js');

const FriendRequest = db.friendRequests;
const Friend = db.friends;
const User = db.users;

const getFriendRequests = async (req, res) => {
    try {
        const receiver_id = req.user.id;
        if (!receiver_id) {
            return res.status(400).send({ message: 'Please provide the receiver id.' });
        }

        const friendRequests = await FriendRequest.findAll({
            where: { receiver_id },
            include: [{
                model: User,
                as: 'sender',
                attributes: ['id', 'name', 'last_name', 'profile_photo', 'user_name']
            }]
        });

        return res.status(200).send({ friendRequests });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred while retrieving the friend requests.'
        });
    }
}

const addFriendRequest = async (req, res) => {
    try {
        const sender_id = req.user.id;
        const receiver_id = req.params.id;
        if ([sender_id, receiver_id].includes(undefined)) {
            return res.status(400).send({ message: 'Please provide all the required fields.' });
        }
        if (sender_id === receiver_id) {
            return res.status(400).send({ message: 'You cannot send a friend request to yourself.' });
        }
        const receiver = await User.findByPk(receiver_id);
        if (!receiver) {
            return res.status(404).send({ message: 'Receiver not found.' });
        }
        const existingRequest = await FriendRequest.findOne({
            where: {
                sender_id,
                receiver_id,
                status: 'pending'
            }
        });
        if (existingRequest) {
            return res.status(409).send({ message: 'Friend request already sent.' });
        }
        const friendRequest = await FriendRequest.create({
            sender_id,
            receiver_id,
            status: 'pending',
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
