const { Builder, By, until } = require('selenium-webdriver');

(async function eventTests() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    
    await driver.get('D:\EventManagementApp\index.html'); 

    
    await driver.findElement(By.id('registerBtn')).click();
    await driver.findElement(By.id('email')).sendKeys('user@example.com');
    await driver.findElement(By.id('password')).sendKeys('12345');
    await driver.findElement(By.tagName('button')).click();

    
    await driver.findElement(By.id('eventName')).sendKeys('Sample Event');
    await driver.findElement(By.id('availableSeats')).sendKeys('10');
    await driver.findElement(By.id('category')).sendKeys('Theater');
    await driver.findElement(By.id('addEventButton')).click();

    
    await driver.wait(until.elementLocated(By.className('main-events')), 5000);
    let eventText = await driver.findElement(By.xpath("//li[contains(text(), 'Sample Event')]")).getText();
    console.log(`Event added: ${eventText.includes('Sample Event')}`);

    
    await driver.findElement(By.xpath("//button[contains(text(), 'Book Now')]")).click();

    
    let alert = await driver.switchTo().alert();
    let alertText = await alert.getText();
    console.log(`Booking confirmation: ${alertText}`);
    await alert.accept();

  } catch (error) {
    console.error(error);
  } finally {
    await driver.quit();
  }
})();
