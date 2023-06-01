
const Reward = require("../models/reward");
const { Types } = require("mongoose");

module.exports = {
    async getRewards(req, res) {
        try {
            
        const rewards = await Reward.find()
        res.json(rewards)
        } catch (err) {
            throw err;
        }
    },
    async addReward(req, res) {
        const { name } = req.body;
        try {
        const newReward = new Reward({
            ...req.body,
        })
        // Check if user already exist
        const test_reward = await Reward.findOne({ name })
        if (test_reward) return res.status(400).json({ message: "Reward already registered." });

        const reward = await newReward.save();
        res.json({
            ...reward,
        })

        } catch (err) {
            throw err;
        }

    },
    async getRewardById(req, res){
        const id = req.params.id;
        if (!id) return res.status(403).json({ message: "Missing param" });

        try {
            
        const reward = await Reward.findOne({ _id: Types.ObjectId(id)  })
            res.json(reward)
        } catch (err) {
            throw err;
        }
    },
    async editRewardById(req, res){
        const { _id } = req.body;
        if (!_id) return res.status(403).json({ message: "Missing param" });

        try {
            
        const reward = await Reward.findOneAndUpdate({ _id: Types.ObjectId(_id) },{
            ...req.body,
        })
        if (reward === null)return res.status(400).json({ message: "No reward with this id" });
        
         res.json(reward)
        } catch (err) {
            throw err;
        }
    },
    async deleteRewardById(req, res){
        const id = req.params.id;
        try {
            
        const reward = await Reward.findOneAndDelete({ _id: Types.ObjectId(id) })
        if (reward === null)return res.status(400).json({ message: "No reward with this id" });
        
         res.json(reward)
        } catch (err) {
            throw err;
        }
    }
};

