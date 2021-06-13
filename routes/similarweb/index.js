import express from "express";
import smWebVitals from "../../functions/similarweb/index.js";

const router = express.Router();

/**
 * @openapi
 * /api/webScrapedData/{webUrl}:
 *   get:
 *     tags:
 *       - Website Scraping
 *     parameters:
 *       - name: webUrl
 *         in: path
 *         type: string
 *         required: true
 *     security:
 *       - bearerAuth: []
 *     summary: List all web vitals listed
 *     responses:
 *       '200':
 *         description: Able to retrive all the web vitals
 *       '400':
 *         description: Unable to parse the web vitals
 */
router.get("/:webUrl", (req, res) => {
    if (req.params.webUrl) var domain = req.params.webUrl;

    smWebVitals
        .getData(domain)
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            res.send(error);
        });
});

export default router;
