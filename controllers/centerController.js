
const Center = require("../models/center");
const { Types } = require("mongoose");

module.exports = {
    async getCenters(req, res) {
        try {
            
        const centers = await Center.find()
        res.json(centers)
        } catch (err) {
            throw err;
        }
    },
    async getQueryCenters(req, res) {
        let {auth_user_id, role_name} = req.body || {}
        console.log('auth_user_id, role_name', auth_user_id, role_name)
        try {            
            let centers = []
                if (role_name !== 'Admin') {
                    // console.log('in true',)
                    centers = await Center.aggregate(
                        [
                          {
                            $lookup: {
                                from: 'cashier_centers',
                                localField: 'name',
                                foreignField: 'center.name',
                                as: 'cashiers'
                            }
                          },
                          {
                            $match: {
                                'cashiers.cashier._id':{
                                  $in: [auth_user_id]
                                }
                            }
                          }
                        ]
                      )
                } else if (role_name === 'Admin') {
                    centers = await Center.find();
                }

        res.json(centers)
        } catch (err) {
            throw err;
        }
    },
    async addCenter(req, res) {
        const { name } = req.body;
        try {
        const newCenter = new Center({
            ...req.body,
        })
        // Check if user already exist
        const test_center = await Center.findOne({ name })
        if (test_center) return res.status(400).json({ message: "Center already registered." });

        const center = await newCenter.save();
        res.json({
            ...center,
        })

        } catch (err) {
            throw err;
        }

    },
    async getCenterById(req, res){
        const id = req.params.id;
        if (!id) return res.status(403).json({ message: "Missing param" });

        try {
            
        const center = await Center.findOne({ _id: Types.ObjectId(id)  })
            res.json(center)
        } catch (err) {
            throw err;
        }
    },
    async editCenterById(req, res){
        const { _id } = req.body;
        if (!_id) return res.status(403).json({ message: "Missing param" });

        try {
            
        const center = await Center.findOneAndUpdate({ _id: Types.ObjectId(_id) },{
            ...req.body,
        })
        if (center === null)return res.status(400).json({ message: "No center with this id" });
        
         res.json(center)
        } catch (err) {
            throw err;
        }
    },
    async deleteCenterById(req, res){
        const id = req.params.id;
        try {
            
        const center = await Center.findOneAndDelete({ _id: Types.ObjectId(id) })
        if (center === null)return res.status(400).json({ message: "No center with this id" });
        
         res.json(center)
        } catch (err) {
            throw err;
        }
    }
};

