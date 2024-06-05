class RetrievalError extends Error {
    constructor(message){
        super(message);

        this.errorCode = 400;
        this.errorName = 'Retrieval Error';
    }
}

module.exports = RetrievalError;