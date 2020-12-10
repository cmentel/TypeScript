/**
 * REACT class to represent our login page for all users
 * userName: the username entered in the field
 * password: the password entered by the user
 */
export default class Login {
    userName: string
    password: string
    constructor(username: string, password: string) {
        this.userName = username
        this.password = password
    }
    // Attempt to login this user and access the homepage
    login(): void {

    }
}