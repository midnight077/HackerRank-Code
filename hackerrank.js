
let puppeteer = require("puppeteer");
let cPage;
let email = "ticof80559@youke1.com";
let password = "abcdef";

let browserLaunchPromise = puppeteer.launch({
    headless : false
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
    let loginBtnClickPromise = cPage.click("button[data-analytics='LoginPassword']")
    return loginBtnClickPromise;
}).then(function(){
    console.log("Login done");
}).catch(function(err){
    console.log("err " , err);
})
