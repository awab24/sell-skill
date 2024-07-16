import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allowed: false,
  authentication: false,
  overview: {_id:'', term:'', title:'', skills:[], estimate:'', experience:'', pudget:'', description:''},

  proposalId: '',
  clientId: '',
  clientName:'',
  providerId: '',
  specificSender: '',
  amount: 1,
  allowClient:false,
  allowProvider: false,
  providerOrClientId:'',
  invitationId: '',
  oldMessagesLength: (null)

}
const slice = createSlice({
  name: 'allow',
  initialState,
  reducers: {
    allowClientHome: (state, action) => {
      state.allowed = action.payload;
    },
    changeAuth: (state, action) => {
      state.authentication = action.payload
    },
    setOverviewId: (state, action)=>{
      state.overview = action.payload
    },
    setOverviewTerm: (state, action)=>{
      state.overview = action.payload
    },
    setOverviewTitle: (state, action)=>{
      state.overview = action.payload
    },
    setOverviewSkills: (state, action)=>{
      state.overview = action.payload
    },
    setOverviewEstimate: (state, action)=>{
      state.overview = action.payload
    },
    setOverviewExperience: (state, action)=>{
      state.overview = action.payload
    },
    setOverviewPudget: (state, action)=>{
      state.overview = action.payload
    },
    setOverviewDescription: (state, action)=>{
      state.overview = action.payload
    },
    setProviderInfo: (state, action) => {
      state.ProviderInfo = action.payload
    },
    setId: (state, action) => {
      state.providerId = action.payload
    },
    setProposalId: (state, action) => {
      state.proposalId = action.payload
    },
    setProviderId: (state, action) => {
      state.providerId = action.payload
    },
    setClientId: (state, action) => {
        state.clientId = action.payload
    },
    setClientName: (state, action) => {
      state.clientName = action.payload
    },
    setSpecificSender: (state, action) => {
      state.specificSender = action.payload
    },
      setAmount: (state, action) => {
        state.amount = action.payload
      },
      makeAllowClient: (state, action) => {
        state.allowClient = action.payload
      },
      makeAllowProvider: (state, action) => {
        state.allowProvider = action.payload
      },
      setProviderOrClientId: (state, action) => {
        state.providerOrClientId = action.payload
      },
      setInvitationId: (state, action) => {
        state.invitationId = action.payload
      },
      setOldMessagesLength: (state, action) => {
        state.oldMessagesLength = action.payload
      }

  },
});

export const { allowClientHome, changeAuth, setOverviewId, setOverviewTerm,  setOverviewTitle,setOverviewSkills, setOverviewEstimate,setOverviewPudget, setOverviewExperience, setOverviewDescription,setProviderInfo, setId, setProposalId , setClientId ,setProviderId, setClientName, setSpecificSender, setAmount, makeAllowClient, makeAllowProvider , setProviderOrClientId, setInvitationId, setOldMessagesLength} = slice.actions;
export const allowReducer = slice.reducer; // Corrected export
