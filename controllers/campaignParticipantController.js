
const CampaignParticipant = require("../models/campaign_participants");
const { Types } = require("mongoose");

module.exports = {
    async getCampaignParticipants(req, res) {
        try {
            
        const campaign_participants = await CampaignParticipant.find()
        res.json(campaign_participants)
        } catch (err) {
            throw err;
        }
    },
    async addCampaignParticipant(req, res) {
        const { name } = req.body;
        try {
        const newCampaignParticipant = new CampaignParticipant({
            ...req.body,
        })
        // Check if user already exist
        const test_campaign_participant = await CampaignParticipant.findOne({ name })
        if (test_campaign_participant) return res.status(400).json({ message: "CampaignParticipant already registered." });

        const campaign_participant = await newCampaignParticipant.save();
        res.json({
            ...campaign_participant,
        })

        } catch (err) {
            throw err;
        }

    },
    async getCampaignParticipantByCampaignId(req, res){
        // console.log('-- in getCampaignParticipantByCampaignId campaign_id',  req.params.campaign_id)
        const campaign_id = req.params.campaign_id;
        if (!campaign_id) return res.status(403).json({ message: "Missing param" });

        try {
            
        const campaign_participants = await CampaignParticipant.find({ 'campaign._id': campaign_id  })
        // console.log('-- campaign_participants', campaign_participants)
            res.json(campaign_participants)
        } catch (err) {
            throw err;
        }
    },
    async getCampaignParticipantById(req, res){
        const id = req.params.id;
        if (!id) return res.status(403).json({ message: "Missing param" });

        try {
            
        const campaign_participant = await CampaignParticipant.findOne({ _id: Types.ObjectId(id)  })
            res.json(campaign_participant)
        } catch (err) {
            throw err;
        }
    },
    async editCampaignParticipantById(req, res){
        const { _id } = req.body;
        if (!_id) return res.status(403).json({ message: "Missing param" });

        try {
            
        const campaign_participant = await CampaignParticipant.findOneAndUpdate({ _id: Types.ObjectId(_id) },{
            ...req.body,
        })
        if (campaign_participant === null)return res.status(400).json({ message: "No campaign participant with this id" });
        
         res.json(campaign_participant)
        } catch (err) {
            throw err;
        }
    },
    async deleteCampaignParticipantById(req, res){
        const id = req.params.id;
        try {
            
        const campaign_participant = await CampaignParticipant.findOneAndDelete({ _id: Types.ObjectId(id) })
        if (campaign_participant === null)return res.status(400).json({ message: "No campaign participant with this id" });
        
         res.json(campaign_participant)
        } catch (err) {
            throw err;
        }
    }
};

