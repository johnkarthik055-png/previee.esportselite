import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

await page.screenshot({ path: 'screenshot-hero.png', fullPage: false });

await page.evaluate(() => window.scrollBy(0, 900));
await new Promise(r => setTimeout(r, 500));
await page.screenshot({ path: 'screenshot-features.png' });

await page.evaluate(() => window.scrollBy(0, 900));
await new Promise(r => setTimeout(r, 500));
await page.screenshot({ path: 'screenshot-banner.png' });

await page.evaluate(() => window.scrollBy(0, 900));
await new Promise(r => setTimeout(r, 500));
await page.screenshot({ path: 'screenshot-roadmap.png' });

await page.evaluate(() => window.scrollBy(0, 1200));
await new Promise(r => setTimeout(r, 500));
await page.screenshot({ path: 'screenshot-footer.png' });

await page.screenshot({ path: 'screenshot-fullpage.png', fullPage: true });

await browser.close();
console.log('Screenshots saved.');
