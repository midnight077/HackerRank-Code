
let puppeteer = require("puppeteer");
let cPage;
let email = "ticof80559@youke1.com";
let password = "abcdef";

let browserLaunchPromise = puppeteer.launch({
    headless : false,
    defaultViewport: null,
    args: ["--start-maximized"]
});
browserLaunchPromise.then(function(browserInstance){
    let newPagePromise = browserInstance.newPage();
    return newPagePromise;
}).then(function(newPageInstance){
    let loginPagePromise =  newPageInstance.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    cPage = newPageInstance;
    return loginPagePromise;
}).then(function(){
    // write email
    let emailTypePromise = cPage.type("input[name='username']" , email , {delay :200});
    return emailTypePromise;
}).then(function(){
    // write password
    let passwordTypePromise = cPage.type("input[name='password']" , password , {delay :200});
    return passwordTypePromise;
}).then(function(){
    // press login button
    let loginBtnClickPromise = cPage.click("button[data-analytics='LoginPassword']");
    let waitPromise =  cPage.waitForSelector("a[data-analytics='StartPreparation']");
    let combPromise = Promise.all([loginBtnClickPromise , cPage.waitForNavigation({waitUntil:"networkidle0"}), waitPromise]);
    return combPromise;
}).then(function(){
    console.log("Login done");
    let startPrepClickPromise = cPage.click("a[data-analytics='StartPreparation']");
    return startPrepClickPromise;
}).then(function(){
    // questions page
    console.log("q");
}).catch(function(err){
    console.log("err " , err);
})
console.log("after");