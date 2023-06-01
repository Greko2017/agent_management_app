const Campaign = require("../models/campaign");
const CampaignParticipant = require("../models/campaign_participants");
const { Types } = require("mongoose");

module.exports = {
    async getCampaigns(req, res) {
        let {auth_user_id, role_name} = req.body || {}
        // console.log('auth_user_id', auth_user_id)
        try {
            
            let campaigns = []
                if (role_name !== 'Admin') {
                    // console.log('in true',)
                    campaigns = await Campaign.aggregate(
                        [
                          {
                            $lookup: {
                              from: 'campaign_participants',
                              localField: 'name',
                              foreignField: 'campaign.name',
                              as: 'participants'
                            }
                          },
                          {
                            $match: {
                              'participants.participant._id': {
                                $in: [auth_user_id]
                              }
                            }
                          }
                        ]
                      )
                } else if (role_name === 'Admin') {
                    campaigns = await Campaign.find();
                }
            
            return res.json(campaigns)

        } catch (err) {
            // throw err;
            return res.status(403).json({ message: err.toString() });
        }
    },
    async addCampaign(req, res) {
        const { name } = req.body;
        try {
        const newCampaign = new Campaign({
            ...req.body,
        })
        // Check if user already exist
        const test_campaign = await Campaign.findOne({ name })
        if (test_campaign) return res.status(400).json({ message: "Campaign already registered." });

        const campaign = await newCampaign.save();
        res.json({
            ...campaign,
        })

        } catch (err) {
            throw err;
        }

    },
    async getCampaignById(req, res){
        const id = req.params.id;
        if (!id) return res.status(403).json({ message: "Missing param" });

        try {
            
        const campaign = await Campaign.findOne({ _id: Types.ObjectId(id)  })
            res.json(campaign)
        } catch (err) {
            throw err;
        }
    },
    async editCampaignById(req, res){
        const { _id } = req.body;
        if (!_id) return res.status(403).json({ message: "Missing param" });

        try {
            
        const campaign = await Campaign.findOneAndUpdate({ _id: Types.ObjectId(_id) },{
            ...req.body,
        })
        if (campaign === null)return res.status(400).json({ message: "No Campaign with this id" });
        
         res.json(campaign)
        } catch (err) {
            throw err;
        }
    },
    async deleteCampaignById(req, res){
        const id = req.params.id;
        try {
            
        const campaign = await Campaign.findOneAndDelete({ _id: Types.ObjectId(id) })
        if (campaign === null)return res.status(400).json({ message: "No Campaign with this id" });
        
         res.json(campaign)
        } catch (err) {
            throw err;
        }
    }
};

