const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.goto('http://localhost:3001');

  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  });

  await page.waitForTimeout(2000);
  const screenshotPath = '/Users/hubertgrzybowski/.gemini/antigravity/brain/b9d02067-861c-4c3d-8b3c-c448431f3089/light_mode_final_audit.webp';
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`Screenshot saved to ${screenshotPath}`);
  await browser.close();
})();
