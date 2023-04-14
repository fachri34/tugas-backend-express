import User from '../model/user.js'

export const createUser = async (req, res) => {
    try {
        const savedUser = await User.create(req.body)
        res.status(200).json({
            success: true,
            message: "Successfully created",
            data: savedUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create, Try again!"
        })
    }
}

export const updateUser = async (req, res) => {
    const id = req.params.id;

    const { username, email } = req.body;

    try {
        const user = await User.findOne({ where: { id } });

        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'User not found'
            });
        }

        await User.update({ username, email }, { where: { id } });

        const updatedUser = await User.findByPk(id)

        return res.status(200).json({
            status: true,
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (err) {
      
        return res.status(500).json({
            status: false,
            message: 'Internal server error'
        });
    }

}



export const deleteUser = async (req, res) => {
    const id = req.params.id

    try {
        await User.destroy({ where: { id: id } });
        res.status(200).json({
            success: true,
            message: "Successfully deleted",
        })
    } catch (err) {
        res.status(500).json
            ({
                success: false,
                message: "Failed to delete"
            })
    }
}


export const getSingleUser = async (req, res) => {
    const id = req.params.id

    try {
        const getUser = await User.findByPk(id);
        res.status(200).json({
            success: true,
            message: "Successful",
            data: getUser
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Not Found",
        })
    }
}


export const getAllUser = async (req, res) => {

    try {
        const Users = await User.findAll()

        res.status(200).json({
            success: true,
            count: Users.length,
            message: "Successful",
            data: Users
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Not Found",
        })
    }
}



