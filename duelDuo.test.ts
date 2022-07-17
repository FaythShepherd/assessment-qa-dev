
import { Builder, Capabilities, By } from "selenium-webdriver"
require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    driver.get('http://localhost:3000/')
})

afterAll(async () => {
    driver.quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
    expect(displayed).toBe(true)
})

test('draw button displays choices', async () => {
    await driver.findElement(By.id('draw')).click()
    driver.sleep(3000)
    const choices = await driver.findElement(By.id('choices'))
    const displayed = await choices.isDisplayed()
    expect(displayed).toBe(true)
    driver.sleep(5000)
})

test('check that add to due button displays', async () =>{
    await driver.findElement(By.xpath('//button[text()="Draw]')).click()
    await driver.findElement(By.xpath('//*[@id="choices"]/div[1]/button')).click
    await driver.findElement(By.xpath('//*[@id="choices"]/div[2]/button')).click
    const boBtn = await driver.findElement(By.xpath('//*[@id="player-duo"'))
    const isDisplayed = await boBtn.isDisplayed()
    expect(isDisplayed).toBeTruthy()
    await driver.sleep(3000)
})

// test('bot is removed from due and placed back into choices', async () => {
// })