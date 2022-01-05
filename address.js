const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
var random = require('random-name')
var randomize = require('randomatic');
const fs = require('fs-extra');
const readline = require("readline-sync");
const chalk = require('chalk');
var Fakerator = require("fakerator");
const moment = require('moment')
puppeteer.use(StealthPlugin());

(async () => {
    var acc = readline.question(chalk.yellow('[?] List account (ex: acc): '))
    var whereCountry = readline.question(chalk.cyan('[1] Korea\n[2] German\n[3] Belgia\n[4] Algeria\n[5] Chile\n[6] Indonesia\n[7] Vietnam\n[8] Ukraine\n[9] Philippines\n\n[?] Pilih: '))
    console.log("")
    let stop = true;
    while(stop){
        try {
            var file = fs.readFileSync(`./${acc}.txt`, 'utf-8');
            var splitFile = file.split('\r\n');
            if(file != ''){
                for (i in splitFile) {
    
                    const email = splitFile[i].split('|')[0]
                    const password = splitFile[i].split('|')[1]
                    console.log(chalk.yellow(`[${(moment().format('HH:mm:ss'))}] Account => ${i}`))
                    console.log(chalk.yellow(`[${(moment().format('HH:mm:ss'))}] Email => ${email}`))
                    
                    var fakerator = Fakerator("en-CA");
                    var address = fakerator.address.street()
                    var address2 = fakerator.address.street()
    
                    const browser = await puppeteer.launch({
                        devtools: false,
                        ignoreHTTPSErrors: true,
                        headless: false,
                    });
                    const page = await browser.newPage()
                    
                    await page.evaluateOnNewDocument(() => {
                        Object.defineProperty(navigator, 'webdriver', {
                            get: () => false,
                        });
                    });
                    await page.evaluateOnNewDocument(() => {
                        Object.defineProperty(navigator, 'plugins', {
                        get: () => [1, 2, 3, 4, 5],
                    });
                    });
                    console.log(chalk.yellow(`[${(moment().format('HH:mm:ss'))}] Wait for login`))
                    await page.setUserAgent(`Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Mobile Safari/537.36`);
                    await page.goto(`https://thirdparty.aliexpress.com/login.htm?type=gg&from=msite&return_url=https://ilogisticsaddress.aliexpress.com/addressList.htm?spm=a2g0s.9042311.0.0.33324c4dnLR1af`,{ waitUntil: 'networkidle2', timeout: 60000 })
    
                    await page.waitForSelector("#identifierId",{visible:true ,timeout:60000})
                    await page.click("#identifierId")
                    await page.type("#identifierId", email)
    
                    await page.waitForSelector("#identifierNext > div > button > div.VfPpkd-RLmnJb",{visible:true ,timeout:60000})
                    await page.click("#identifierNext > div > button > div.VfPpkd-RLmnJb")
    
                    await page.waitForSelector("input[type=password]",{visible:true ,timeout:60000})
                    await page.click("input[type=password]")
                    await page.type("input[type=password]", password)
    
                    await page.waitForSelector("#passwordNext > div > button > div.VfPpkd-RLmnJb",{visible:true ,timeout:60000})
                    await page.click("#passwordNext > div > button > div.VfPpkd-RLmnJb")
    
                    await page.waitForSelector("#meShippingAddressTitle",{visible:true,timeout:60000})
    
                    console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Login success`))
                    console.log(chalk.yellow(`[${(moment().format('HH:mm:ss'))}] Wait for setting address`))
    
                    if(whereCountry == 1 || whereCountry.toLowerCase() == 'Korea'){
                         await page.waitForSelector("body > div.container.me-body-container > div > div.col-xs-48",{visible:true,timeout:60000})
                        var checkAddress =  await page.$eval("body > div.container.me-body-container > div > div.col-xs-48", el => el.textContent);
                        if(!checkAddress.includes('Delete')){
                            let backSetGerman = true;
                            while(backSetGerman){
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-input-control > span > i",{visible:true,timeout:60000})
                                await page.tap("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-input-control > span > i")
    
                                await page.waitForTimeout(500)
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > span > span > span",{visible:true,timeout:60000})
                                await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > span > span > span", "korea")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > ul > li > div",{visible:true,timeout:60000})
    
                                await page.waitForTimeout(1500)
    
                                await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > ul > li > div")
    
                                let changeSuccess = true;

                                while(changeSuccess){
                                    await page.waitForSelector('#address-main > div > div.next-loading-tip > div.next-loading-tip-content', {visible: true, timeout: 1000}).then(async() =>{
                                        
                                        // kondisi jika selector ada
                                    
                                    }).catch(() => {
                                        changeSuccess = false;
                                    })
                                }
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > span > span > span.next-input-control > span > i",{visible:true,timeout:60000})
                                await page.tap("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > span > span > span.next-input-control > span > i")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span",{visible:true,timeout:60000})
                                await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span",{visible:true,timeout:60000})
                                await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span", '경기도')
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > ul > li",{visible:true,timeout:60000})
                                await page.tap("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > ul > li")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-select-values.next-input-text-field > em > div > span.country-name",{visible:true,timeout:60000})
                                var kota =  await page.$eval("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-select-values.next-input-text-field > em > div > span.country-name", el => el.textContent);
                                if(kota.includes('Korea')){
                                    backSetGerman = false;
                                }
                            }
    
                            const fileCityKorea = fs.readFileSync(`./cityKorea.txt`, 'utf-8');
                            const splitFileCityKorea = fileCityKorea.split('\r\n');
                            var cityKorea = splitFileCityKorea[Math.floor(Math.random()*splitFileCityKorea.length)];
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > span > span > span.next-input-control > span > i",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > span > span > span.next-input-control > span > i")
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > span > span > span > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > span > span > span > span")
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > span > span > span > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > span > span > span > span", cityKorea)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > ul",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > ul")
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span", `${random.first()} ${random.last()}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span", `01${randomize('0', 9)}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span", `${address} ${address2}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span", `${randomize('0', 5)}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.customsInfo > div > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.customsInfo > div > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.customsInfo > div > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.customsInfo > div > div > span", `P${randomize('0', 12)}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.address-save > button",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.address-save > button")
    
                            await page.waitForSelector("#address-main > div > div > div.address-list-header > button",{visible:true,timeout:60000})
    
                            console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Success setting address\n`))
    
                            await fs.appendFile('claimset.txt', `${email}|${password}`+'\r\n', err => {
                                if (err) throw err;
                            })
    
                            await browser.close()
    
                            var files = fs.readFileSync(`./${acc}.txt`, 'utf-8');
                            var lines = files.split('\n')
                            lines.splice(0,1)
                            await fs.writeFileSync(`${acc}.txt`, lines.join('\n'))
                        } else {
                            console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Address has been setting before\n`))
    
                            await fs.appendFile('claimset.txt', `${email}|${password}`+'\r\n', err => {
                                if (err) throw err;
                            })
    
                            await browser.close()
    
                            var files = fs.readFileSync(`./${acc}.txt`, 'utf-8');
                            var lines = files.split('\n')
                            lines.splice(0,1)
                            await fs.writeFileSync(`${acc}.txt`, lines.join('\n'))
                        }
                    } else if (whereCountry == 2 || whereCountry.toLocaleLowerCase() == 'german'){
    
                         await page.waitForSelector("body > div.container.me-body-container > div > div.col-xs-48",{visible:true,timeout:60000})
                        var checkAddress =  await page.$eval("body > div.container.me-body-container > div > div.col-xs-48", el => el.textContent);
                        if(!checkAddress.includes('Delete')){
                            let backSetGerman = true;
                            while(backSetGerman){
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-input-control > span > i",{visible:true,timeout:60000})
                                await page.tap("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-input-control > span > i")
    
                                await page.waitForTimeout(500)
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > span > span > span",{visible:true,timeout:60000})
                                await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > span > span > span", "germany")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > ul > li > div",{visible:true,timeout:60000})
    
                                await page.waitForTimeout(1500)
    
                                await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > ul > li > div")
    
                                let changeSuccess = true;

                                while(changeSuccess){
                                    await page.waitForSelector('#address-main > div > div.next-loading-tip > div.next-loading-tip-content', {visible: true, timeout: 1000}).then(async() =>{
                                        
                                        // kondisi jika selector ada
                                    
                                    }).catch(() => {
                                        changeSuccess = false;
                                    })
                                }
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > span > span > span.next-input-control > span > i",{visible:true,timeout:60000})
                                await page.tap("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > span > span > span.next-input-control > span > i")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span",{visible:true,timeout:60000})
                                await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span",{visible:true,timeout:60000})
                                await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span", 'Bayern')
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > ul > li",{visible:true,timeout:60000})
                                await page.tap("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > ul > li")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-select-values.next-input-text-field > em > div > span.country-name",{visible:true,timeout:60000})
                                var kota =  await page.$eval("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-select-values.next-input-text-field > em > div > span.country-name", el => el.textContent);
                                if(kota.includes('Germany')){
                                    backSetGerman = false;
                                }
                            }
    
                            const fileCityGerman = fs.readFileSync(`./cityGerman.txt`, 'utf-8');
                            const splitFileCityGerman = fileCityGerman.split('\r\n');
                            var cityGerman = splitFileCityGerman[Math.floor(Math.random()*splitFileCityGerman.length)];
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > span > span > span.next-input-control > span > i",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > span > span > span.next-input-control > span > i")
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > span > span > span > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > span > span > span > span")
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > span > span > span > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > span > span > span > span", cityGerman)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > ul",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > ul")
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span", `${random.first()} ${random.last()}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span", `422${randomize('0', 8)}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span", `${address} ${address2}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span", `${randomize('0', 5)}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.address-save > button",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.address-save > button")
    
                            await page.waitForSelector("#address-main > div > div > div.address-list-header > button",{visible:true,timeout:60000})
    
                            console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Success setting address\n`))
    
                            await fs.appendFile('doneClaimSetRandom.txt', `${email}|${password}`+'\r\n', err => {
                                if (err) throw err;
                            })
    
                            await browser.close()
    
                            var files = fs.readFileSync(`./${acc}.txt`, 'utf-8');
                            var lines = files.split('\n')
                            lines.splice(0,1)
                            await fs.writeFileSync(`${acc}.txt`, lines.join('\n'))
                        } else {
                            console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Address has been setting before\n`))
    
                            await fs.appendFile('doneClaimSetRandom.txt', `${email}|${password}`+'\r\n', err => {
                                if (err) throw err;
                            })
    
                            await browser.close()
    
                            var files = fs.readFileSync(`./${acc}.txt`, 'utf-8');
                            var lines = files.split('\n')
                            lines.splice(0,1)
                            await fs.writeFileSync(`${acc}.txt`, lines.join('\n'))
                        }
                    } else if(whereCountry == 3 || whereCountry.toLocaleLowerCase() === 'Belgia'){
                         await page.waitForSelector("body > div.container.me-body-container > div > div.col-xs-48",{visible:true,timeout:60000})
                        var checkAddress =  await page.$eval("body > div.container.me-body-container > div > div.col-xs-48", el => el.textContent);
                        if(!checkAddress.includes('Delete')){
                            let backSetGerman = true;
                            while(backSetGerman){
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-input-control > span > i",{visible:true,timeout:60000})
                                await page.tap("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-input-control > span > i")
    
                                await page.waitForTimeout(500)
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > span > span > span",{visible:true,timeout:60000})
                                await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > span > span > span", "belgium")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > ul > li > div",{visible:true,timeout:60000})
    
                                await page.waitForTimeout(1500)
    
                                await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > ul > li > div")
                                
                                await page.waitForTimeout(2000)

                                let changeSuccess = true;

                                while(changeSuccess){
                                    await page.waitForSelector('#address-main > div > div.next-loading-tip > div.next-loading-tip-content', {visible: true, timeout: 1000}).then(async() =>{
                                        
                                        // kondisi jika selector ada
                                    
                                    }).catch(() => {
                                        changeSuccess = false;
                                    })
                                }
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-select-values.next-input-text-field > em > div > span.country-name",{visible:true,timeout:60000})
                                var kota =  await page.$eval("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-select-values.next-input-text-field > em > div > span.country-name", el => el.textContent);
                                if(kota.includes('Belgium')){
                                    backSetGerman = false;
                                }
                            }
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span", randomize('A', 7))

                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span")
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span", randomize('A', 8))
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span", `${random.first()} ${random.last()}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span", `892${randomize('0', 8)}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span", `${address} ${address2}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span", `${randomize('0', 4)}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.address-save > button",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.address-save > button")
    
                            await page.waitForSelector("#address-main > div > div > div.address-list-header > button",{visible:true,timeout:60000})
    
                            console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Success setting address\n`))
    
                            await fs.appendFile('doneClaimSetRandom.txt', `${email}|${password}`+'\r\n', err => {
                                if (err) throw err;
                            })
    
                            await browser.close()
    
                            var files = fs.readFileSync(`./${acc}.txt`, 'utf-8');
                            var lines = files.split('\n')
                            lines.splice(0,1)
                            await fs.writeFileSync(`${acc}.txt`, lines.join('\n'))
                        } else {
                            console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Address has been setting before\n`))
    
                            await fs.appendFile('doneClaimSetRandom.txt', `${email}|${password}`+'\r\n', err => {
                                if (err) throw err;
                            })
    
                            await browser.close()
    
                            var files = fs.readFileSync(`./${acc}.txt`, 'utf-8');
                            var lines = files.split('\n')
                            lines.splice(0,1)
                            await fs.writeFileSync(`${acc}.txt`, lines.join('\n'))
                        }
                    } else if(whereCountry == 4 || whereCountry.toLocaleLowerCase() === 'Algeria'){
                         await page.waitForSelector("body > div.container.me-body-container > div > div.col-xs-48",{visible:true,timeout:60000})
                        var checkAddress =  await page.$eval("body > div.container.me-body-container > div > div.col-xs-48", el => el.textContent);
                        if(!checkAddress.includes('Delete')){
                            let backSetGerman = true;
                            while(backSetGerman){
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-input-control > span > i",{visible:true,timeout:60000})
                                await page.tap("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-input-control > span > i")
    
                                await page.waitForTimeout(500)
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > span > span > span",{visible:true,timeout:60000})
                                await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > span > span > span", "Algeria")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > ul > li > div",{visible:true,timeout:60000})
    
                                await page.waitForTimeout(1500)
    
                                await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > ul > li > div")
    
                                let changeSuccess = true;

                                while(changeSuccess){
                                    await page.waitForSelector('#address-main > div > div.next-loading-tip > div.next-loading-tip-content', {visible: true, timeout: 1000}).then(async() =>{
                                        
                                        // kondisi jika selector ada
                                    
                                    }).catch(() => {
                                        changeSuccess = false;
                                    })
                                }
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-select-values.next-input-text-field > em > div > span.country-name",{visible:true,timeout:60000})
                                var kota =  await page.$eval("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-select-values.next-input-text-field > em > div > span.country-name", el => el.textContent);
                                if(kota.includes('Algeria')){
                                    backSetGerman = false;
                                }
                            }
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span", randomize('A', 7))

                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span")
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span", randomize('A', 8))
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span", `${random.first()} ${random.last()}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span", `21${randomize('0', 6)}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span", `${address} ${address2}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span", `${randomize('0', 5)}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.address-save > button",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.address-save > button")
    
                            await page.waitForSelector("#address-main > div > div > div.address-list-header > button",{visible:true,timeout:60000})
    
                            console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Success setting address\n`))
    
                            await fs.appendFile('doneClaimSetRandom.txt', `${email}|${password}`+'\r\n', err => {
                                if (err) throw err;
                            })
    
                            await browser.close()
    
                            var files = fs.readFileSync(`./${acc}.txt`, 'utf-8');
                            var lines = files.split('\n')
                            lines.splice(0,1)
                            await fs.writeFileSync(`${acc}.txt`, lines.join('\n'))
                        } else {
                            console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Address has been setting before\n`))
    
                            await fs.appendFile('doneClaimSetRandom.txt', `${email}|${password}`+'\r\n', err => {
                                if (err) throw err;
                            })
    
                            await browser.close()
    
                            var files = fs.readFileSync(`./${acc}.txt`, 'utf-8');
                            var lines = files.split('\n')
                            lines.splice(0,1)
                            await fs.writeFileSync(`${acc}.txt`, lines.join('\n'))
                        }
                    } else if(whereCountry == 5 || whereCountry.toLowerCase() == 'Chile'){
                         await page.waitForSelector("body > div.container.me-body-container > div > div.col-xs-48",{visible:true,timeout:60000})
                        var checkAddress =  await page.$eval("body > div.container.me-body-container > div > div.col-xs-48", el => el.textContent);
                        if(!checkAddress.includes('Delete')){
                            let backSetGerman = true;
                            while(backSetGerman){
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-input-control > span > i",{visible:true,timeout:60000})
                                await page.tap("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-input-control > span > i")
    
                                await page.waitForTimeout(500)
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > span > span > span",{visible:true,timeout:60000})
                                await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > span > span > span", "chile")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > ul > li > div",{visible:true,timeout:60000})
    
                                await page.waitForTimeout(1500)
    
                                await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > ul > li > div")
    
                                await page.waitForTimeout(3500)
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > span > span > span.next-input-control > span > i",{visible:true,timeout:60000})
                                await page.tap("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > span > span > span.next-input-control > span > i")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span",{visible:true,timeout:60000})
                                await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span",{visible:true,timeout:60000})
                                await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span", 'Bío-Bío')
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > ul > li",{visible:true,timeout:60000})
                                await page.tap("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > ul > li")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-select-values.next-input-text-field > em > div > span.country-name",{visible:true,timeout:60000})
                                var kota =  await page.$eval("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-select-values.next-input-text-field > em > div > span.country-name", el => el.textContent);
                                if(kota.includes('Chile')){
                                    backSetGerman = false;
                                }
                            }
    
                            const fileCityChile = fs.readFileSync(`./cityChile.txt`, 'utf-8');
                            const splitFileCityChile = fileCityChile.split('\r\n');
                            var cityChile = splitFileCityChile[Math.floor(Math.random()*splitFileCityChile.length)];
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > span > span > span.next-input-control > span > i",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > span > span > span.next-input-control > span > i")
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > span > span > span > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > span > span > span > span")
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > span > span > span > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > span > span > span > span", cityChile)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > ul",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > ul")
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span", `${random.first()} ${random.last()}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span", `9${randomize('0', 8)}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span", `${address} ${address2}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span", `${randomize('0', 7)}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.rutNo > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.rutNo > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.rutNo > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.rutNo > div > span", `${randomize('0', 8)}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.address-save > button",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.address-save > button")
    
                            await page.waitForSelector("#address-main > div > div > div.address-list-header > button",{visible:true,timeout:60000})
    
                            console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Success setting address\n`))
    
                            await fs.appendFile('claimset.txt', `${email}|${password}`+'\r\n', err => {
                                if (err) throw err;
                            })
    
                            await browser.close()
    
                            var files = fs.readFileSync(`./${acc}.txt`, 'utf-8');
                            var lines = files.split('\n')
                            lines.splice(0,1)
                            await fs.writeFileSync(`${acc}.txt`, lines.join('\n'))
                        } else {
                            console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Address has been setting before\n`))
    
                            await fs.appendFile('claimset.txt', `${email}|${password}`+'\r\n', err => {
                                if (err) throw err;
                            })
    
                            await browser.close()
    
                            var files = fs.readFileSync(`./${acc}.txt`, 'utf-8');
                            var lines = files.split('\n')
                            lines.splice(0,1)
                            await fs.writeFileSync(`${acc}.txt`, lines.join('\n'))
                        }
                    } else if (whereCountry == 7 || whereCountry.toLocaleLowerCase() == 'vietnam'){
    
                         await page.waitForSelector("body > div.container.me-body-container > div > div.col-xs-48",{visible:true,timeout:60000})
                        var checkAddress =  await page.$eval("body > div.container.me-body-container > div > div.col-xs-48", el => el.textContent);
                        if(!checkAddress.includes('Delete')){
                            let backSetGerman = true;
                            while(backSetGerman){
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-input-control > span > i",{visible:true,timeout:60000})
                                await page.tap("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-input-control > span > i")
    
                                await page.waitForTimeout(500)
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > span > span > span",{visible:true,timeout:60000})
                                await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > span > span > span", "vietnam")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > ul > li > div",{visible:true,timeout:60000})
    
                                await page.waitForTimeout(1500)
    
                                await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > ul > li > div")
    
                                let changeSuccess = true;

                                while(changeSuccess){
                                    await page.waitForSelector('#address-main > div > div.next-loading-tip > div.next-loading-tip-content', {visible: true, timeout: 1000}).then(async() =>{
                                        
                                        // kondisi jika selector ada
                                    
                                    }).catch(() => {
                                        changeSuccess = false;
                                    })
                                }
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > span > span > span.next-input-control > span > i",{visible:true,timeout:60000})
                                await page.tap("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > span > span > span.next-input-control > span > i")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span",{visible:true,timeout:60000})
                                await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span",{visible:true,timeout:60000})
                                await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span", 'Hai Phong')
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > ul > li",{visible:true,timeout:60000})
                                await page.tap("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > ul > li")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-select-values.next-input-text-field > em > div > span.country-name",{visible:true,timeout:60000})
                                var kota =  await page.$eval("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-select-values.next-input-text-field > em > div > span.country-name", el => el.textContent);
                                if(kota.includes('Vietnam')){
                                    backSetGerman = false;
                                }
                            }

                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span")
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span", `${randomize('A', 7)}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span", `${random.first()} ${random.last()}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span", `17${randomize('0', 7)}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span", `${address} ${address2}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span", `${randomize('0', 5)}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.address-save > button",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.address-save > button")
    
                            await page.waitForSelector("#address-main > div > div > div.address-list-header > button",{visible:true,timeout:60000})
    
                            console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Success setting address\n`))
    
                            await fs.appendFile('doneClaimSetRandom.txt', `${email}|${password}`+'\r\n', err => {
                                if (err) throw err;
                            })
    
                            await browser.close()
    
                            var files = fs.readFileSync(`./${acc}.txt`, 'utf-8');
                            var lines = files.split('\n')
                            lines.splice(0,1)
                            await fs.writeFileSync(`${acc}.txt`, lines.join('\n'))
                        } else {
                            console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Address has been setting before\n`))
    
                            await fs.appendFile('doneClaimSetRandom.txt', `${email}|${password}`+'\r\n', err => {
                                if (err) throw err;
                            })
    
                            await browser.close()
    
                            var files = fs.readFileSync(`./${acc}.txt`, 'utf-8');
                            var lines = files.split('\n')
                            lines.splice(0,1)
                            await fs.writeFileSync(`${acc}.txt`, lines.join('\n'))
                        }
                    } else if (whereCountry == 6 || whereCountry.toLocaleLowerCase() == 'indonesia'){
    
                         await page.waitForSelector("body > div.container.me-body-container > div > div.col-xs-48",{visible:true,timeout:60000})
                        var checkAddress =  await page.$eval("body > div.container.me-body-container > div > div.col-xs-48", el => el.textContent);
                        if(!checkAddress.includes('Delete')){
                            let backSetGerman = true;
                            while(backSetGerman){
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-input-control > span > i",{visible:true,timeout:60000})
                                await page.tap("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-input-control > span > i")
    
                                await page.waitForTimeout(500)
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > span > span > span",{visible:true,timeout:60000})
                                await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > span > span > span", "indonesia")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > ul > li > div",{visible:true,timeout:60000})
    
                                await page.waitForTimeout(1500)
    
                                await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > ul > li > div")
    
                                let changeSuccess = true;

                                while(changeSuccess){
                                    await page.waitForSelector('#address-main > div > div.next-loading-tip > div.next-loading-tip-content', {visible: true, timeout: 1000}).then(async() =>{
                                        
                                        // kondisi jika selector ada
                                    
                                    }).catch(() => {
                                        changeSuccess = false;
                                    })
                                }
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > span > span > span.next-input-control > span > i",{visible:true,timeout:60000})
                                await page.tap("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > span > span > span.next-input-control > span > i")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span",{visible:true,timeout:60000})
                                await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span",{visible:true,timeout:60000})
                                await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span", 'Kepulauan Riau')
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > ul > li",{visible:true,timeout:60000})
                                await page.tap("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > ul > li")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-select-values.next-input-text-field > em > div > span.country-name",{visible:true,timeout:60000})
                                var kota =  await page.$eval("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-select-values.next-input-text-field > em > div > span.country-name", el => el.textContent);
                                if(kota.includes('Indonesia')){
                                    backSetGerman = false;
                                }
                            }
    
                            const fileCityIndonesia = fs.readFileSync(`./cityIndonesia.txt`, 'utf-8');
                            const splitFileCityIndonesia = fileCityIndonesia.split('\r\n');
                            var cityIndonesia = splitFileCityIndonesia[Math.floor(Math.random()*splitFileCityIndonesia.length)];
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > span > span > span.next-input-control > span > i",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > span > span > span.next-input-control > span > i")
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > span > span > span > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > span > span > span > span")
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > span > span > span > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > span > span > span > span", cityIndonesia)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > ul",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > ul")
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span", `${random.first()} ${random.last()}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span", `812${randomize('0', 8)}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span", `${address} ${address2}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span", `${randomize('0', 5)}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.address-save > button",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.address-save > button")
    
                            await page.waitForSelector("#address-main > div > div > div.address-list-header > button",{visible:true,timeout:60000})
    
                            console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Success setting address\n`))
    
                            await fs.appendFile('doneClaimSetRandom.txt', `${email}|${password}`+'\r\n', err => {
                                if (err) throw err;
                            })
    
                            await browser.close()
    
                            var files = fs.readFileSync(`./${acc}.txt`, 'utf-8');
                            var lines = files.split('\n')
                            lines.splice(0,1)
                            await fs.writeFileSync(`${acc}.txt`, lines.join('\n'))
                        } else {
                            console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Address has been setting before\n`))
    
                            await fs.appendFile('doneClaimSetRandom.txt', `${email}|${password}`+'\r\n', err => {
                                if (err) throw err;
                            })
    
                            await browser.close()
    
                            var files = fs.readFileSync(`./${acc}.txt`, 'utf-8');
                            var lines = files.split('\n')
                            lines.splice(0,1)
                            await fs.writeFileSync(`${acc}.txt`, lines.join('\n'))
                        }
                    } else if (whereCountry == 8 || whereCountry.toLocaleLowerCase() == 'ukraine'){
    
                         await page.waitForSelector("body > div.container.me-body-container > div > div.col-xs-48",{visible:true,timeout:60000})
                        var checkAddress =  await page.$eval("body > div.container.me-body-container > div > div.col-xs-48", el => el.textContent);
                        if(!checkAddress.includes('Delete')){
                            let backSetGerman = true;
                            while(backSetGerman){
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-input-control > span > i",{visible:true,timeout:60000})
                                await page.tap("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-input-control > span > i")
    
                                await page.waitForTimeout(500)
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > span > span > span",{visible:true,timeout:60000})
                                await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > span > span > span", "Ukraine")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > ul > li > div",{visible:true,timeout:60000})
    
                                await page.waitForTimeout(1500)
    
                                await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > ul > li > div")
    
                                let changeSuccess = true;

                                while(changeSuccess){
                                    await page.waitForSelector('#address-main > div > div.next-loading-tip > div.next-loading-tip-content', {visible: true, timeout: 1000}).then(async() =>{
                                        
                                        // kondisi jika selector ada
                                    
                                    }).catch(() => {
                                        changeSuccess = false;
                                    })
                                }
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > span > span > span.next-input-control > span > i",{visible:true,timeout:60000})
                                await page.tap("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > span > span > span.next-input-control > span > i")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span",{visible:true,timeout:60000})
                                await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span",{visible:true,timeout:60000})
                                await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span", 'Донецька')
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > ul > li",{visible:true,timeout:60000})
                                await page.tap("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > ul > li")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-select-values.next-input-text-field > em > div > span.country-name",{visible:true,timeout:60000})
                                var kota =  await page.$eval("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-select-values.next-input-text-field > em > div > span.country-name", el => el.textContent);
                                if(kota.includes('Ukraine')){
                                    backSetGerman = false;
                                }
                            }
    
                            const fileCityUkraine = fs.readFileSync(`./cityUkraine.txt`, 'utf-8');
                            const splitFileCityUkraine = fileCityUkraine.split('\r\n');
                            var cityUkraine = splitFileCityUkraine[Math.floor(Math.random()*splitFileCityUkraine.length)];
    
                            await page.waitForTimeout()
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > span > span > span.next-input-control > span > i",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > span > span > span.next-input-control > span > i")
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > span > span > span > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > span > span > span > span")
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > span > span > span > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > span > span > span > span", cityUkraine)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > ul",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span > div > div > div > ul")
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span", `${random.first()} ${random.last()}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span", `003${randomize('0', 10)}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span", `${address} ${address2}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span", `${randomize('0', 5)}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.address-save > button",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.address-save > button")
    
                            await page.waitForSelector("#address-main > div > div > div.address-list-header > button",{visible:true,timeout:60000})
    
                            console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Success setting address\n`))
    
                            await fs.appendFile('doneClaimSetRandom.txt', `${email}|${password}`+'\r\n', err => {
                                if (err) throw err;
                            })
    
                            await browser.close()
    
                            var files = fs.readFileSync(`./${acc}.txt`, 'utf-8');
                            var lines = files.split('\n')
                            lines.splice(0,1)
                            await fs.writeFileSync(`${acc}.txt`, lines.join('\n'))
                        } else {
                            console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Address has been setting before\n`))
    
                            await fs.appendFile('doneClaimSetRandom.txt', `${email}|${password}`+'\r\n', err => {
                                if (err) throw err;
                            })
    
                            await browser.close()
    
                            var files = fs.readFileSync(`./${acc}.txt`, 'utf-8');
                            var lines = files.split('\n')
                            lines.splice(0,1)
                            await fs.writeFileSync(`${acc}.txt`, lines.join('\n'))
                        }
                    } else if(whereCountry == 9 || whereCountry.toLocaleLowerCase() === 'philippines'){
                        await page.waitForSelector("body > div.container.me-body-container > div > div.col-xs-48",{visible:true,timeout:60000})
                        var checkAddress =  await page.$eval("body > div.container.me-body-container > div > div.col-xs-48", el => el.textContent);
                        if(!checkAddress.includes('Delete')){
                            let backSetGerman = true;
                            while(backSetGerman){
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-input-control > span > i",{visible:true,timeout:60000})
                                await page.tap("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-input-control > span > i")
    
                                await page.waitForTimeout(500)
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > span > span > span",{visible:true,timeout:60000})
                                await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > span > span > span", "Philippines")
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > ul > li > div",{visible:true,timeout:60000})
    
                                await page.waitForTimeout(1500)
    
                                await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > ul > li > div")
    
                                let changeSuccess = true;

                                while(changeSuccess){
                                    await page.waitForSelector('#address-main > div > div.next-loading-tip > div.next-loading-tip-content', {visible: true, timeout: 1000}).then(async() =>{
                                        
                                        // kondisi jika selector ada
                                    
                                    }).catch(() => {
                                        changeSuccess = false;
                                    })
                                }
    
                                await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-select-values.next-input-text-field > em > div > span.country-name",{visible:true,timeout:60000})
                                var kota =  await page.$eval("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-select-values.next-input-text-field > em > div > span.country-name", el => el.textContent);
                                if(kota.includes('Philippines')){
                                    backSetGerman = false;
                                }
                            }
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span", randomize('A', 7))

                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span")
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(3) > span", randomize('A', 8))
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.contactPerson > div > span", `${random.first()} ${random.last()}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.personInfo > div.input-default.phoneCountry > div > div.phone-text > span", `92${randomize('0', 8)}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.address > div > span", `${address} ${address2}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span")
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span",{visible:true,timeout:60000})
                            await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.zip > div > span", `${randomize('0', 5)}`)
    
                            await page.waitForTimeout(200)
    
                            await page.waitForSelector("#address-main > div > div > div > div > div.address-save > button",{visible:true,timeout:60000})
                            await page.click("#address-main > div > div > div > div > div.address-save > button")
    
                            await page.waitForSelector("#address-main > div > div > div.address-list-header > button",{visible:true,timeout:60000})
    
                            console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Success setting address\n`))
    
                            await fs.appendFile('doneClaimSetRandom.txt', `${email}|${password}`+'\r\n', err => {
                                if (err) throw err;
                            })
    
                            await browser.close()
    
                            var files = fs.readFileSync(`./${acc}.txt`, 'utf-8');
                            var lines = files.split('\n')
                            lines.splice(0,1)
                            await fs.writeFileSync(`${acc}.txt`, lines.join('\n'))
                        } else {
                            console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Address has been setting before\n`))
    
                            await fs.appendFile('doneClaimSetRandom.txt', `${email}|${password}`+'\r\n', err => {
                                if (err) throw err;
                            })
    
                            await browser.close()
    
                            var files = fs.readFileSync(`./${acc}.txt`, 'utf-8');
                            var lines = files.split('\n')
                            lines.splice(0,1)
                            await fs.writeFileSync(`${acc}.txt`, lines.join('\n'))
                        }
                    }
                }
            } else {
                console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] All done !\n`))
                stop = false;
            }
        } catch (e) {
            console.log(`[!] ERROR: ${e}\n`)
        }
    }
})()