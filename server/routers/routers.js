import express from 'express'
import cors from 'cors'
import { handleClientSignIn, handleClientSignUp, handleProviderSignUp, verify, insertPost, getPosts, insertCategory, insertLetter, insertPicture,  addRate, addCourse, getProfileData, getProfilePicture, insertImageCertificate, insertPdfCertificate, getProfileIMAGE, getProfilePDF, handleProviderSignIn, insertPdfExperience, insertImageExperience, getImageExperience, getPdfExperience, insertProviderToClient, getProviderData, submitProposal, getProposals, getProposalId,  sendMessageFromClientToProvider, getMessagesFromClientIntoProvider, sendProviderIdToFront,  sendProviderToClientMessage, getProviderToClientMessagesInClient,  payProvider, createPayment, executePayment, deleteImageCertificate, deletePdfCertificate, deletePdfExperience, deleteImageExperience, showClientPosts, sendProviderOrClientId, deletePost, deleteProviderMessage, deleteClientMessage, sendInvite, getInvitations, getInvitationContent, sendChoosenInvitationId, getReport, insertReport, deleteBlog, getBlog, addBlog, checkClientNewMessages, cancelClientNewMessages, checkProviderNewMessages, cancelProviderNewMessages, cancelProviderNewInvites, checkProviderNewInvites, checkClientNewProposals, cancelClientNewProposals, insertClientPicture, getClientProfilePicture, getClientProfileData, insertClientCategory, getRelatedProviders, insertPaypalEmail, getProfilePDF4Client, getExperienceIMAGE4Client, getBlog4Client, getProfileData4Client, getProfilePicture4Client, getReport4Client, insertInviteAcceptance} from '../controllers/controllers.js'
import upload from '../middlewares/upload.js'




const router = express.Router()

router.post('/api/endpoints/clientSignIn',cors(), handleClientSignIn )
router.post('/api/endpoints/providerSignIn',cors(), handleProviderSignIn )
router.post('/api/endpoints/clientSignUp', cors(), handleClientSignUp)
router.post('/api/endpoints/providerSignUpData',cors(), handleProviderSignUp)
router.post('/api/endpoints/insertPost', cors(), insertPost)
router.get('/api/endpoints/getPosts', cors(), getPosts)
router.post('/api/endpoints/category', cors(), insertCategory)
router.post('/api/endpoints/insertLetter', cors(),insertLetter )
router.post('/api/endpoints/insertPicture', cors(),upload.single('picture'), insertPicture)
router.post('/api/endpoints/insertImageCertificate', cors(),upload.single('image'), insertImageCertificate)
router.post('/api/endpoints/insertPdfCertificate', cors(),upload.single('pdf'), insertPdfCertificate)
router.post('/api/endpoints/addRate', cors(), addRate)
router.post('/api/endpoints/addCourse', cors(), addCourse)
router.get('/api/endpoints/getProfileData', cors(), getProfileData)
router.get('/api/endpoints/getProfilePicture', cors(), getProfilePicture)
router.get('/api/endpoints/getProfileIMAGE', cors(),getProfileIMAGE )
router.get('/api/endpoints/getProfilePDF', cors(), getProfilePDF)
router.post('/api/endpoints/insertPdfExperience', cors(),upload.single('experiencePdf'), insertPdfExperience)
router.post('/api/endpoints/insertImageExperience', cors(),upload.single('experienceImage'), insertImageExperience)
router.get('/api/endpoints/getExperienceIMAGE', cors(), getImageExperience)
router.get('/api/endpoints/getExperiencePDF', cors(), getPdfExperience)
router.post('/api/endpoints/insertProviderToClient/:id', cors(), insertProviderToClient)
router.get('/api/endpoints/incomingProviderData', cors(), getProviderData)
router.post('/api/endpoints/submitProposal', cors(), submitProposal)
router.get('/api/endpoints/getProposals',cors(), getProposals )
router.post('/api/endpoints/proposalId/:id', getProposalId)
router.post('/api/endpoints/sendMessageFromClientToProvider/:id', cors(), sendMessageFromClientToProvider)
router.get('/api/endpoints/getMessagesFromClientIntoProvider', cors(), getMessagesFromClientIntoProvider)
router.post('/api/endpoints/sendProviderIdToFront', cors() ,sendProviderIdToFront)
router.post('/api/endpoints/sendProviderToClientMessage/:id', cors(), sendProviderToClientMessage)
router.get('/api/endpoints/getProviderToClientMessagesInClient', cors(), getProviderToClientMessagesInClient)
router.get('/api/endpoints/verifyClient', cors(), verify)
router.get('/api/endpoints/verifyProvider', cors(), verify)
 router.post('/api/pay/create', createPayment)
 router.post('/api/pay/execute', executePayment)
router.post('/api/endpoints/payProvider', payProvider)
router.post('/api/endpoints/addBlog',cors(),upload.single('image'), addBlog)
router.get('/api/endpoints/getBlog', getBlog)
router.delete('/api/endpoints/deleteImageCertificate/:id',cors(), deleteImageCertificate)
router.delete('/api/endpoints/deletePdfCertificate/:id',cors(), deletePdfCertificate)
router.delete('/api/endpoints/deleteImageExperience/:id', cors(), deleteImageExperience)
router.delete('/api/endpoints/deletePdfExperience/:id', cors(), deletePdfExperience)
router.get('/api/endpoints/showClientPosts/:id', cors(), showClientPosts);
router.get('/api/endpoints/providerOrClientId', cors(), sendProviderOrClientId)
router.delete('/api/endpoints/deletePost/:id', cors(), deletePost)
router.delete('/api/endpoints/deleteProviderMessage/:id', cors(), deleteProviderMessage)
router.delete('/api/endpoints/deleteClientMessage/:id', cors(), deleteClientMessage)
router.post('/api/endpoints/sendInvite', cors(), sendInvite)
router.get('/api/endpoints/getInvitations', getInvitations)
router.get('/api/endpoints/getInvitationContent', cors(), getInvitationContent)
router.post('/api/endpoints/sendChoosenId/:id',cors(), sendChoosenInvitationId)
router.post('/api/endpoints/insertReport', cors(), insertReport)
router.get('/api/endpoints/getReport', cors(), getReport)
router.patch('/api/endpoints/deleteBlog', cors(), deleteBlog)
router.get('/api/endpoints/checkClientNewMessage', cors(), checkClientNewMessages)
router.patch('/api/endpoints/cancelClientNewMessages', cors(), cancelClientNewMessages)
router.get('/api/endpoints/checkProviderNewMessages', cors(), checkProviderNewMessages)
router.patch('/api/endpoints/cancelProviderNewMessages', cors(), cancelProviderNewMessages)
router.get('/api/endpoints/checkProviderNewInvites', cors(), checkProviderNewInvites)
router.patch('/api/endpoints/cancelProviderNewInvites', cors(), cancelProviderNewInvites)
router.get('/api/endpoints/checkClientNewProposals', cors(), checkClientNewProposals)
router.patch('/api/endpoints/cancelClientNewProposals', cors(), cancelClientNewProposals)
router.post('/api/endpoints/insertClientPicture',  cors(),upload.single('picture'), insertClientPicture)
router.get('/api/endpoints/getClientProfilePicture', cors(), getClientProfilePicture)
router.get('/api/endpoints/getClientProfileData', cors(), getClientProfileData)
router.post('/api/endpoints/clientCategory', cors(), insertClientCategory)
router.get('/api/endPoints/getRelatedProviders', cors(), getRelatedProviders)
router.post('/api/endpoints/insertPaypalEmail', cors(), insertPaypalEmail)

  
router.get('/api/endpoints/getProfileIMAGE4Client/:id', cors(), )
router.get('/api/endpoints/getProfilePDF4Client/:id', cors(), getProfilePDF4Client)
router.get('/api/endpoints/getExperiencePDF4Client/:id', cors(), getExperienceIMAGE4Client)
router.get('/api/endpoints/getExperienceIMAGE4Client/:id', cors(), getExperienceIMAGE4Client)
router.get('/api/endpoints/getBlog4Client/:id', cors(), getBlog4Client)
router.get('/api/endpoints/getProfileData4Client/:id', cors(), getProfileData4Client)
router.get('/api/endpoints/getProfilePicture4Client/:id', cors(), getProfilePicture4Client)
router.get('/api/endpoints/getReport4Client/:id', cors(), getReport4Client)
router.post('https://sell-skill.com/api/endpoints/inserInviteAcceptance/:id', cors(),  insertInviteAcceptance)


export default router;

