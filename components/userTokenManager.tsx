
let token: string|null = "Angelica";
let getToken = () => token;
let setToken = (t:string) => {token = t}
let resetToken = () => {
    token = null; 
    username = ""
}
let username:string = "";
let getUsername = () => username;
let setUsername = (t:string) => {username = t}

let password:string = "";
let getPassword = () => password;
let setPassword = (t:string) => {password = t}

export {getToken, setToken, resetToken, getUsername, setUsername, username, getPassword, setPassword};