-- SQLite
-- name, phone number, email, avaliable times, Online ?? 

CREATE TABLE IF NOT EXISTS tutors(id , name, PhoneNumber, email, aTimeID, Online, PRIMARY KEY (id), FOREIGN KEY(aTimeID) REFERENCES tutors_times(timesID) );

CREATE TABLE IF NOT EXISTS tutors_times(id,timesID,times,PRIMARY KEY(timesID),FOREIGN KEY(id) REFERENCES tutors(id));    

--CREATE TABLE IF NOT EXISTS Admin_Help (tutid,name,CourseName,CourseNumber,Grade,FOREIGN KEY(tutid) REFERENCES tutor(TutID));

--INSERT INTO Admin_Help VALUES(1,'Khaled','MATH',101,'A+'),(2,'Waleed','PHYS',101,'B+'),(4,'Jack','CHEM',101,'A');

--CREATE TABLE IF NOT EXISTS Admin_Notif (name,CourseName,Grade);
