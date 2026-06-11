import address from '../Models/Address.js'
export const setorder = async (req, res) => {
    try {
        const response = await address.create(req.body)
        res.status(200).json({ message: "Oredr Add successfully",response })

    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
        console.log("Error=>", error)
    }

}

export const getorder = async (req, res) => {
    try {
        const response = await address.find({ userId: req.params.userId })
        res.status(200).json({ message: "Oredr get Successfully",response });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
        console.log("Error=> ", error)
    }
}

