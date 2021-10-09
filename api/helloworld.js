module.exports = async (req, res) => {
    var data = {
        msg: "hello world!"
    }
    res.status(200).json(data);
}
