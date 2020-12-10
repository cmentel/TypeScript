// Interface to represent any type of user
export default interface IUser {

    getUserName() : string;
    getPassword() : string;
    isUser(userName :string, password:string) : boolean;
    addUserToJSON() : void;
    removeUserFromJSON() : void; 
    

}