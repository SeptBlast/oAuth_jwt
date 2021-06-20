import express from "express";
import psi from "psi";

const router = express.Router();

/**
 * @openapi
 * /api/pageSpeedIndex/{webUrl}/{deviceToTest}:
 *   get:
 *     tags:
 *       - Website Page Index
 *     parameters:
 *       - name: webUrl
 *         in: path
 *         type: string
 *         required: true
 *         description: put https:// before giving url
 *       - name: deviceToTest
 *         in: path
 *         type: string
 *         required: true
 *         description: Put Desktop/Mobile
 *     security:
 *       - bearerAuth: []
 *     summary: List all web Page Index
 *     responses:
 *       '200':
 *         description: Able to retrive all the web vitals
 *       '400':
 *         description: Unable to parse the web vitals
 */
router.get("/:webURL/:deviceToTest", async (req, res) => {
    if (req.params.webURL) var domain = req.params.webURL;
    if (req.params.deviceToTest) var device = req.params.deviceToTest.toLowerCase();
    console.log(req.params);
    console.log(`domain: ${domain} \n deviceType: ${device}`);

    var { data } = await psi(`${domain}`);
    console.log("Speed score:", data.lighthouseResult.categories.performance.score);

    await psi.output(`${domain}`);
    console.log("Done");

    var data2 = await psi(`${domain}`, {
        nokey: "true",
        strategy: `${device}`,
    });
    console.log("Speed score:", data2.data.lighthouseResult.categories.performance.score);
    res.send(data2.data.lighthouseResult.categories.performance.score);
});

export default router;
