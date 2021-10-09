import getClient from '../../model/db.js'

module.exports = async (req, res) => {
    try {
        let client =  await getClient()
    const db = client.db('test');
    var result = await db.collection("test1").find().toArray();
    res.status(200).json(result);
    }catch {
    client.close()
    }

}
