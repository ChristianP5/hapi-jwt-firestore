const { Firestore } = require('@google-cloud/firestore');
const crypto = require('crypto');

const RetrievalError = require('../exceptions/RetrievalError');

const deleteRefreshToken = async (refreshToken) => {
    const fs = new Firestore({
        projectId: process.env.PROJECt_ID,
        databaseId: process.env.FIRESTORE_ID,
    })

    const rtCollection = fs.collection('RefreshTokens');

    const result = await rtCollection.where('refreshToken', '==', refreshToken).get();
    

    // Is there exactly One Result?
    if(result.empty){
        throw new RetrievalError('Refresh Token Not Found!');
    }

    let resultArr = [];
    result.forEach(doc => {
        resultArr.push(doc.data().refreshToken);
    });

    if(resultArr.length !== 1){
        throw new RetrievalError('Refresh Token Not Found!');
    }

    // There is One Result
    result.forEach(doc => {
        rtCollection.doc(doc.id).delete();
    })


    return true;
}

module.exports = deleteRefreshToken;

