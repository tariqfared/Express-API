const Product = require('./module')
const { connect } = require('mongoose')
require('dotenv').config()

const getproductbycategory  = async (req, res) => {
    const { category } = req.query

    try {
        await connect(process.env.MONGO_URI)
        const product = await Product.findOne({ category } )
        res.json({
            product
        })

    }


    catch (error) {
        res.status(400).json({
            message: error
        })
    }

}


const  getproductbybrand = async (req, res) => {

    const { brand } = req.query


    try {
        await connect(process.env.MONGO_URI)
        const product = await Product.findOne({ brand })
        res.json({ product })
    }


    catch (error) {
        res.status(400).json({
            message: error
        })
    }

}

const createproduct = async (req, res) => {
    const { name,price,category, brand,rating,description,thumbnails, images } = req.body


    if (!name || !images) {
        res.status(400).json({
            message: "Missing Field"
        })
    }

    else {
        try {
            await connect(process.env.MONGO_URI)
            const checkExisting = await Product.exists({name })

            if (checkExisting) {
                res.status(200).json({
                    message: "Already Exists"
                })
            }

            else {
                await Product.create({ name,price,category, brand,rating,description, thumbnails,images })
                const allproduct = await Product.find()

                res.json({
                    message: "DB Connected",
                    category: allproduct
                })

            }
        }


        catch (error) {
            res.status(400).json({
                message: error
            })
        }
    }
}

const updateproduct = async (req, res) => {
    const { _id, name} = req.body
    const filter = { _id }
    const update = {name} 
    try{
        await connect(process.env.MONGO_URI)
        await Product.findOneAndUpdate(filter, update, {
            new: true
        })

        const product = await Product.find()

        res.status(202).json({
            message: "Success",
            product
        })
       
    }
    catch (error) {
        res.status(400).json({
            message: error
        })
    }
    

}
   


   

     

const deleteproduct = async (req, res) => {

    const { _id } = req.body


    try {
        await connect(process.env.MONGO_URI)
        await Product.deleteOne({ _id })
        const product = await product.find()
        res.status(200).json({
            message: "Deleted",
            product
        })
    }


    catch (error) {
        res.status(400).json({
            message: error
        })
    }

}

module.exports = {getproductbycategory , getproductbybrand ,createproduct,updateproduct ,deleteproduct }