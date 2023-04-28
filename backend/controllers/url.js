const urlModel = require('../models/Url')

const incrementCount = async (urlData) => {
    urlData.clicks++;
    await urlData.save();
}
const routeToUrl = async (req, res) => {
    // Get URL ID
    const {url_id} = req.params

    // Check in DB
    const urlData = await urlModel.findOne({shortened_id: url_id}).exec();

    // If Url Data not present return 404
    if (!urlData) return res.status(404).json({message: 'URL not found'})

    // Increment Click Count and save
    incrementCount(urlData);

    return res.status(302).redirect(urlData.url)
}

module.exports = {
    routeToUrl
}