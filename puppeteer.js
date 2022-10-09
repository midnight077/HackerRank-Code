let puppeteer = require("puppeteer");
let browserLaunchPromise = puppeteer.launch({
    headless : false
})
// browserLaunchPromise
//     .then(function(browserInstance){
//         let newTabPromise = browserInstance.newPage();
//         newTabPromise
//             .then(function(newPageInstance){
//                 // console.log("new tab opened " , newPageInstance);
//                 // to go google 
//                 let goToGooglePromise = newPageInstance.goto("https://www.google.com");
//                 goToGooglePromise
//                     .then(function(){
//                         console.log("reached google")
//                     })

//             })
//     })

// chaining -------------------
browserLaunchPromise
    .then(function(browserInstance){
        let newTabPromise = browserInstance.newPage();
        return newTabPromise        
    }).then(function(newPageInstance){
        // console.log("new tab opened " , newPageInstance);
        // to go google 
        let goToGooglePromise = newPageInstance.goto("https://www.google.com");
        return goToGooglePromise 
    }).then(function(){
        console.log("reached google")
    }).catch(function(err){
        console.log(err);
    })