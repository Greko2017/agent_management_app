
const ParticipantAccountParticipant = require("../models/participant_account_participants");
const ParticipantAccount = require("../models/participant_account");
const { Types } = require("mongoose");

module.exports = {
    async getParticipantAccountParticipantsWithQuery(req, res) {
        let query = req.body
        try {
            
        const campaign_participants = await ParticipantAccountParticipant.find({...query})
        res.json(campaign_participants)
        } catch (err) {
            throw err;
        }
    },
    async getParticipantAccountParticipants(req, res) {
        try {
            
        const campaign_participants = await ParticipantAccountParticipant.find()
        res.json(campaign_participants)
        } catch (err) {
            throw err;
        }
    },
    async addParticipantAccountParticipant(req, res) {
        const { name, account_id, participant_id } = req.body;
        const stakeholder = await ParticipantAccountParticipant.find({$and: [{name, account_id, participant_id}]})
        console.log('--- addParticipantAccountParticipant', stakeholder.length  > 0)
        if (stakeholder.length > 0) return res.status(403).json({ message: "Stakeholder already added" });
        try {
        const newParticipantAccountParticipant = new ParticipantAccountParticipant({
            ...req.body,
        })
        // Check if user already exist
        const test_campaign_participant = await ParticipantAccountParticipant.findOne({ name })
        if (test_campaign_participant) return res.status(400).json({ message: "ParticipantAccountParticipant already registered." });

        const campaign_participant = await newParticipantAccountParticipant.save();
        
        await ParticipantAccount.updateOne(
            { _id: Types.ObjectId(account_id) },
            { $push: { participants: {...campaign_participant} } }
          )
        res.json({
            ...campaign_participant,
        })

        } catch (err) {
            throw err;
        }

    },
    async getParticipantByAccountId(req, res){
        // console.log('-- in getParticipantAccountParticipantByAccountId account_id',  req.params.account_id)
        const account_id = req.params.account_id;
        if (!account_id) return res.status(403).json({ message: "Missing param" });

        try {
            
        const campaign_participants = await ParticipantAccountParticipant.find({ 'participant_account._id': account_id  })
        // console.log('-- campaign_participants', campaign_participants)
            res.json(campaign_participants)
        } catch (err) {
            throw err;
        }
    },
    async getParticipantAccountParticipantById(req, res){
        const id = req.params.id;
        if (!id) return res.status(403).json({ message: "Missing param" });

        try {
            
        const campaign_participant = await ParticipantAccountParticipant.findOne({ _id: Types.ObjectId(id)  })
            res.json(campaign_participant)
        } catch (err) {
            throw err;
        }
    },
    async editParticipantAccountParticipantById(req, res){
        const { _id, account_id } = req.body;
        if (!_id) return res.status(403).json({ message: "Missing param" });

        try {
            
        const campaign_participant = await ParticipantAccountParticipant.findOneAndUpdate({ _id: Types.ObjectId(_id) },{
            ...req.body,
        })
        if (campaign_participant === null)return res.status(400).json({ message: "No campaign participant with this id" });
        console.log('_id, account_id', _id, account_id)
        await ParticipantAccount.updateOne(
            { _id: Types.ObjectId(account_id), $or: [{"participants._id": Types.ObjectId(_id)}, {"participants._id": _id }] },
            {
              $set: { "participants.$": { ...req.body, } },
            }
         )

         res.json(campaign_participant)
        } catch (err) {
            throw err;
        }
    },
    async deleteParticipantAccountParticipantById(req, res){
        const id = req.params.id;
        try {
            
        const _campaign_participant = await ParticipantAccountParticipant.findOne({ _id: Types.ObjectId(id) })
        const updated = await ParticipantAccount.findOneAndUpdate(
            { "participants.account_id": _campaign_participant.account_id, "participants.participant_id": _campaign_participant.participant_id },
            { $pull: { 'participants': {'name':_campaign_participant.name} } }
          )
          
        const campaign_participant = await ParticipantAccountParticipant.findOneAndDelete({ _id: Types.ObjectId(id) })
        if (campaign_participant === null)return res.status(400).json({ message: "No campaign participant with this id" });
        // console.log('campaign_participant', campaign_participant)
        // console.log('id', id)
        // console.log('_campaign_participant participant', _campaign_participant)
        //   console.log('\n\n\n\nupdated', updated)
         res.json('campaign_participant')
        } catch (err) {
            throw err;
        }
    }
};

