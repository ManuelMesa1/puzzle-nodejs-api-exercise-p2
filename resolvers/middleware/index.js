const { skip } = require('graphql-resolvers');
const Task = require('../../database/models/task')

module.exports.isAuthenticated = (_, __, { email }) => {
    if (!email) {
        throw new Error('Access Denied PLease log in to continue')
    }
    return skip
}

module.exports.isTaskOwner = async(_, { id }, { loggedInUserId }) => {
    try {
        const task = await Task.findById(id)
        if (!task) {
            throw new Error('Task not Found')
        } else if (task.user.toString() !== loggedInUserId) {
            throw new Error('Not Authorized as task owner')
        }
        return skip
    } catch (error) {
        console.log(error)
        throw error
    }

}