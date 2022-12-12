
let token: string|null = "Angelica";
let getToken = () => token;
let setToken = (t:string) => {token = t}
let resetToken = () => {
    token = null; 
    username = ""
}

let username:string = "";
let getUsername = () => username;
let setUsername = (u:string) => {username = u};

let password:string = "";
let getPassword = () => password;
let setPassword = (p:string) => {password = p};

let email:string = "";
let getEmail = () => email;
let setEmail = (e:string) => {email = e};

let city:string = "";
let getCity = () => city;
let setCity = (c:string) => {city = c};

let postalCode:string = "";
let getPostalCode = () => postalCode;
let setPostalCode = (c:string) => {city = c};

export {
    getToken, 
    setToken, 
    resetToken, 
    getUsername, 
    setUsername, 
    username, 
    getPassword, 
    setPassword,
    getEmail,
    setEmail,
    getCity,
    setCity,
    setPostalCode,
    getPostalCode
};