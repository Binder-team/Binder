
let token: string|null = null;
let getToken = () => token;
let setToken = (t:string) => {token = t}

let username:string = "";
let getUsername = () => username;
let setUsername = (t:string) => {username = t}

let password:string = "";
let getPassword = () => password;
let setPassword = (t:string) => {password = t}

export {getToken, setToken, getUsername, setUsername, getPassword, setPassword};