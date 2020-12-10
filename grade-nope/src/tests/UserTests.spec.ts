import { expect } from 'chai';
import Student from '../Student';
import Teacher from '../Teacher';

describe("testing user functions", () => {
    let student = new Student(1,"John","12345");
    let teacher = new Teacher(2, "TestTeacher", "54321");
    let removeUser = new Student(3, "removeTest", "2345");
    student.addUserToJSON();
    teacher.addUserToJSON();
    removeUser.addUserToJSON();
    const fs = require("fs"); 
    const path = require("path");
    let userJson = fs.readFileSync(path.resolve(__dirname, "../../users.json"), 'utf8');
    let users = JSON.parse(userJson);
    let usernames : Array<string> = [];
    users.map(function (user:any) {usernames.push(user.userName)} )
    

    it("testing getters", () => {
        expect(student.getUserName()).to.equal("John");
        expect(teacher.getUserName()).to.equal("TestTeacher");
        expect(student.getPassword()).to.equal("12345");
        expect(teacher.getPassword()).to.equal("54321");
    })

    it("testing addUserToJSON", () => {
        expect(usernames.indexOf("John")).to.not.equal(-1);
        expect(usernames.indexOf("TestTeacher")).to.not.equal(-1);
    })

    it("testing isUser", () => {
        expect(student.isUser("John","12345")).to.equal(true);
        expect(student.isUser("John","234")).to.equal(false);
        expect(student.isUser("Hello","12345")).to.equal(false);
        expect(teacher.isUser("TestTeacher","54321")).to.equal(true);
        expect(teacher.isUser("TestTeacher","55555")).to.equal(false);
    }) 

    it("testing removeUserFromJSON", () => {
        removeUser.removeUserFromJSON();
        expect(usernames.indexOf("removeUser")).to.equal(-1)
        
    })


})