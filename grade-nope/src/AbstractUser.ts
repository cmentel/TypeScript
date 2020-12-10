import IUser from './IUser'
/**
 * Class to represent a generic user on the site
 * userID: ID number associated with this user
 * userName: Username this user will use to login
 * password: Password this user will use to login
 */
export default abstract class AbstractUser implements IUser {
    private userID: number
    private userName: string
    private password: string
    constructor(id: number, username: string, password: string) {
        this.userID = id
        this.userName = username
        this.password = password
    }

    
    // getter for username
    public getUserName() : string {
        
        return this.userName;
        
    }

    // getter for password
    public getPassword() : string {
        return this.password;
    }


    // confirms the given username and password exists in the saved Json File
    public isUser(userName :string, password:string) : boolean{
        const users = require("../users.json"); 
        let jsonUsers = JSON.parse(JSON.stringify(users))
        let checked = false
        for (let u of jsonUsers) {
            if ((u.userName == userName) && (u.password == password)){
                checked = true
            }
        }
        return checked;
    }

    // adding the current user to the json file
    public addUserToJSON() : void {

        let userN = this.userName
        let userPass = this.password
        let user = { 
            "userName": userN, 
            "password": userPass
        }; 
        // only adds the user if it does not exist
        if (!this.isUser(userN,userPass)){
            const fs = require("fs"); 
            const users = require("../users.json"); 
            users.push(user); 
            fs.writeFileSync("./users.json", JSON.stringify(users,null, "\t"), (err: any) => { 
                if (err) {
                    throw err
                };  
            }); 
        }
        
    }

    // removing the current user from the json file
    public removeUserFromJSON() : void {
        let userN = this.userName
        let userPass = this.password

        const fs = require("fs"); 
        const users = JSON.parse(JSON.stringify(require("../users.json"))); 
        
        for (let u of users) {
            if ((u.userName == userN) && (u.password == userPass)){
                let removeI = users.indexOf(u)
                users.splice(removeI,1)
            }
        }

        // empty the file before writing the new json array with deleted data
        fs.writeFileSync("./users.json", '', (err: any) => { 
            if (err) {
                throw err
            }  
        }); 

        fs.writeFileSync("./users.json", JSON.stringify(users,null, "\t"),(err:any) => {
            if (err) {throw err}
        });




    }
    


}
