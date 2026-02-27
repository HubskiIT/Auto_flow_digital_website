const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.goto('http://localhost:3001');

  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  });

  await page.waitForTimeout(1000); 

  // scroll to bottom to trigger all framer-motion animations
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 500;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });

  await page.waitForTimeout(1000); 

  const screenshotPath = '/Users/hubertgrzybowski/.gemini/antigravity/brain/b9d02067-861c-4c3d-8b3c-c448431f3089/light_mode_final_audit.png';
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`Screenshot saved to ${screenshotPath}`);
  await browser.close();
})();
