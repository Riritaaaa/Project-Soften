const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    const randomNumber1 = Math.floor(Math.random() * 100);
    const randomNumber2 = Math.floor(Math.random() * 100);
    // Set longer timeouts
    page.setDefaultTimeout(6000); // 60 seconds

    // TC01 : Purchase without login
    await page.goto('http://localhost:8080/en');
    await page.click('//*[@id="category-3"]/a');
    await page.click('//*[@id="js-product-list"]/div[1]/div[1]/article/div/div[1]/a/picture/img');
    await page.click('//*[@id="add-to-cart-or-refresh"]/div[2]/div/div[2]/button')
    await page.waitForTimeout(1000);
    await page.click('//*[@id="blockcart-modal"]/div/div/div[2]/div/div[2]/div/div/a')
    await page.click('//*[@id="main"]/div/div[2]/div[1]/div[2]/div/a');

    // TC02 : Fill Form
    await page.fill('#field-firstname', 'John');
    await page.fill('#field-lastname', 'Doe');
    const randomNumber = Math.floor(Math.random() * (99 - 10 + 1)) + 10;
    const baseEmail = 'johndo@example.com';
    const generatedEmail = `${baseEmail}${randomNumber}${randomNumber}`;
    await page.fill('#field-email', generatedEmail);
    await page.fill('#field-password', 'ilovesoften1');
    await page.fill('#field-birthday', '02/04/2002');
    await page.click('input[name="psgdpr"]');
    await page.click('input[name="customer_privacy"]');
    await page.click('button.continue');

    // TC03 : Fill Address
    await page.selectOption('#field-id_country', 'Thailand'); // Select the country
    await page.fill('#field-firstname', 'Demo First Name');
    await page.fill('#field-lastname', 'Demo Last Name');
    await page.fill('#field-address1', 'Demo Address 1');
    await page.fill('#field-postcode', 'test1');
    await page.fill('#field-city', 'Demo City');
    await page.check('#use_same_address');
    await page.fill('#field-phone', '1234567890');
    await page.click('button[name="confirm-addresses"]');
    await page.waitForTimeout(6000);
    const textExists = await page.waitForSelector('text=Invalid postcode - should look like "NNNNN"', { timeout: 5000 })
    .then(() => true)
    .catch(() => false);

    if (textExists) {
        console.log("Found 'Invalid postcode - should look like \"NNNNN\"' In WebSite");
    }
    await page.screenshot({ path: 'image.png' });
    await browser.close();
    })();
