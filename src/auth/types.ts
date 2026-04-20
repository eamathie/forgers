export type User = {
  id: string;
  username:string;
  email: string;
  name: string;
};

export type UserContextType = {
  user: User | null;
  updateUser: (user: User | null) => void;
};

export type AuthRequest = {
    username: string;
    password: string;
}

export type LoginResponse = {
    token: string;
}


/* 
interface IAddress {
    geoLocation: IGeoLocation;
    city: string;
    street: string;
    number: number;
    zipcode: string;
}

interface IGeoLocation {
    lat: number;
    long: number;
}

interface IName {
    firstName: string;
    lastName: string;
}


{ 
    "address": { 
        "geolocation": { 
            "lat": "-37.3159", 
            "long": "81.1496" 
        }, 
        "city": "kilcoole", 
        "street": "new road", 
        "number": 7682, 
        "zipcode": "12926-3874" 
    }, 
    "id": 1, 
    "email": "john@gmail.com", 
    "username": "johnd", 
    "password": "m38rmF$", 
    "name": { 
        "firstname": "john", 
        "lastname": "doe" 
    }, 
    "phone": "1-570-236-7033", 
    "__v": 0 
} */