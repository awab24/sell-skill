import mongoose from "mongoose";



const schema =  mongoose.Schema;
const ClientSchema = new schema({
  _id: String,
    name: String, 
    surname: String, 
    email: {type: String,
        required: true,
        unique: true,
    }, 
    password: String, 
    confirmPassword: String,
    picture:{
        name: String,
           picture: {
          data: Buffer,
          contentType: String,
        }
     
      }, 
      newMessage: Boolean,
    messages: [{message: {
        providerId: String,
        clientId: String,
        _id: String,
        name: String,
        message: String,
        response: Boolean
      }}],
      invitationAcceptances: 
      [{
        invitationAcceptance: {
          clientId: String,
          providerId: String,
          providerName: String,
          providerEmail: String,

        }
      }
      
      ],
      newInvitationAcceptance: Boolean,
   incomingProviders:[
 {  incomingProvider:{
  _id: String,
  providerName: String,
  providerEmail: String,
  // providerProfile: {
  //     name: String,
  //     providerProfile: {
  //         data: Buffer,
  //         contentType: String
  //     }
  // },

 }}  ],
 newProposal: Boolean,
   proposals: [{
    _id: String,
    proposalId: String,
    proposal: String,
}],
categories: [{
  type: String
}],


        //make it as a list every element on it contain proposalId and proposal itself

        
  
        


})

export const ClientModel = mongoose.model('client', ClientSchema)