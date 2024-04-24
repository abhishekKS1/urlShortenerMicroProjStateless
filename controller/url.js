const URL = require("../models/url.js");

const generateRandomCode = require("../utility/ut1.js");

// const x = generateRandomCode();
// console.log(x);

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url required " });

    const shortID = generateRandomCode(7);

    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id
    });

    return res.render("home", { id: shortID });
    return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({
        shortId
    });
    res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
};
