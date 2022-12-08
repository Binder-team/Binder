
let token: string|null = null;
let getToken = () => token;
let setToken = (t:string) => {token = t}

export {getToken, setToken};