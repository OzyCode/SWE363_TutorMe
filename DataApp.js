
const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite')
const server = require("./app");

const getDbConnection = async () => {
    return await sqlite.open({
        filename: 'KFUPMtutors.db',
        driver: sqlite3.Database
    })
}
// name, phone number, email, avaliable times, Online ?? 


// async function init() {
//     //1. get the connection to the database
//     const db = await sqlite.open({
//         filename: 'tutors.db',
//         driver: sqlite3.Database
//     })


//     // await db.exec(`CREATE TABLE IF NOT EXIST tutors(id INTEGER ,name,PhoneNumber,email,aTimes,Virtual, PRIMARY KEY(id), FOREIGN KEY(aTimes) REFERENCE tutors_times`)


//     // console.log(inf)
//     const rows = await db.all('select * from tutors')
//     console.log(rows)

// }
// init().then()

async function getTutors(CourseName, CourseNumber, Days, online) {
    const TutorsArray = Days;

    if (online == 1) {

        const db = await getDbConnection()
        // a query to get the id of the tutor Avaliable for online sessions
        const tutID = await db.all(`select TutID from Tutor where Online = 1 `);
        console.log(tutID)
        // ---------------------------- //

        // a query to select the name of the tutor teaching the course online


        const tutIDonline = await db.all(`select TutorID from Tutors_Days_Course where CourseName = '${CourseName}' and CourseNumber= '${CourseNumber}' `)
        console.log("tutIDonline: ", tutIDonline)


        // console.log("==> ",tutIDonline)
        const OnlineCourseArr = [];
        for (let i = 0; i < tutID.length; i++) {

            for (let j = 0; j < tutIDonline.length; j++) {

                if (tutID[i].TutID == tutIDonline[j].TutorID) {

                    OnlineCourseArr.push(tutIDonline[j]);
                }
            }
        }

        // Online course array "OnlineCourseArr" is an array that gives the id of the tutors that teach the course that student selected and the session MUST be Online

        console.log("OnlineCourse Array: ", OnlineCourseArr)

        // ---------------------------------- //
        // for(let i = 0 ; i<tutIDonline.length;i++){
        //     console.log(tutIDonline[i].name);
        // }

        // a Query to select the days that the tutor is avaliable for


        // we should loop thro the OnlineCourseArr To find the tutors who teach in the days that the Student choose 

        const daysArrays = [];
        // console.log("Length is " , OnlineCourseArr.length)
        for (let i = 0; i < OnlineCourseArr.length; i++) {
            let x = OnlineCourseArr[i].TutorID;
            let days = await db.all(`select Day from Tutors_Days_Course where TutorID=${x} `);
            const combinedArray = [x, days]
            daysArrays.push(combinedArray);
        }
        console.log(daysArrays)
        console.log(daysArrays.length)
        const choosedArray = [];

        // x = 0 , y = 0 
        // daysArrays.length[0] == 2  
        // for(let x = 0 ; x<daysArrays.length;x++){
        //     console.log("daysArrays[x][1][y].length",daysArrays[x].length)

        //     for(let y = 0 ; y<daysArrays[x][1][y].length;y++){
        //         console.log(y,x)
        //         console.log("LOOP : ", daysArrays[x][1][y].Day )
        //         if(daysArrays[x][1][y].Day == "W"){
        //             console.log("it is working fine")
        //         }
        //     }
        // }


        console.log(daysArrays[0][0])
        // daysArrays ==> [[id,[{days available}]]]
        // daysArrays ==> [ [ 2, [ [Object] ] ], [ 5, [ [Object] ] ] ]

        // where Object is ==> for example --> [5,[{Day:'R'}]]

        // ------------------------------ //
        const avaliableTutors = []
        for (let i = 0; i < daysArrays.length; i++) {
            const time = await db.all(`select Stime,Etime from Tutors_Days_Course where TutorID = ${daysArrays[i][0]}`);


            const theDay = Days + ""
            console.log("DAYS ARRAYS ", daysArrays[i][0], daysArrays[i][1])

            if (theDay.toUpperCase() == "SUNDAY" && daysArrays[i][1][0].Day == "U") {

                avaliableTutors.push(daysArrays[i][0], daysArrays[i][1], time);
                break;
            }
            else if (theDay.toUpperCase() == "MONDAY" && daysArrays[i][1][0].Day == "M") {
                avaliableTutors.push(daysArrays[i][0], daysArrays[i][1], time);
                break;
            }
            else if (theDay.toUpperCase() == "TUESDAY" && daysArrays[i][1][0].Day == "T") {
                console.log("Working !!!")
                avaliableTutors.push(daysArrays[i][0], daysArrays[i][1], time);
                break;

            }
            else if (theDay.toUpperCase() == "WEDNESDAY" && daysArrays[i][1][0].Day == "W") {
                avaliableTutors.push(daysArrays[i][0], daysArrays[i][1], time);
                break;

                console.log("Pushed ???")

            }
            else if (theDay.toUpperCase() == "THURSDAY" && daysArrays[i][1][0].Day == "R") {
                avaliableTutors.push(daysArrays[i][0], daysArrays[i][1], time);
                break;
            }

        }
        console.log("avaliableTutors : ", avaliableTutors)

        //avaliableTutors gives the first index as id of tutor and second index what day he teach and third index the time he is teaching


        // time outcome for example ==> [ { Stime: '4:30PM', Etime: '5:30PM' } ]

        // we have the id, avaialble days and Stime and Etime 
        // Now we need to get the PERSONAL information of a tutor 


        return avaliableTutors;


        await db.close()
    }
    else {

        const db = await getDbConnection()
        // a query to get the id of the tutor Avaliable for online sessions
        const tutID = await db.all(`select TutID from Tutor where Online = 0 `);
        console.log(tutID)

        // a query to select the name of the tutor teaching the course online


        const tutIDonline = await db.all(`select TutorID from Tutors_Days_Course where CourseName = '${CourseName}' and CourseNumber= '${CourseNumber}' `)
        console.log("tutIDonline: ", tutIDonline)


        const OnlineCourseArr = [];
        for (let i = 0; i < tutID.length; i++) {

            for (let j = 0; j < tutIDonline.length; j++) {
                console.log("tutID[i].TutID==tutIDonline[j].TutorID ====>> " + tutID[i].TutID, tutIDonline[j].TutorID)
                if (tutID[i].TutID == tutIDonline[j].TutorID) {

                    console.log("tutIDonline[j] =====>> " + tutIDonline[j])
                    OnlineCourseArr.push(tutIDonline[j]);
                }
            }
        }

        // Online course array "OnlineCourseArr" is an array that gives the id of the tutors that teach the course that student selected and the session MUST be Online

        console.log("OnlineCourse Array: ", OnlineCourseArr)

        // ---------------------------------- //
        // for(let i = 0 ; i<tutIDonline.length;i++){
        //     console.log(tutIDonline[i].name);
        // }

        // a Query to select the days that the tutor is avaliable for


        // we should loop thro the OnlineCourseArr To find the tutors who teach in the days that the Student choose 

        const daysArrays = [];
        console.log("Length is ", OnlineCourseArr.length)
        for (let i = 0; i < OnlineCourseArr.length; i++) {
            let x = OnlineCourseArr[i].TutorID;

            let days = await db.all(`select Day from Tutors_Days_Course where TutorID=${x} `);
            const combinedArray = [x, days]
            daysArrays.push(combinedArray);
        }


        // ------------------------------ //
        const avaliableTutors = []
        for (let i = 0; i < daysArrays.length; i++) {
            const time = await db.all(`select Stime,Etime from Tutors_Days_Course where TutorID = ${daysArrays[i][0]}`);
            console.log(daysArrays[0][1][0].Day)
            console.log("DAYS : " + Days + "... daysArrays[i][1] : " + daysArrays[i][1][0].Day)
            const theDay = Days + ""
            console.log("theDay == > " + theDay.toUpperCase())

            if (theDay.toUpperCase() == "SUNDAY" && daysArrays[i][1][0].Day == "U") {

                avaliableTutors.push(daysArrays[i][0], daysArrays[i][1], time);
                break;
            }
            else if (theDay.toUpperCase() == "MONDAY" && daysArrays[i][1][0].Day == "M") {
                avaliableTutors.push(daysArrays[i][0], daysArrays[i][1], time);
                break;
            }
            else if (theDay.toUpperCase() == "TUESDAY" && daysArrays[i][1][0].Day == "T") {
                avaliableTutors.push(daysArrays[i][0], daysArrays[i][1], time);
                break;

            }
            else if (theDay.toUpperCase() == "WEDNESDAY" && daysArrays[i][1][0].Day == "W") {
                avaliableTutors.push(daysArrays[i][0], daysArrays[i][1], time);
                break;
            }
            else if (theDay.toUpperCase() == "THURSDAY" && daysArrays[i][1][0].Day == "R") {
                avaliableTutors.push(daysArrays[i][0], daysArrays[i][1], time);
                break;
            }

        }
        if (avaliableTutors.length == 0) {
            avaliableTutors.push(-1080);
        }

        return avaliableTutors;
        await db.close()
    }


}




async function GetTutorInfo(id) {
    const db = await getDbConnection()

    const tutData = await db.all(`select Name,PhoneNumber,Email from Tutor where TutID = ${id} `);

    console.log("==========================================")
    // TutData outcome : -->tutData :- 
    //[
    //   {
    //     Name: 'Khaled',
    //     PhoneNumber: '0543210',
    //     Email: 'khaledwork@gmail.com'
    //   }
    // ]



    const array = [tutData[0].Name, tutData[0].PhoneNumber, tutData[0].Email]
    // console.log("tutData : " ,tutData)

    return array
}


async function isEmailValid(email) {
    const db = await getDbConnection();

    // check if the email is found in the Student table
    const userData_Stu = await db.all(`SELECT Email FROM Student WHERE Email = ?`, [email]);

    // check if the email is found in the Tutor table
    const userData_Tut = await db.all(`SELECT Email FROM Tutor WHERE Email = ?`, [email]);

    // return 1 if the email is found in either table, otherwise return 0
    if (userData_Stu.length + userData_Tut.length > 0) {
        if (userData_Stu.length == 1 && userData_Tut.length == 0) {
            return 1;
        }
        else if (userData_Stu.length == 0 && userData_Tut.length == 1) {
            return 2;
        }
        else {
            return 3;
        }

    } else { // return 0 if the email is not found in the database
        return 0;
    }
}


function isOtpValid(otp) {
    // check if the OTP entered by the user matches the generated OTP
    if (otp === generatedOtp) {
        return 1;
    }
    else {
        return 0;
    }
}




async function updateUserPass(pass) {
    console.log('updateUserPass function called with pass:', pass);
    console.log("the pass in updateUserPass is ", pass)
    console.log("the inputEmail in updateUserPass is ", inputEmail)

    let emailType = await isEmailValid(inputEmail);
    console.log("the isEmailValid(inputEmail) in updateUserPass is ", emailType)
    const db = await getDbConnection();


    if (emailType > 0) { // checks if user is found in DB
        if (emailType == 1) { // checks if user is ONLY a student
            console.log("password is here emailType == 1")
            return new Promise((resolve, reject) => {
                console.log("updating password...")
                try {
                    db.run('UPDATE Student SET Password = ? WHERE Email = ?', [pass, inputEmail]);
                    resolve(true);
                } catch (error) {
                    console.log('Error caught when updating password in Student table:', error);
                    reject(error);
                }
            });
        } else if (emailType == 2) {// checks if user is ONLY a tutor
            return new Promise((resolve, reject) => {
                console.log("updating password...")
                try {
                    db.run('UPDATE Tutor SET Password = ? WHERE Email = ?', [pass, inputEmail]);
                    resolve(true);
                } catch (error) {
                    console.log('Error caught when updating password in Tutor table:', error);
                    reject(error);
                }
            });
        } else if (emailType == 3) { // checks if user is BOTH a student and a tutor
            return new Promise((resolve, reject) => {
                db.serialize(() => { // method that ensure that both tables are being updated 
                    db.run('BEGIN TRANSACTION');

                    db.run(
                        'UPDATE Student SET Password = ? WHERE Email = ?', [pass, inputEmail],
                        (error) => {
                            if (error) {
                                console.log('Error caught when updating password in Student table:', error);
                                db.run('ROLLBACK'); // undoes any updates if there was an error 
                                resolve(false);
                            }
                        }
                    );

                    db.run('UPDATE Tutor SET Password = ? WHERE Email = ?', [pass, inputEmail],
                        (error) => {
                            if (error) {
                                console.log('Error caught when updating password in Tutor table:', error);
                                // undoes any updates if there was an error 
                                db.run('ROLLBACK');
                                resolve(false);
                            }
                        }
                    );

                    db.run('COMMIT');
                    reject(true);
                });
            });
        }

    } else {
        console.log('Error caught in updateUserPass function');
        return false;
    }

}




async function validStuLogin(email, password) {
    const db = await getDbConnection();

    // Check if there is a student with the provided email and password
    const studentData = await db.all(
        `SELECT * FROM Student WHERE Email = ? AND Password = ?`,
        [email, password]
    );

    // Return true if a student is found, otherwise return false
    return studentData.length === 1;
}


async function validTutLogin(email, password) {
    const db = await getDbConnection();

    // Check if there is a student with the provided email and password
    const tutorData = await db.all(
        `SELECT * FROM Tutor WHERE Email = ? AND Password = ?`,
        [email, password]
    );

    // Return true if a student is found, otherwise return false
    return tutorData.length === 1;
}

async function validAdminLogin(email, password) {
    const db = await getDbConnection();

    // Check if there is a student with the provided email and password
    const adminData = await db.all(
        `SELECT * FROM Admin WHERE password = ? AND email = ?`,
        [password,email]
    );

    // Return true if a student is found, otherwise return false
    return adminData.length === 1;
}

async function RateTheTutor(id,rate,comment){
    const db = await getDbConnection()
    console.log("comment is " , comment)
    console.log("Working >?")
    await db.all("INSERT INTO TutorReivew VALUES(?,?,?)",id,rate,comment)
    // console.log("Inserting Tutor Review ==> ", InsertingInfo);
    db.close()
}

async function GetAllTutors(){
    const db = await getDbConnection()
    const AllTheTutors = await db.all(`Select Name,TutID from Tutor`);
    console.log("Names are ^^ --> ^^ __",AllTheTutors)
    return AllTheTutors;
}

async function SubmitReqform(courseName, grade) {
    const db = await getDbConnection();
    const retrive= await db.all(`SELECT tutid,name  FROM Admin_Help WHERE tutid=1`);
    console.log("retrive",retrive)
    
    const stmt = await db.prepare(
      `INSERT INTO Admin_Notif (name,CourseName, Grade) VALUES (?,?,?)`
    );
    await stmt.run(retrive[0].name,courseName, grade);
    console.log("retrive",retrive)
  }

module.exports = {RateTheTutor,GetAllTutors, SubmitReqform, getTutors, GetTutorInfo, isOtpValid, isEmailValid, updateUserPass, validStuLogin,validTutLogin,validAdminLogin  };