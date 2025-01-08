const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const Database = require("./DataApp")
const templateEngin = require('nunjucks')

templateEngin.configure('views', {
    express: app,

});
let IdOfTutor
let TutorInforArray;
let TutorTimeAva;
let TutorTimeAva2;

app.use(express.static('public'));
nunjucks.configure('views', {
    autoescape: true,
    express: app
});


app.get('/', function (req, res) {
    res.render('main.html');
});


app.get('/AdminPage', function (req, res) {
    res.render('admin_page.html');
});

app.get('/AdminLogin', function (req, res) {
    res.render('admin_login.html');
});

app.get('/Register', function (req, res) {
    res.render('register.html');
});


app.get('/TutorLogin', function (req, res) {
    res.render('tutor_login.html');
});


app.get('/StudentLogin', function (req, res) {
    res.render('student_login.html');
});

app.get('/TutorPage', function (req, res) {
    res.render('tutor_page.html');
});

app.get('/ReviewTutorPage', function (req, res) {
    res.render('review_tutor_page.html');
});

app.get('/ForgetPasswordPage', function (req, res) {
    res.render('forget_password_page.html');
});

app.get("/FeedBackSent",(req,res)=>{
    // res.send("Your FeedBack has been sent ")
    res.render("review_tutor_page.html")
})

app.get('/RequestToTutor', function(req, res) {
    res.render('tutor_request_page.html');
});

//redirects
app.post("/BackButtonReviewTutor", (req, res) => {
    res.redirect("/")
})


app.post("/RedirectToStudentPage",(req,res)=>{
    res.redirect("/StudentPage");
})

app.post("/TakeToStudentPage",(req,res)=>{
    res.redirect("/StudentLogin");

})

app.post("/TakeToTutorPage",(req,res)=>{
    res.redirect("/TutorLogin");

})
app.post("/TakeToAdminPage",(req,res)=>{
    res.redirect("/AdminLogin");

})
app.post("/TakeToRegisterPage",(req,res)=>{
    res.redirect("/Register");

})

app.post("/GoBackToMainPage",(req,res)=>{
    res.redirect("/");
})

// app.post("/ForgetPasswordLink", (req,res) =>{
//     res.redirect("/ForgetPasswordPage");

// })

// ======================== STUDENT PAGE Backend Work ============================= // 



app.get("/ScheduleTutor", async (req, res) => {
    // console.log("is it working ??")
    // console.log(req.query.CourseSelected)
    // res.redirect("/ReviewTutorPage")
    const days = req.query.day
    const course = req.query.CourseSelected
    // console.log(course)
    const Cname = course.substring(0, course.indexOf(" "));
    // console.log("course name : " + Cname)
    const Cnumber = course.substring(course.indexOf(" ") + 1);
    // console.log("Cnumber :" + Cnumber)
    console.log("days : ", days)
    // let OwnPromise = new Promise((resolve,reject)=>{
    //     let output = Database.getTutors(Cname,Cnumber,days,1)


    //     if(output){
    //         resolve(output)
    //     }
    //     else{
    //         reject("Error Occured")
    //     }
    // })
    // let IdOfTutor ; 
    // let TutorInfoMatch;
    // OwnPromise.then((array)=>{
    //     let IdOfTutor = array[0];

    // }).catch((error)=>{
    //     console.log("Did not work")
    //     console.log(error);
    // })
    //  let SecondPromise = new Promise((resolve,reject)=>{
    //     let TutorMatch = Database.GetTutorInfo(IdOfTutor);
    //     if(TutorMatch){
    //         resolve(TutorMatch)
    //     }
    //     else{
    //         reject("Error Type 2")
    //     }
    // })
    // SecondPromise.then((TutorInfo)=>{
    //     TutorInforArray = TutorInfo;
    //     console.log(TutorInfo);    
    //     console.log("Second Promise Working Fine")
    // }).catch((error)=>{
    //     console.log(error)
    // })

    try {

        let OwnPromise = await new Promise((resolve, reject) => {
            let output = Database.getTutors(Cname, Cnumber, days, 1)


            if (output) {
                resolve(output)
            }
            else {
                reject("Error Occured")
            }
        }).then((array) => {
            console.log("array >>>>> ", array)
            IdOfTutor = array[0];
            TutorTimeAva = array[2];
            TutorTimeAva2 = TutorTimeAva[0].Stime + " ---- " + TutorTimeAva[0].Etime;
            console.log("Time IS ==> ", TutorTimeAva2)
            console.log(array[0]);

        }).catch((error) => {
            console.log("Did not work")
            console.log(error);
        })


        let SecondPromise = await new Promise((resolve, reject) => {
            let TutorMatch = Database.GetTutorInfo(IdOfTutor);
            if (TutorMatch) {
                resolve(TutorMatch)
            }
            else {
                reject("Error Type 2")
            }
        }).then((TutorInfo) => {
            TutorInforArray = TutorInfo;
            console.log(TutorInfo);
            console.log("Second Promise Working Fine")
        }).catch((error) => {
            console.log(error)
        })

        res.render("student_page.html", { MyData: TutorInforArray, MyTime: TutorTimeAva2 })
    }
    catch (err) {
        console.log("Error: ", err)

    }


    // res.redirect("/StudentPageDemo")


})

// app.post("/ScheduleTutor",(req,res)=>{

// })


// app.get('/StudentPage', function(req, res) {

// });




app.post("/BackButton", (req, res) => {
    res.redirect("/StudentLogin")
});


const tasks = [
    { id: 1, title: "Study", done: false },
    { id: 2, title: "Exercise", done: false },
    { id: 3, title: "Sleep", done: true },
]



// app.route("/StudentPage").get(async (req,res)=>{

//         const t = TutorInforArray;
//         console.log("t is ==== ", t)

//     res.render("student_page.html",{myData: await t})      

//     })


//     .post((req,res)=>{


// })
app.get("/StudentPage", (req, res) => {
    res.render("student_page.html")
})

app.get("/StudentPageDemo", (req, res) => { //just testing 
    const t = TutorInforArray
    console.log("t : +++", t)
})




// ======================== FORGET PASSWORD PAGE Backend Work ============================= // 
const nodemailer = require('nodemailer');

app.use(express.urlencoded({ extended: true }));
app.get('/EmailForm', async (req, res) => {
    const email = req.query.email;
    // console.log(email);

    const otp = Math.floor(1000 + Math.random() * 9000); // generate a random 4-digit OTP
    // console.log(otp)

    let emailValid = await Database.isEmailValid(email);


    if (emailValid > 0) {
        try {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'smtp.office365.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 's201970750@kfupm.edu.sa', //You have to place your actual email here as the sender (only works on @kfupm.edu.sa)
                    pass: 'B@tman123694578' //You have to place your actual password here as the sender
                }
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Sender Name" <s201970750@kfupm.edu.sa>', // Sending from Osamah's email
                to: email,
                subject: 'OTP for Password Reset',
                html: `<h3>Please do not share the following OTP.</h3><br><p>Your OTP for password reset is: ${otp}</p>`
            });

            // store the OTP in a server-side variable for later verification
            generatedOtp = otp;
            inputEmail = email;
            res.json({ success: true });

        } catch (error) {
            console.log('Did not work');
            console.log(error);
        }
    } else {
        // alert that the email may be incorrect or that they do not have an account registered
        res.status(400).json({ success: false });
    }
});


app.get('/OTPForm', (req, res) => {
    let otp = req.query.otp;
    otp = parseInt(otp) // Turns OTP into Int so it can be checked with GeneratedOtp
    // check if the OTP is valid
    let OtpValid = Database.isOtpValid(otp);


    if (OtpValid == 1) {
        // hide "otp-card" and unhide the "reset-card"
        res.json({ success: true });
    } else {
        // alert that they may have sent an invalid otp
        res.status(400).json({ success: false })
    }
});

app.get('/ResetPasswordForm', async (req, res) => {
    const inputPass1 = req.query.passwordInput; // First new Password

    const inputPass2 = req.query.confirmPasswordInput; // Re-written new Password
    console.log(inputPass1)
    console.log(inputPass2)
    pass = inputPass1;

    if (inputPass1 === inputPass2) {
        try {
            const success = await Database.updateUserPass(pass, inputEmail);
            if (success === true) {
                console.log('Sending response with status code 200 and body:', { success: true });
                res.status(200).json({ success: true });
            } else {
                console.log('Sending response with status code 500 and body:', { success: false });
                res.status(500).json({ success: false });
            }
        }
        catch (error) {
            console.log('Error caught in /ResetPasswordForm route:', error);
            console.log('Sending response with status code 500 and body:', { success: false });
            res.status(500).json({ success: false });
        }

    } else {
        console.log('Sending response with status code 400 and body:', { success: false, message: 'Passwords do not match' });
        res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

});


// ======================== STUDENT LOGIN PAGE Backend Work ============================= // 


app.get('/StudentLoginForm', async (req, res) => {
    const StuEmail = req.query.emailStu;
    const StuPass = req.query.passStu;

    if (StuEmail == 0 || StuPass == 0) {
        res.status(400).json({ success: false })
    }

    else {


        try {
            const valid = await Database.validStuLogin(StuEmail, StuPass);
            if (valid) {
                console.log('Sending response with status code 200 and body:', { success: true });
                res.status(200).json({ success: true });
            } else {
                // alert that the email may be incorrect or that they do not have an account registered
                res.status(400).json({ success: false });
            }
        } catch (error) {
            console.log('Error caught in /StudentLogin route:', error);
            console.log('Sending response with status code 500 and body:', { success: false });
            res.status(500).json({ success: false });
        }
    }
});



// ======================== TUTOR LOGIN PAGE Backend Work ============================= // 

app.get('/TutorLoginForm', async (req, res) => {
    const TutEmail = req.query.emailTut;
    const TutPass = req.query.passTut;

    if (TutEmail == 0 || TutPass == 0) {
        res.status(400).json({ success: false })
    }

    else {


        try {
            const valid = await Database.validTutLogin(TutEmail, TutPass);
            console.log(valid)
            if (valid) {
                console.log('Sending response with status code 200 and body:', { success: true });
                res.status(200).json({ success: true });
            } else {
                // alert that the email may be incorrect or that they do not have an account registered
                res.status(400).json({ success: false });
            }
        } catch (error) {
            console.log('Error caught in /StudentLogin route:', error);
            console.log('Sending response with status code 500 and body:', { success: false });
            res.status(500).json({ success: false });
        }
    }
});

// ======================== ADMIN LOGIN PAGE Backend Work ============================= // 

app.get('/AdminLoginForm', async (req, res) => {
    const AdminEmail = req.query.emailAdmin;
    const AdminPass = req.query.passAdmin;

    if (AdminEmail == 0 || AdminPass == 0) {
        res.status(400).json({ success: false })
    }

    else {


        try {
            const valid = await Database.validAdminLogin(AdminEmail, AdminPass);
            console.log(valid)
            if (valid) {
                console.log('Sending response with status code 200 and body:', { success: true });
                res.status(200).json({ success: true });
            } else {
                // alert that the email may be incorrect or that they do not have an account registered
                res.status(400).json({ success: false });
            }
        } catch (error) {
            console.log('Error caught in /StudentLogin route:', error);
            console.log('Sending response with status code 500 and body:', { success: false });
            res.status(500).json({ success: false });
        }
    }
});

// ======================== REVIEW TUTOR PAGE Backend Work ============================= // 

app.get('/ReviewTutorPage', async function(req, res) {
    let SendToHtml = [];
    let ThePromise = await new Promise((resolve,reject)=>{
        let OutPutOfPromise = Database.GetAllTutors()
        if(OutPutOfPromise){
            resolve(OutPutOfPromise)
        }
        else{
            reject("Error 4")
        }
    
    }).then((array)=>{

        SendToHtml = array;
        
    })
    // unescape(SendToHtml)

    await res.render('review_tutor_page.html',{x:SendToHtml});
});



app.post("/ReviewTutorSubmit",(req,res)=>{
    let theID = req.body.ItemSelected
    let TheStar = req.body.star
    let theComment = req.body.CommentOfStudent
    console.log("TypeOf Thecomment --> ", typeof(theComment))
    Database.RateTheTutor(theID,TheStar,theComment);
    res.redirect("/FeedBackSent")

})

// ======================== REQUEST TO TUTOR PAGE Backend Work ============================= // 
app.get("/Request_To_Tutor_Form",(req,res)=>{
    let Choose_Course = req.query.Course_Drop;
    
    let Choose_Grade = req.query.Grade_Drop;
 try{
     let output = Database.SubmitReqform(Choose_Course,Choose_Grade)
 }
 catch(err){
     console.log("Error: ",err)
 
 }
 
 
 })







app.listen(4639);