import { INewUser, IToken, IUserInfo, IUserdata } from "@/app/Interfaces/Interfaces"

//Connecting Backend / Fetches
const url = "https://apicourtmonitor.azurewebsites.net"

let userData: IUserdata

export const createAccount = async (createdUser: INewUser) => {
    const res = await fetch(url + '/User/AddUser',  {
        method: "POST",
        headers: {
            'Content-Type' : "application/json"
        },
        body:JSON.stringify(createdUser)
    })

    if(!res.ok){
        const message = "An error has occured" + res.status;
        throw new Error(message);
    }
    else{
        alert("Your Account has been sucessfully created!")
    }

    const data = await res.json();
    console.log(data);
}

export const login = async (LoginUser: IUserInfo) => {
    const res = await fetch( url + "/User/Login", {
        method: "POST",
        headers: {
            'Content-Type' : "application/json"
        },
        body: JSON.stringify(LoginUser)
    });

    if(!res.ok){
        const message = "An Error has occured" + res.status;
        throw new Error(message);
    }

    const data: IToken = await res.json();
    return data;
}

export const getLoggedInUserData = async (username: string) => {
    const res = await fetch(url + '/User/GetUserByUsername/' + username);
    const data = await res.json();
    userData = data;
    console.log(userData)
}

export const loggedinData = () => {
    return userData;
}

export const checkToken = () => {
    let result = false;

    let lsData = localStorage.getItem("Token");

    if(lsData !=null){
        result = true
    }
    return result
}

export const updateUserProfile = async (username:string, inputString:string) => {
    console.log(url + '/User/UpdateUser/' + username + "/birthday/image/programs/funfact/email/sports/realname?" + inputString);
    const res = await fetch(url + '/User/UpdateUser/' + username + "/birthday/image/programs/funfact/email/sports/realname?" + inputString, {
        method: "PUT"
    })

    if(!res.ok){
        const message = "An error has occured" + res.status;
        throw new Error(message);
    }
    const data = await res.json();
    return data
}

//Helper Functions
export const findDifferences = (obj1: IUserdata, obj2: IUserdata): Partial<IUserdata> => {
    const differences: Partial<IUserdata> = {};

    for (const key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            if (obj1[key as keyof IUserdata] !== obj2[key as keyof IUserdata]) {
                differences[key as keyof IUserdata] = {
                    oldValue: obj1[key as keyof IUserdata] ,
                    newValue: obj2[key as keyof IUserdata]
                } as any;
            }
        }
    }
    console.log(differences)
    return differences;
}

export const formatDate = (dateString:string) => {

    if(dateString.includes("-")){
        // Parse the date string to get year, month, and day
    const [year, month, day] = dateString.split('-');
    
    // Convert month number to month name
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = monthNames[parseInt(month, 10) - 1];
    
    // Create the formatted date string
    const formattedDate = `${monthName} ${parseInt(day, 10)}, ${year}`;
    
    return formattedDate;
    }
    else{
        return dateString
    }
    
}
