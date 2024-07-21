import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainHome from './Client/ClientHome/MainHome.js';
import SignUpLogin from './auth/SignUpLogin';
import SignUp from './auth/SignUp';
import DetermineSignUp from './auth/DetermineSignUp';
import TeacherSignUp from './Provider/ProviderSignUp/TeacherSignUp.js';
import Inviting from './Client/ClientHome/Inviting.js';
import Term from './Client/postingProcess/Term.js';
import Title from './Client/postingProcess/Title.js';
import Skills from './Client/postingProcess/Skills.js';
import Scope from './Client/postingProcess/Scope.js';
import Experience from './Client/postingProcess/Experience.js';
import Pudget from './Client/postingProcess/Pudget.js';
import Description from './Client/postingProcess/Description.js';
import Overview from './Client/postingProcess/Overview.js';
import TypeOfWork from './Provider/ProviderSignUp/TypeOfWork.js';
import Picture from './Provider/ProviderSignUp/Picture.js';
import Letter from './Provider/ProviderSignUp/Letter.js';
import Certifications from './Provider/ProviderSignUp/Certifications.js';
import PreviousExperience from './Provider/ProviderSignUp/PreviousExperience.js';
import RatePerHour from './Provider/ProviderSignUp/RatePerHour.js';


import PMainHome from './Provider/ProviderHome/PMainHome.js';
import ClientNotifications from './Client/ClientNotifications/ClientNotifications.js';
import ProposalAtClient from './Client/ProposalAtClient/ProposalAtClient.js';
import ProviderProposal from './auth/ProviderProposal/ProviderProposal.js';
import Accept from './Client/Accept/Accept.js';
import ClientMessages from './Client/ClientMessages/ClientMessages.js';
import Paypal from './Payment/Paypal/Paypal.js';
import Payment from './Payment/Payment.js'
import ChooseMethod from './Payment/ChooseMethod.js';
import Cancel from './auth/Cancel.js';
import ProviderMessages from './Provider/ProviderMessages.js/ProviderMessages.js';
import ProviderToClientMessage from './Provider/ProviderMessages.js/ProviderToClientMessage.js';
import ReceivedMessages1Client from './Client/ReceivedMessagesClient/ReceivedMessages1Client.js';
import ReceivedMessages2Client from './Client/ReceivedMessagesClient/ReceivedMessages2Client.js';
import PaymentRegister from './Provider/ProviderSignUp/PaymentRegister.js';
import PaymentSuccess from './Payment/Paypal/PaymentSuccess.js';
import PaymentCancel from './Payment/Paypal/PaymentCancel.js';
import { useEffect } from 'react';
import ProviderProfile4Provider from './Provider/ProviderProfile4Provider/ProviderProfile4Provider.js';
import ProviderProfile from './Client/providerProfile/ProviderProfile.js';
import ClientPosts from './Client/ClientPosts/ClientPosts.js';
import ProviderInvitaions from './Provider/ProviderInvitaions/ProviderInvitaions.js';
import ProviderInvitation2 from './Provider/ProviderInvitaions/ProviderInvitation2.js';
import MakeReport from './Client/MakeReport/MakeReport.js';
import Blog from './Provider/ProviderSignUp/Blog.js';
import ClientSignUp from './Client/ClientSignUp/ClientSignUp.js';
import ClientProfilePicture from './Client/ClientSignUp/ClientProfilePicture.js';
import ClientCategory from './Client/ClientSignUp/ClientCategory.js';
import ProviderReports from './Provider/ProviderReports/ProviderReports.js';
import CertainProvider from './Client/CertainProvider/CertainProvider.js';
import InvitationAcceptance from './Client/InvitationAcceptance/InvitationAcceptance.js';








function App() {
  let authpermission;
  useEffect(() => {
    authpermission = localStorage.getItem('authenticated')
  }, [authpermission])
    return (
    
     <Routes>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/auth" element={<SignUpLogin />} />
      
  
     <Route path="/client" element={<MainHome/>} />

      
      {
        console.log('auth from inside => '+   authpermission )
      }
      
        <Route path="/client-sign-up" element={<ClientSignUp />} />

      <Route path="/provider" element={<PMainHome/>} />
      <Route path="/provider-sign-up" element={<TeacherSignUp />} />
      <Route path="/sign-up-client-provider" element={<DetermineSignUp />} />
      {
       <Route path="*" element={<Navigate to="/auth" />} /> 
      }
    
      <Route path="/inviting" element={<Inviting/>}/>
      <Route path="/posting-term" element={<Term/>}/>
      <Route path="/posting-title" element={<Title/>}/>
      <Route path="/posting-skills" element={<Skills/>}/>
      <Route path="/posting-scope" element={<Scope/>}/>
      <Route path="/posting-experience" element={<Experience/>}/>
      <Route path="/posting-pudget" element={<Pudget/>}/>
      <Route path="/posting-description" element={<Description/>}/>
      <Route path="/posting-overview" element={<Overview/>}/>
      <Route path="/type-of-work" element={<TypeOfWork/>}/>
      <Route path="/profile-picture" element={<Picture/>}/>
      <Route path="/letter" element={<Letter/>}/>
      <Route path="/certifications" element={<Certifications/>}/>
      <Route path="/previous-experience" element={<PreviousExperience/>}/>
      <Route path="/rate-per-hour" element={<RatePerHour/>}/>

      <Route path="/blog" element={<Blog/>}/>
      <Route path="/provider-profile-4client" element={<ProviderProfile/>}/>
      <Route path="/notifications" element={<ClientNotifications/>}/>
      <Route path="/proposal" element={<ProposalAtClient/>}/>
      <Route path="/make-proposal" element={<ProviderProposal/>}/>
      <Route path="/accept" element={<Accept/>}/>
      <Route path="/client-messages" element={<ClientMessages/>}/>
      <Route path="/choose-method" element={<ChooseMethod/>}/>
      <Route path="/Stripe" element={<Payment/>}/>
      <Route path="/paypal" element={<Paypal/>}/>
      <Route path="/cancel" element={<Cancel/>}/>
      <Route path="/provider-messages" element={<ProviderMessages/>}/>
      <Route path="/provider-client-messaging" element={<ProviderToClientMessage/>}/>
      <Route path="/client-received-messages" element={<ReceivedMessages1Client/>}/>
      <Route path="/client-access-messages" element={<ReceivedMessages2Client/>}/>
      <Route path="/pay/success" element ={<PaymentSuccess/>}/>
      <Route path="/pay/cancel" element={<PaymentCancel/>}/>
      <Route path="/client-profile-picture" element={<ClientProfilePicture/>}/>
      <Route path="/provider-profile-4provider" element={<ProviderProfile4Provider/>}/>
      <Route path="/client-posts" element= {<ClientPosts/>}/>
      <Route path="/provider-invitaions" element={<ProviderInvitaions/>}/>
      <Route path="/choosen-invitation" element={<ProviderInvitation2/>}/>
      <Route path="/report" element={<MakeReport/>}/>
      <Route path="client-category" element={<ClientCategory/>}/>
      <Route path="/payment-register" element={<PaymentRegister/>}/>
      <Route path="/my-reports" element={<ProviderReports/>}/>
      <Route path="/certain-provider" element={<CertainProvider/>}/>
      <Route path="/invitation-acceptance" element={<InvitationAcceptance/>}/>
    </Routes>

   
  );
}

export default App;
