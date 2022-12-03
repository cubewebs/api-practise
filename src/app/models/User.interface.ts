export interface Resp {
    page:        number;
    per_page:    number;
    total:       number;
    total_pages: number;
    data:        User[];
    support:     Support;
}

export interface User {
    id:         number;
    email:      string;
    first_name: string;
    last_name:  string;
    corrier: string;
    birthDate: Date;
    address: string;
    city: string;
    country: string;
    zip: number;
    avatar?:     string;
}

export interface Support {
    url:  string;
    text: string;
}
