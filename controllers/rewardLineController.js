
const RewardLine = require("../models/reward_line");
const { Types } = require("mongoose");
const { json } = require("body-parser");

module.exports = {
    async getRewardLines(req, res) {
        try {
            
        const reward_lines = await RewardLine.find()
        res.json(reward_lines)
        } catch (err) {
            throw err;
        }
    },
    async getRewardLinesByParentId(req, res) {
        let parent_id = req.params.id
        console.log('parent_id', parent_id)
        try {            
        const reward_lines = await RewardLine.find({'parent._id': parent_id})
        res.json(reward_lines)
        } catch (err) {
            throw err;
        }
    },
    async addRewardLine(req, res) {
        const { name, parent, reward_percentage_of_amount, is_elite, reward_type, is_collaborator  } = req.body;

        // check if reward type already register for the elite or collaborator reward
        const is_reward_type_exist = await RewardLine.find({'parent._id': parent._id, 'reward_type': reward_type, is_elite, is_collaborator:!is_elite })
        if (is_reward_type_exist.length > 0) {
            return res.status(400).json({ message: "This type has been already configured for this user." });    
        }

        
        const rewards = await RewardLine.find({'parent._id': parent._id, is_elite, is_collaborator:!is_elite })
        const computeData = rewards.reduce((acc, curr)=> {
            acc.curr_total_percentage += parseInt(curr.reward_percentage_of_amount)
            return acc
        }, {curr_total_percentage: 0})

        // check if new percentage + already saved one will exceed 100%  for the elite or collaborator reward
        if (computeData.curr_total_percentage + parseInt(reward_percentage_of_amount) > 100 ) {
            return res.status(400).json({ message: "Sum of all percentages should not exceed 100%." });    
        }
        
        if (is_collaborator && rewards.length === 2  && computeData.curr_total_percentage + parseInt(reward_percentage_of_amount) !== 100) {
            
            return res.status(400).json({ message: "Sum of all percentages should be equal to 100%." });  
        }
        if (is_elite && rewards.length === 1  && computeData.curr_total_percentage + parseInt(reward_percentage_of_amount) !== 100) {
            
            return res.status(400).json({ message: "Sum of all percentages should be equal to 100%." });  
        }

        
        if (is_elite && reward_type==='collaborator') {            
            return res.status(400).json({ message: "Elite beneficiary reward can't go to collaborator all goes to the elite." });
        }


        try {
        const newRewardLine = new RewardLine({
            ...req.body,
        })
        // Check if user already exist
        const test_reward_line = await RewardLine.findOne({ name })
        if (test_reward_line) return res.status(400).json({ message: "RewardLine already registered." });

        const reward_line = await newRewardLine.save();
        res.json({
            ...reward_line,
        })

        } catch (err) {
            throw err;
        }

    },
    async getRewardLineById(req, res){
        const id = req.params.id;
        if (!id) return res.status(403).json({ message: "Missing param" });

        try {
            
        const reward_line = await RewardLine.findOne({ _id: Types.ObjectId(id)  })
            res.json(reward_line)
        } catch (err) {
            throw err;
        }
    },
    async editRewardLineById(req, res){
        const { _id } = req.body;
        if (!_id) return res.status(403).json({ message: "Missing param" });

        try {
            
        const reward_line = await RewardLine.findOneAndUpdate({ _id: Types.ObjectId(_id) },{
            ...req.body,
        })
        if (reward_line === null)return res.status(400).json({ message: "No reward_line with this id" });
        
         res.json(reward_line)
        } catch (err) {
            throw err;
        }
    },
    async deleteRewardLineById(req, res){
        const id = req.params.id;
        try {
            
        const reward_line = await RewardLine.findOneAndDelete({ _id: Types.ObjectId(id) })
        if (reward_line === null)return res.status(400).json({ message: "No reward_line with this id" });
        
         res.json(reward_line)
        } catch (err) {
            throw err;
        }
    }
};

