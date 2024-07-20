import mongoose from "mongoose";
import { json, response } from "express";
import { ClientModel } from "../models/ClientModel.js"
import { PostsModel } from "../models/PostsModel.js";
import { ProviderModel } from "../models/ProviderModel.js"
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import stripe from 'stripe'
import { PaymentModel } from "../models/PaymentModel.js";
import paypal from 'paypal-rest-sdk'
import paypal1 from '@paypal/payouts-sdk'


const stripek = stripe('9393-393-3838')

let providerOrClientId;
let clientId;
let providerId;
let provider;
let proposalId;
let providerImageCertificationsImageCertificateData = [];
let providerImageCertifications = [];
let choosenInvitationId;

export const sendProviderOrClientId = (req, res) => {
  res.send(providerOrClientId)
}

export const handleClientSignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user by email in the database
    const findUser = await ClientModel.findOne({ email });
    
if(findUser){

    // Compare the provided password with the hashed password in the database
    const compare = await bcryptjs.compare(password, findUser.password);
        // If the password is incorrect
        if (!compare) {
          return res.status(401).json({ redirectUrl: 'http://localhost:3000/cancel' });
        }
            // Generate a JWT token
    const token = jwt.sign({ _id: findUser?._id }, process.env.SECRET_KEY, { expiresIn: '30m' });
    providerOrClientId = findUser._id
    // Send the token as a JSON response

    res.json({ token });
}
    // If user is not found







  } catch (error) {
 
  }
};

export const handleProviderSignIn = async (req, res, next) => {
  
  try {
    const { email, password } = req.body;

    // Find the user by email in the database
    const findUser = await ProviderModel.findOne({ email });

    if(findUser){

        const compare = await bcryptjs.compare(password, findUser.password);
        if (!compare) {
          return res.status(401).send('Email or password is incorrect');
        }
            // Generate a JWT token
    const token = jwt.sign({ _id: findUser?._id }, process.env.SECRET_KEY, { expiresIn: '30m' });
    providerOrClientId = findUser?._id
    // Send the token as a JSON response
    res.json({ token });
    }

    // If user is not found or password is incorrect
    if (!findUser) {

    }

    // Compare the provided password with the hashed password in the database
  
    




  } catch (error) {

  }
};


export const sendProviderIdToFront = async(req, res) => {
  res.send(providerOrClientId)
}


export const handleClientSignUp = async(req, res) => {

  const findProviderUser = await ProviderModel.findOne({email: req.body.email})   
  const findClientUser = await ClientModel.findOne({email: req.body.email})  
  providerOrClientId = req.body._id                                          
 if (findProviderUser || findClientUser){
     res.send(false)
  }else{
        const salt = await bcryptjs.genSalt(10);
        const hashedPwd = await bcryptjs.hash(req.body.password, salt)
        await ClientModel.insertMany({
            _id: providerOrClientId,
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: hashedPwd,
            newMessage: false

        })

        const findUser2 = await ClientModel.findOne({email: req.body.email})
        const token =  jwt.sign({_id: findUser2?._id}, process.env.SECRET_KEY, {expiresIn: '1m'})
        providerOrClientId = findUser2?._id
        res.json(token)

        
    
    }


}

export const handleProviderSignUp = async(req, res) => {
  console.log(req.body)
   const findProviderUser = await ProviderModel.findOne({email: req.body.email})   
   const findClientUser = await ClientModel.findOne({email: req.body.email})                                            
  if (findProviderUser || findClientUser){
      res.send(false)
   }else{
     const salt = await bcryptjs.genSalt(10);
       const hashedPwd = await bcryptjs.hash(req.body.password, salt)
       providerOrClientId = req.body._id  
  
       await ProviderModel.insertMany({
            _id: providerOrClientId,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: hashedPwd,
        newMessage: false

    }) 
    const findUser2 = await ProviderModel.findOne({email: req.body.email})
    console.log('findUser2 => '+findUser2)
    const token = jwt.sign({_id: findUser2?._id}, process.env.SECRET_KEY, {expiresIn: '1m'})
    console.log(token)
    res.json({token})

   }
}




export const verify = (req, res, next) => {
  const token = req.headers['authorization'];// Check lowercase 'authorization'
  console.log('token ==========>================>================> '+token)
  if (!token) {
    return res.status(403).send('Token not provided');
  }

  // Extract the token from "Bearer <token>"
  const bearerToken = token.split(' ')[1];

  jwt.verify(bearerToken, process.env.SECRET_KEY, (err, authData) => {
    if (err) {

    } else {
      req.authData = authData;
      res.json({permission: 'true'})
      next();
    }
  });
};


export const insertPost = async(req, res)=>{
  console.log('reqSkills ====> '+req.body.skills)
  await PostsModel.insertMany({
    postId: req.body._id,
    clientId: providerOrClientId,
    term: req.body.term,
    title: req.body.title,
    skills: req.body.skills,
    scope: req.body.scope,
    experience: req.body.experience,
    pudget: req.body.pudget,

    description: req.body.description
  })
} 

export const getPosts = async(req, res) => {
  let relatedPosts = []
  if (providerOrClientId){
    const provider = await ProviderModel.findById(providerOrClientId)
    const allPosts = await PostsModel.find()
     allPosts?.map((post) => console.log('post category ===> '+post.skills))
     allPosts?.map((post) => post.skills.map((postSkill) => provider?.categories.map((providerCategory)=> {
      if(postSkill === providerCategory && !relatedPosts.includes(post))  {
      relatedPosts.push(post)
      }
  
    })))
     res.send(relatedPosts)
  }

}



export const insertCategory = async (req, res) => {
  const categoriesFromFront = req.body;
   // Assuming you get providerOrClientId from req.user
   sendMessageFromClientToProvider

  try {
    for (const categoryFromFront of categoriesFromFront) {
      await ProviderModel.findOneAndUpdate(
        { _id: providerOrClientId },
        { $push: { categories: categoryFromFront } },
        { new: true }
      );
    }
    res.status(200).send({ message: "Categories updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "An error occurred while updating categories" });
  }
};


export const insertLetter = async(req, res)=> {
  const letter =JSON.stringify(req.body)


  // Update the provider's letter
  await ProviderModel.findOneAndUpdate(
    { _id: providerOrClientId },
    { $set: { letter: letter } },
    { new: true }
  );

}

export const insertPicture = async(req, res)=>{
  try{
    await ProviderModel.findOneAndUpdate(
      {_id: providerOrClientId},
      {$set: {picture: {
        name: req.body.name,
        picture: {
          data: req.file.buffer,
          contentType: req.file.mimetype
        }
       
      }}},
      {new: true}
    )
  }catch(error){

  }

}

export const insertPdfCertificate = async(req, res)=>{
  await ProviderModel.findOneAndUpdate(
    {_id: providerOrClientId},
    {$push: {pdfCertifications: {
      name: req.body.name,
      pdfCertificate: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        id: req.body.id
      }
     
    }}},
    {new: true}
  )
}

export const insertPdfExperience = async(req, res) => {

  await ProviderModel.findOneAndUpdate(
    {_id: providerOrClientId},
    {$push: {pdfExperiences: {
      name: req.body.name,
      pdfExperience: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        id: req.body.id
      }
     
    }}},
    {new: true}
  )
}
export const insertImageCertificate = async(req, res) => {
  await ProviderModel.findOneAndUpdate(
    {_id: providerOrClientId},
    {$push: {imageCertifications: {
      name: req.body.name,
      imageCertificate: {
        data: req.file.buffer,
        contentType: 'image/png',
        imageCertificationId: req.body.id
      }
     
    }}},
    {new: true}
  )
}

export const insertImageExperience = async(req, res) => {
  console.log('id ==> '+req.body.id)
  await ProviderModel.findOneAndUpdate(
    {_id: providerOrClientId},
    {$push: {imageExperiences: {
      name: req.body.name,
      imageExperience: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        id: req.body.id

      }
     
    }}},
    {new: true}
  )
}

export const addRate = async (req, res) => {
  try {
    const { ratePerHour } = req.body;

    // Convert ratePerHour to a number
    const rateValue = parseFloat(ratePerHour);

    // Validate the rateValue
    if (isNaN(rateValue)) {
      return res.status(400).json({ error: 'Invalid rate per hour value' });
    }

    const updatedProvider = await ProviderModel.findOneAndUpdate(
      { _id: providerOrClientId },
      { $set: { ratePerHour: rateValue } },
      { new: true }
    );

    res.status(200).json(updatedProvider);
  } catch (error) {

  }
};

export const addBlog = async(req, res) => {

  await ProviderModel.findByIdAndUpdate(
    providerOrClientId,
    {
      blog: {
        name: req.body.name,
        picture: {
          
          data: req.file.buffer,
          contentType: req.file.mimetype
        }
      }
    },
    {new: true}
  )
  const provider =await ProviderModel.findById(providerOrClientId)
  console.log('provider  ===> '+provider)
}
export const getBlog = async(req, res) => {
  const provider = await ProviderModel.findById(providerOrClientId)
  console.log(provider?.blog)
  res.set('Content-Type', provider?.blog.picture.contentType)
  res.send(provider?.blog.picture.data)
}
export const addCourse= async(req, res)=>{
  
}


export const getProfileData = async(req, res) => {
 
    provider = await ProviderModel.findById(providerOrClientId);


  res.json(provider)

}

export const getProfilePicture = async (req, res) => {
  try {

    if (!providerOrClientId) {
      return res.status(400).send('Provider ID is required');
    }


      provider = await ProviderModel.findById(providerOrClientId);
    
    if (!provider || !provider.picture || !provider.picture.picture) {
      return res.status(404).send('Profile picture not found');
    }

    res.set('Content-Type', provider.picture.picture.contentType);
    res.send(provider.picture.picture.data);
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
};
export const getProfileIMAGE = async (req, res) => {
  try {

    if (!providerOrClientId) {
      return res.status(400).send('Provider ID is required');
    }

    let provider;
    if (proposalId) {
      provider = await ProviderModel.findById(proposalId);
    } else {
      provider = await ProviderModel.findById(providerOrClientId);
    }

    if (!provider) {
      return res.status(404).send('Provider not found');
    }
    const providerImageCertifications = provider.imageCertifications;
    const providerImageCertificationsImageCertificateData = providerImageCertifications.map(imageCertificate => {
      return {
        data: imageCertificate.imageCertificate.data.toString('base64'), // Convert binary to base64 string
        contentType: imageCertificate.imageCertificate.contentType,
        imageCertificationId: imageCertificate.imageCertificate.imageCertificationId
      };
    });

    res.json(providerImageCertificationsImageCertificateData);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
};


export const getProfilePDF = async(req, res) => {
  try {

    if (!providerOrClientId) {
      return res.status(400).send('Provider ID is required');
    }

    if (proposalId){
      provider = await ProviderModel.findById(proposalId);
    }else{
      provider = await ProviderModel.findById(providerOrClientId);
    }


    
    const providerPdfCertifications = provider?.pdfCertifications;
    const providerPdfCertificationsPdfCertificateData = providerPdfCertifications?.map(pdfCertificate => {
      return {
        data: pdfCertificate.pdfCertificate.data.toString('base64'), // Convert binary to base64 string
        contentType: pdfCertificate.pdfCertificate.contentType,
        id: pdfCertificate.pdfCertificate.id
      };
    });

    res.json(providerPdfCertificationsPdfCertificateData);
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
}

export const getPdfExperience = async(req, res) => {
  try {

    if (!providerOrClientId) {
      return res.status(400).send('Provider ID is required');
    }
    if (proposalId){
      provider = await ProviderModel.findById(proposalId);
    }else{
      provider = await ProviderModel.findById(providerOrClientId);
    }



    const providerPdfExperiences = provider?.pdfExperiences;
    const providerPdfExperiencesPdfExperienceData = providerPdfExperiences?.map(pdfExperience => {
      return {
        data: pdfExperience.pdfExperience.data.toString('base64'), // Convert binary to base64 string
        contentType: pdfExperience.pdfExperience.contentType,
        id: pdfExperience.pdfExperience.id
      };
    });

    res.json(providerPdfExperiencesPdfExperienceData);
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
}

export const getImageExperience = async(req, res) => {
  try {

    if (!providerOrClientId) {
      res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.set('Access-Control-Allow-Credentials', 'true');

    }


    if (proposalId){
      provider = await ProviderModel.findById(proposalId);
    }else{
      provider = await ProviderModel.findById(providerOrClientId);
    }


    const providerImageExperiences = provider.imageExperiences;
    const providerImageExperiencesImageExperienceData = providerImageExperiences?.map((imageExperience) => {
      return {
        data: imageExperience.imageExperience.data.toString('base64'), // Convert binary to base64 string
        contentType: imageExperience.imageExperience.contentType,
        id: imageExperience.imageExperience.id
      };
    });

    res.json(providerImageExperiencesImageExperienceData);
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
}

export const insertProviderToClient = async(req, res)=> {
   clientId =JSON.stringify(req.params.id) ;
    clientId = clientId.replace(/"/g,"")


      const provider = await ProviderModel.findById(providerOrClientId)
      // const checkClient = await ClientModel.findById(clientId)
      // console.log('check client => '+ checkClient)
      // console.log('provider => '+ provider.email)

    const client = await ClientModel.findById(clientId)

       await ClientModel.findOneAndUpdate(
         {_id: clientId},
         {
          $push:  {incomingProviders:
            {
              incomingProvider:      {
                _id: providerOrClientId,
                providerName: provider.name,
                providerEmail: provider.email,
   
     
          }
            }
       ,

          }
         },
      
         {new: true}
       )
       //the blow is just for checking


}

export const getProviderData = async(req, res) => {
    const client = await ClientModel.findById(providerOrClientId)

     res.send(client.incomingProviders)
}

export const submitProposal = async(req, res) => {
  let exist = false;
  const proposal = JSON.stringify(req.body);
  const client = await ClientModel.findById(clientId)
  client.proposals.map((proposal) => proposal.proposalId === providerOrClientId ? exist=true : null)
  if (!exist){
    await ClientModel.findByIdAndUpdate(
       clientId,
      {$push: {
        proposals: {
          proposalId: providerOrClientId,
          proposal: proposal
        }, 
      },
    },
    {new: true}
    )
    await ClientModel.findByIdAndUpdate(
      
       clientId,
        {
          $set: {
            newProposal: true
          }
        },
        {new: true}
      
    )
  }

}

export const getProposals = async(req, res)=>{
  const client = await ClientModel.findById(providerOrClientId)
  const proposals = client.proposals
  
  res.send(proposals)
}

export const getProposalId = async(req, res)=>{
  proposalId = req.params.id

}




export const sendMessageFromClientToProvider = async (req, res) => {
  const { message } = req.body; // Extract the message object from req.body
  const  providerId  = req.params.id; // Extract the provider ID from req.params
  const client = await ClientModel.findById(providerOrClientId)
  const clientName = client.name
  let NameExist = false
  const provider = await ProviderModel.findById(providerId)
  provider?.messages?.map((message) => message.message.name === clientName ? NameExist = true : null)
  try {
    // Ensure the _id is correctly formatted as ObjectId if needed

    if (!NameExist) {
await ProviderModel.findByIdAndUpdate(
        providerId,
        { $push: { messages: { 
          message:
          {
            _id: message.messageId,
            providerId: providerId, 
            clientId: providerOrClientId,
            name: clientName,
            message: message.message,
            response: false
          }
        } } },
         // Push the message object into messages array directly
        { new: true } // Return the updated document
      );
      await ClientModel.findByIdAndUpdate(
        providerOrClientId,
        {
          $push: {
            messages: {
              message: {
                _id: message.messageId,
                providerId: providerId, 
                clientId: providerOrClientId,

                message: message.message,
                response: true
              }
            }
          }
        },
        {new: true}
        
      )
      await ProviderModel.findByIdAndUpdate(
        providerId,
        {
          $set: {
            newMessage : true
          }
        },
        {new: true}
      )
    }else{
  await ProviderModel.findByIdAndUpdate(  
        providerId,
        { $push: { messages: {
          message:
          {
            _id: message.messageId,
            providerId: providerId,
            clientId: providerOrClientId,
            name: null,
            message: message.message,
            response: false
          }
        } } }, // Push the message object into messages array directly
        { new: true } // Return the updated document
      );

      await ProviderModel.findByIdAndUpdate(
        providerId,
        { $push: { messages: { 
          message:
          {
            _id: message.messageId,
            providerId: providerId, 
            clientId: providerOrClientId,
            name: clientName,
            message: message.message,
            response: false
          }
        } } },
         // Push the message object into messages array directly
        { new: true } // Return the updated document
      );
      await ClientModel.findByIdAndUpdate(
        providerOrClientId,
        {
          $push: {
            messages: {
              message: {
                _id: message.messageId,
                providerId: providerId, 
                clientId: providerOrClientId,

                message: message.message,
                response: true
              }
            }
          }
        },
        {new: true}
        
      )

      await ProviderModel.findByIdAndUpdate(
        providerId,
        {
          $set: {
            newMessage : true
          }
        },
        {new: true}
      )
    }


    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    res.status(200).json(provider); // Send the updated provider document as response
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMessagesFromClientIntoProvider = async(req, res) => {
    const provider = await ProviderModel.findById(providerOrClientId)

    res.send(provider?.messages)
}

export const sendProviderToClientMessage = async(req, res) => {
  let NameExist = false;
  let message = JSON.stringify(req.body.message)
  message = message.replace(/"/g, "")
  let id = JSON.stringify(req.body._id)
  id = id.replace(/"/g, "")

   clientId = JSON.stringify(req.params.id)
   clientId = clientId.replace(/"/g, "")
   providerId = providerOrClientId
  const provider = await ProviderModel.findById(providerOrClientId)
  const providerName = provider?.name
  const client = await ClientModel.findById(clientId)
  client?.messages?.map((message) => providerName === message.message.name ? NameExist = true : null)
  if(!NameExist){
    await ClientModel.findByIdAndUpdate(
      clientId,
      { $push: { messages: { 
        message:
        { 
          _id: id,
          providerId: providerOrClientId,
          clientId: clientId,
          name: providerName,
          message: message,
          response: false
          
        }
      } } }, // Push the message object into messages array directly
      { new: true } // Return the updated document
    );

    await ClientModel.findByIdAndUpdate(
      clientId,
      {
        $set: {
          newMessage: true
        }
      },
      {new: true}

    )


    await ProviderModel.findByIdAndUpdate(
      providerOrClientId,
      { $push: { messages: {
        message:
        {
          _id: id,
          providerId: providerOrClientId,
          clientId: clientId,
          name: null,
          message: message,
          response: true
        }
      } } }, // Push the message object into messages array directly
      { new: true } // Return the updated document
    );
  }else{
    let message = JSON.stringify(req.body.message)
    message = message.replace(/"/g, "")
    let id = JSON.stringify(req.body._id)
    id = id.replace(/"/g, "")
    clientId = JSON.stringify(req.params.id)
    clientId = clientId.replace(/"/g, "")
    await ClientModel.findByIdAndUpdate(
      clientId,
      { $push: { messages: {
        message:
        { 
          _id: id,
          providerId: providerOrClientId,
          clientId: clientId,
          name: null,
          message: message
        }
      } } }, // Push the message object into messages array directly
      { new: true } // Return the updated document
    );


    await ProviderModel.findByIdAndUpdate(
      providerId,
      { $push: { messages: {
        message:
        {
          providerOrClientId,
          providerId: providerOrClientId,

          name: null,
          message: message,
          response: true
        }
      } } }, // Push the message object into messages array directly
      { new: true } // Return the updated document
    );
    await ClientModel.findByIdAndUpdate(
      clientId,
      {
        $set: {
          newMessage: true
        }
      },
      {new: true}

    )
  }



}

export const getProviderToClientMessagesInClient = async(req, res) => {
  try{
    const client = await ClientModel.findById(providerOrClientId);
    const messages = client?.messages
    res.send(messages)
  }catch(error){

  }

}



 export const createPayment = async(req, res) => {
   const {amount ,  description} = req.body;

   const paymentData = {
     intent: 'sale',
     payer: {
       payment_method: 'paypal',
     },
     redirect_urls: {
       return_url: 'http://localhost:3000/pay/success',
       cancel_url: 'http://localhost:3000/pay/cancel',
     },
     transactions: [{
       amount: {
         total: amount,
         currency: 'USD',
       },
       description: description,
     }],
   };

  
   try {
     const createPayment = await new Promise((resolve, reject) => {
       paypal.payment.create(paymentData, (err, payment) => {
         if (err) {
           reject(err);
         } else {
           resolve(payment);
         }
       });
     });

     // Redirect user to PayPal approval URL
     const approvalUrl = createPayment.links.find(link => link.rel === 'approval_url').href;
     res.json({ approvalUrl });

   } catch (error) {
     console.error('Error creating PayPal payment:', error);
     res.status(500).json({ error: 'Failed to create PayPal payment.' });
   }
 }



 export const executePayment = (async(req, res) => {
 let paymentId;
 let payerId;

 paymentId = JSON.stringify(req.body.paymentId)
 paymentId = paymentId.replace(/"/g, "")
 console.log('payment id => '+ paymentId)
 payerId = JSON.stringify(req.body.payerId)
 payerId = payerId.replace(/"/g, "")
   const executePayment = {
     payer_id: payerId,
   }

   try {

     const execute = await new Promise((resolve, reject) => {
       paypal.payment.execute(paymentId, executePayment, (err, payment) => {
       if (err) {
          reject(err);
       } else {
          resolve(payment);
        }
       });
   });

    // Handle successful payment execution
     res.json({ status: 'success', payment: execute }); // Return the executed payment object
   } catch (error) {
     console.error('Error executing PayPal payment:', error);
     res.status(500).json({ error: 'Failed to execute PayPal payment.' });
   }
 })






// Replace 'client_id' and 'client_secret' with your actual client ID and secret.


const environment = new paypal1.core.SandboxEnvironment('AVEn3nBYjQAyOXF04lpnR3bWbntfcMfM_uQhY5nU06SHlEvA4APSVd0pg2q_5AU-wXazchW22nDQhqIJ','EOz1wNXUP9FNLnTfpb3QasBcKO_8oEmaZdBpnl-cldFgWy8QTc0SqvB1E-OVjYP61pYQwy1Xfe440nCE');
const client = new paypal1.core.PayPalHttpClient(environment);


export const payProvider = async function createPayout(req, res) {
  const providerShare = req.body.providerAmount
  const provider = await ProviderModel.findById(req.params)
  const request = new paypal1.payouts.PayoutsPostRequest();
  request.requestBody({
    sender_batch_header: {
      sender_batch_id: 'batch_' + Math.random().toString(36).substring(9),
      email_subject: 'You have a payment',
      email_message: 'You have received a payment. Thanks for using our service!'
    },
    items: [{
      recipient_type: 'EMAIL',
      amount: {
        value: providerShare,
        currency: 'USD'
      },
      receiver: provider.paypal_email, // Replace with the recipient's email address.
      note: 'Thank you!',
      sender_item_id: 'item_1'
    }]
  });

  try {
    const response = await client.execute(request);

  } catch (err) {
    console.error('Failed to create payout:', err);
  }
}

export const deleteImageCertificate = async (req, res) => {
  try {
    let  imageCertificateId=  JSON.stringify(req.params.id).replace(/"/g, "")




    // Find the provider by ID
    const provider = await ProviderModel.findById(providerOrClientId);

    if (!provider) {
      return res.status(404).send('Provider not found');
    }

    // Filter out the image certificate that matches the given ID
    provider.imageCertifications = provider?.imageCertifications?.filter(
      (imageCertificate) => imageCertificate.imageCertificate.imageCertificationId !== imageCertificateId
    );
    
    // Save the updated provider document
    await provider.save();

    res.status(200).send('Image certificate deleted successfully');
  } catch (error) {
    console.error('Error deleting image certificate:', error);
    res.status(500).send('Internal server error');
  }
};







export const deletePdfCertificate = async (req, res) => {
  try {
    let  pdfCertificateId=  JSON.stringify(req.params.id).replace(/"/g, "")




    // Find the provider by ID
    const provider = await ProviderModel.findById(providerOrClientId);

    if (!provider) {
      return res.status(404).send('Provider not found');
    }

    // Filter out the image certificate that matches the given ID
    provider.pdfCertifications = provider.pdfCertifications.filter(
      (pdfCertificate) => pdfCertificate.pdfCertificate.id !== pdfCertificateId
    );

    // Save the updated provider document
    await provider.save();

    res.status(200).send('Image certificate deleted successfully');
  } catch (error) {
    console.error('Error deleting image certificate:', error);
    res.status(500).send('Internal server error');
  }
};



export const deleteImageExperience = async (req, res) => {
  try {
    let  imageExperienceId=  JSON.stringify(req.params.id).replace(/"/g, "")




    // Find the provider by ID
    const provider = await ProviderModel.findById(providerOrClientId);

    if (!provider) {
      return res.status(404).send('Provider not found');
    }

    // Filter out the image certificate that matches the given ID
    provider.imageExperiences = provider.imageExperiences.filter(
      (imageExperience) => imageExperience.imageExperience.id !== imageExperienceId
    );

    // Save the updated provider document
    await provider.save();

    res.status(200).send('Image certificate deleted successfully');
  } catch (error) {
    console.error('Error deleting image certificate:', error);
    res.status(500).send('Internal server error');
  }
};


export const deletePdfExperience = async (req, res) => {
  try {
    let  pdfExperienceId=  JSON.stringify(req.params.id).replace(/"/g, "")




    // Find the provider by ID
    const provider = await ProviderModel.findById(providerOrClientId);

    if (!provider) {
      return res.status(404).send('Provider not found');
    }

    // Filter out the image certificate that matches the given ID
    provider.pdfExperiences = provider.pdfExperiences.filter(
      (pdfExperience) => pdfExperience.pdfExperience.id !== pdfExperienceId
    );

    // Save the updated provider document
    await provider.save();

    res.status(200).send('Image certificate deleted successfully');
  } catch (error) {
    console.error('Error deleting image certificate:', error);
    res.status(500).send('Internal server error');
  }
};




export const showClientPosts = async (req, res) => {
  try {
    // Extract clientId from URL parameters
    const clientId = req.params.id;
    console.log('clientId at back ===> ' + clientId);

    if (!clientId) {
      return res.status(400).send({ error: 'clientId is required' });
    }

    // Find all posts where clientId matches
    const posts = await PostsModel.find({ clientId: providerOrClientId });

    // Send the posts back in the response
    res.send(posts);
  } catch (error) {
    console.error('Error retrieving posts:', error);
    // Send an error response in case something goes wrong
    res.status(500).send({ error: 'Failed to retrieve posts' });
  }
};



export const deletePost = async(req, res) => {
  const postId = req.params.id

  await PostsModel.findByIdAndDelete(postId)
}

export const deleteProviderMessage = async(req, res) => {
  const messageId = req.params.id
  
  const provider = await ProviderModel.findById(providerOrClientId);

  provider.messages =  provider.messages.filter((message) => message.message._id !== messageId)
   await provider.save();

}

export const deleteClientMessage = async(req, res) => {
  const messageId = req.params.id

  const client = await ClientModel.findById(providerOrClientId)
  client.messages = client.messages.filter((message) => message.message._id !== messageId)
  await client.save()
}
  
export const sendInvite = async(req, res) => {
  const providerEmail = req.body.providerEmail
 
  const client = await ClientModel.findById(providerOrClientId)

  const provider = await ProviderModel.findOne({email: providerEmail})
  if (provider){
    provider.invitaions.push({
      invitaion: {
        invitorClientName: client.name,
        invitaionContent: req.body.message
      }
    })
    
    await provider.save();
    await ProviderModel.findByIdAndUpdate(
      provider._id,
      {
        $set: {
          newInvite: true
        }
  
      },
      {new: true}
  
    )
    console.log(provider)
    res.send (true)
  }else{
    
  }

}

export const getInvitations = async(req, res) => {
  const provider = await ProviderModel.findById(providerOrClientId)
  res.send(provider.invitaions)
}

export const getInvitationContent = async(req, res) => {

  
  const provider = await ProviderModel.findById(providerOrClientId)
   const choosenInvitation = await provider.invitaions.map((invitation) => {
    if(JSON.stringify(invitation._id) === JSON.stringify(choosenInvitationId)){
      return invitation
    }
   })

   res.send(choosenInvitation)
}

export const sendChoosenInvitationId = async(req, res) => {
    choosenInvitationId = req.params.id

}

payProvider

export const insertReport = async (req, res) => {
  try {
    const provider = await ProviderModel.findOne({ email: req.body.providerEmail });
    


    const client = await ClientModel.findById(providerOrClientId);
    
if(provider){
  const providerId = provider._id;

  const updatedProvider = await ProviderModel.findByIdAndUpdate(
    providerId,
    {
      $push: {
        reports: {
          report: {
            clientName: client.name,
            clientEmail: client.email,
            report: req.body.report,
          },
        },
      },
    },
    { new: true }
  );
  res.send(true)
}








  } catch (error) {

  }
};


export const getReport = async(req, res) => {
    providerId = providerOrClientId;
    const provider = await ProviderModel.findById(providerId)
    const reports = provider.reports
    console.log(reports)
    res.send(reports)
}


export const deleteBlog = async (req, res) => {
  await ProviderModel.findByIdAndUpdate(
    providerOrClientId,
    {
      blog: {
        name: '',
        picture: {
          
          data: '',

        }

      }
    },
    {new: true}
  )
};

export const checkClientNewMessages = async(req, res) => {
  const client = await ClientModel.findById(providerOrClientId)
   res.send(client?.newMessage)
}
export const cancelClientNewMessages = async(req, res) => {
  await ClientModel.findByIdAndUpdate(
    providerOrClientId,
    {
      $set: {
        newMessage: false
      }
    },
    {new: true}
  )
}

export const checkProviderNewMessages = async(req, res) => {

  const provider = await ProviderModel.findById(providerOrClientId)
  console.log('provider new message state====> '+provider.newMessage)
  res.send(provider.newMessage)
}

export const cancelProviderNewMessages = async(req, res) => {
  await ProviderModel.findByIdAndUpdate(
    providerOrClientId, 
    {
      $set: {
        newMessage: false
      }
    },
    {new: true}
  )
}



export const checkProviderNewInvites = async(req, res) => {

  const provider = await ProviderModel.findById(providerOrClientId)
  console.log('provider new message state====> '+provider.newInvite)
  res.send(provider.newInvite)
}

export const cancelProviderNewInvites = async(req, res) => {
  await ProviderModel.findByIdAndUpdate(
    providerOrClientId, 
    {
      $set: {
        newInvite: false
      }
    },
    {new: true}
  )
}


export const checkClientNewProposals = async(req, res) => {
  const client = await ClientModel.findById(providerOrClientId)
   res.send(client?.newProposal)
}
export const cancelClientNewProposals = async(req, res) => {
  await ClientModel.findByIdAndUpdate(
    providerOrClientId,
    {
      $set: {
        newProposal: false
      }
    },
    {new: true}
  )
}

export const insertClientPicture = async(req, res) => {

  try {
    await ClientModel.findByIdAndUpdate(
       providerOrClientId,
      {$set: {picture: {
        name: req.body.name,
        picture: {
          data: req.file.buffer,
          contentType: req.file.mimetype
        }
       
      }}},
      {new: true}
    )

  } catch (error) {
    
  }
}


export const getClientProfilePicture = async (req, res) => {
  try {

    if (!providerOrClientId) {
      return res.status(400).send('Provider ID is required');
    }


      const client = await ClientModel.findById(providerOrClientId);
    
    if (!client || !client.picture || !client.picture.picture) {
      return res.status(404).send('Profile picture not found');
    }

    res.set('Content-Type', client.picture.picture.contentType);
    res.send(client.picture.picture.data);
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
};
sendProviderToClientMessage
export const getClientProfileData = async(req, res) => {
 
  const client = await ClientModel.findById(providerOrClientId);


res.json(client)

}

export const insertClientCategory = async (req, res) => {
  const categoriesFromFront = req.body;

   // Assuming you get providerOrClientId from req.user


  try {
    for (const categoryFromFront of categoriesFromFront) {
      await ClientModel.findByIdAndUpdate(
         providerOrClientId ,
        { $push: { categories: categoryFromFront } },
        { new: true }
      );
    }
    res.status(200).send({ message: "Categories updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "An error occurred while updating categories" });
  }
};

export const getRelatedProviders = async(req, res) => {
  let relatedProviders = [];
  const client = await ClientModel.findById(providerOrClientId)
  const allProviders = await ProviderModel.find()
 allProviders.map((provider) => 
  provider.categories.map((providerCategory) => client.categories.map((clientCategory) => 
  
    clientCategory === providerCategory && !relatedProviders.includes(provider) &&
  
    relatedProviders.push(provider)
  
  ))
  )

  await res.send(relatedProviders)
}
getProfilePDF
export const insertPaypalEmail = async(req, res) => {
  const paypalEmail= req.body.paypalEmail

  await ProviderModel.findByIdAndUpdate(
    providerOrClientId,
    {
       $set: {
         paypal_email: paypalEmail
       }
     },
     {new: true}
   )
}


export const getProfileIMAGE4client = async(req,res) => {

  providerId = req.params.id
  console.log('providerId ===========================>   '+providerId)
  try {

    if (!providerId) {
      return res.status(400).send('Provider ID is required');
    }

    const provider = await ProviderModel.findById(providerId)

    if (!provider) {
      return res.status(404).send('Provider not found');
    }
    const providerImageCertifications = provider?.imageCertifications;
    const providerImageCertificationsImageCertificateData = providerImageCertifications?.map(imageCertificate => {
      return {
        data: imageCertificate.imageCertificate.data.toString('base64'), // Convert binary to base64 string
        contentType: imageCertificate.imageCertificate.contentType,
        imageCertificationId: imageCertificate.imageCertificate.imageCertificationId
      };
    });

    res.json(providerImageCertificationsImageCertificateData);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
}

export const getProfilePDF4Client = async(req, res) => {
 providerId = req.params.id
 
  const provider= await ProviderModel.findById(providerId)




    
    const providerPdfCertifications = provider.pdfCertifications;
    const providerPdfCertificationsPdfCertificateData = providerPdfCertifications.map(pdfCertificate => {
      return {
        data: pdfCertificate.pdfCertificate.data.toString('base64'), // Convert binary to base64 string
        contentType: pdfCertificate.pdfCertificate.contentType,
        id: pdfCertificate.pdfCertificate.id
      };
    });

    res.json(providerPdfCertificationsPdfCertificateData);
    

}


export const getExperiencePDF4Client = async(req, res) => {
   providerId = req.params.id
  const provider = await ProviderModel.findById(providerId)



  const providerPdfExperiences = provider.pdfExperiences;
  const providerPdfExperiencesPdfExperienceData = providerPdfExperiences.map(pdfExperience => {
    return {
      data: pdfExperience.pdfExperience.data.toString('base64'), // Convert binary to base64 string
      contentType: pdfExperience.pdfExperience.contentType,
      id: pdfExperience.pdfExperience.id
    };
  });

  res.json(providerPdfExperiencesPdfExperienceData);
}



export const getExperienceIMAGE4Client = async(req, res) => {
   providerId = req.params.id
  const provider = await ProviderModel.findById(providerId)

  const providerImageExperiences = provider?.imageExperiences;
  const providerImageExperiencesImageExperienceData = providerImageExperiences?.map((imageExperience) => {
    return {
      data: imageExperience.imageExperience.data.toString('base64'), // Convert binary to base64 string
      contentType: imageExperience.imageExperience.contentType,
      id: imageExperience.imageExperience.id
    };
  });

  res.json(providerImageExperiencesImageExperienceData);
  
}



export const getBlog4Client = async(req, res) => {
   providerId = req.params.id
  const provider = await ProviderModel.findById(providerId)

  res.set('Content-Type', provider.blog.picture.contentType)
  res.send(provider.blog.picture.data)
}



export const getProfileData4Client = async(req, res) => {
   providerId = req.params.id
  const provider = await ProviderModel.findById(providerId)



  res.json(provider)


}




export const getProfilePicture4Client = async(req, res) => {
   providerId = req.params.id
  const provider = await ProviderModel.findById(providerId)




  
  if (!provider || !provider.picture || !provider.picture.picture) {
    return res.status(404).send('Profile picture not found');
  }

  res.set('Content-Type', provider.picture.picture.contentType);
  res.send(provider.picture.picture.data);

}



export const getReport4Client = async(req, res) => {
   providerId = req.params.id
  const provider = await ProviderModel.findById(providerId)

  const reports = provider.reports
  console.log(reports)
  res.send(reports)

}


export const insertInviteAcceptance = async(req, res) =>{
  const provider = await ProviderModel.findById(providerOrClientId)
  console.log('clientID =================================>   '+req.params)
  await ClientModel.findByIdAndUpdate(
    req.params,
    {
      $push: {
        invitationAcceptances : {
          invitationAcceptance: {
            providerId: providerOrClientId,
            providerName: provider.name,
            providerEmail: provider.email,
            clientId: req.params
          }
        }
      }
    },
    {new: true}
  )
}