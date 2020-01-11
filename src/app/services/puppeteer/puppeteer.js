const puppeteer = require('puppeteer');

exports.takeScreenShot = async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = 'https://residencialfloren.firebaseapp.com/';
    const options = {
        path: 'src/app/services/puppeteer/floren.png',
        fullPage: false,
        omitBackground: true,
        clip: {
            x: 460,
            y: 160,
            width: 1000,
            height: 600,
        }
    }

    await page.setViewport({
        width: 1920,
        height: 979,
        deviceScaleFactor: 1,
    });

    await page.goto(url);

    setTimeout(async () => {
        await page.screenshot(options);
        await browser.close();
    }, 1000);

};