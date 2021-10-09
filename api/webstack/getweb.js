import getClient from '../../model/db.js'

module.exports = async (req, res) => {
    let client =  await getClient()
    const db = client.db('test');
    var result = await db.collection("web").find().toArray();
    res.status(200).json(result);
    client.close()
}
