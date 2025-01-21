const { Builder, By, until } = require('selenium-webdriver');

(async function loginTests() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    
    await driver.get('D:\EventManagementApp\index.html'); 

    
    await driver.findElement(By.id('registerBtn')).click();

    
    await driver.wait(until.elementLocated(By.id('loginSection')), 5000);

    
    await driver.findElement(By.id('email')).sendKeys('user@example.com');
    await driver.findElement(By.id('password')).sendKeys('12345');
    await driver.findElement(By.tagName('button')).click();

    
    let addEventForm = await driver.wait(until.elementLocated(By.id('add-event-form')), 5000);
    let isDisplayed = await addEventForm.isDisplayed();
    console.log(`Login success: ${isDisplayed}`);

  } catch (error) {
    console.error(error);
  } finally {
    await driver.quit();
  }
})();
