const { Firestore } = require('@google-cloud/firestore');
const crypto = require('crypto');

const addRefreshToken = async (refreshToken) => {
    const fs = new Firestore({
        projectId: process.env.PROJECt_ID,
        databaseId: process.env.FIRESTORE_ID,
    })

    const rtCollection = fs.collection('RefreshTokens');

    const rtId = crypto.randomBytes(8).toString('hex');
    const rtDoc = rtCollection.doc(rtId);

    const data = {
        refreshToken: refreshToken
    }

    return await rtDoc.set(data);
}

module.exports = addRefreshToken;

