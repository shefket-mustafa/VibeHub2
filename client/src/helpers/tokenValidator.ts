

 function parseJwt(token: string){

    try {
        const basePayload = token.split(".")[1];
        const payload = atob(basePayload);
        return JSON.parse(payload);

    }catch(err){
        return null
    };
}

export function isTokenValid(token: string) {
    const decoded = parseJwt(token);
    if(!decoded || !decoded.exp) return false;
    return decoded.exp * 1000 > Date.now()
}

