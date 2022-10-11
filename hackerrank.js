
let puppeteer = require("puppeteer");
const code = require("./code");
let cPage;
let email = "ticof80559@youke1.com";
let password = "abcdef";
let {codes} = require("./code");
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
    return loginBtnClickPromise;
}).then(function(){
    console.log("Login done");
    // let waitClickStartPrepPromise = waitAndClickPromise("a[data-analytics='StartPreparation']");
    let waitClickStartPrepPromise = waitAndClickPromise("a[aria-labelledby='base-card-1 base-card-1-link']");
    return waitClickStartPrepPromise;
}).then(function(){
    // wait for questions page 
    return cPage.waitForSelector(".page-label-wrapper.text-headline")
})
.then(function(){
    // questions list page
    // get url
    console.log("get url");
    return cPage.url();
}).then(function(url){
    console.log(url);
    let quesObj = codes[0];
    let questionSolvePromise = questionSolver(url, quesObj.qName , quesObj.soln);
    for(let i = 1 ; i< codes.length ; i++){
        questionSolvePromise = questionSolvePromise.then(function(){
            return questionSolver(url ,codes[i].qName , codes[i].soln);
        });
    }
    return questionSolvePromise;
}).then(function(){
    console.log("1 quest done");
})
.catch(function(err){
    console.log("err " , err);
})
console.log("after");

function waitAndClickPromise(selector){
    return new Promise(function(resolve , reject){
        let waitP = cPage.waitForSelector(selector);
        waitP.then(function(){
            return cPage.click(selector);
        }).then(function(){
            resolve();
        })
    });
}

function questionSolver(allQuestionPageUrl , qname , qsol){
    return new Promise(function ( resolve , reject){
        let allQPagePromise = cPage.goto(allQuestionPageUrl);
        // console.log(allQPagePromise);
        allQPagePromise
        .then(function(){
            // extract name of all questions
            // cpage.evaluate(function , param1,param2 , ...)
            function quesPageClickFn(qname){
                // find question in list
                console.log("70 hi");
                console.log(qname);
                let allquesName = document.querySelectorAll(".interview-ch-li-grid h2");
                console.log(allquesName);
                for(let i=0 ; i< allquesName.length ; i++){
                    console.log(i, " " , allquesName[i].innerText);
                    if(qname == allquesName[i].innerText){
                        console.log(i, "about to click " , allquesName[i].innerText);
                        // allquesName[i].click(); // this doesnt work, why ? idk
                        document.querySelectorAll(".ui-btn.ui-btn-normal.ui-btn-line-primary.interview-ch-li-cta.ui-btn-link.ui-btn-styled")[i].click();
                        // document.querySelectorAll(".interview-ch-li-grid")[0].click();
                    
                        console.log("clicked");
                        break;
                    }
                }
            }
            let quesPageClickPromise =  cPage.evaluate(quesPageClickFn , qname );
            console.log("quesPageClickPromise" , quesPageClickPromise)
            return quesPageClickPromise;
        }).then(function(){
            // checkbox click
            return waitAndClickPromise("input[type='checkbox']");
        }).then(function(){
            // type answer
            return cPage.type(".input-wrap textarea" , qsol );
        })
        .then(function(){
            // control presss
            return cPage.keyboard.down("Control");
        }).then(function(){
            return cPage.keyboard.press("a");
        }).then(function(){
            return cPage.keyboard.press("x");
        }).then(function(){
            // click monako editor
            return cPage.click(".monaco-editor.no-user-select.vs");
        })
        .then(function(){
            return cPage.keyboard.press("a");
        }).then(function(){
            return cPage.keyboard.press("v");
        }).then(function(){
            // control presss
            return cPage.keyboard.up("Control");
        })
        .then(function(){
            // click submit
            return cPage.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled");
        })
        .then(function(){
            resolve();
        }).catch(function(err){
            console.log("rejection")
            reject(err);
        });
    });
}
