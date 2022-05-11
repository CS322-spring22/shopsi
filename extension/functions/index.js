const admin = require('firebase-admin').initializeApp()
const functions = require("firebase-functions");
const firestore = admin.firestore().collection('Users')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest(async (request, response) => {
  if (request.header("Authorization")) {
    let token;
    try {
        token = await admin.auth().verifyIdToken(request.header("Authorization"))

        if (!token.email) {
            functions.logger.error('Failed to get email.', error)
            response.sendStatus(401)
            return
        }
        try {
            var user = await (await firestore.doc(token.email).get().data())
        } catch (e) {
            
        }
    } catch (error) {
        functions.logger.error('Failed to get ID Token.', error)
        response.sendStatus(401)
    } 
  } else {
        
  }
});
