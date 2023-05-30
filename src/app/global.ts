import { environment } from "src/environments/environment";

const API_BASE_URL: string = environment.API_BASE_URL

export const APIS: any = {
    USER_LIST: `${API_BASE_URL}/users`,
    CREATE_USER: `${API_BASE_URL}/users`,
    DELETE_USER: `${API_BASE_URL}/users`,
    UPDATE_USER: `${API_BASE_URL}/users`
}

export const REGX_EMAIL = /^[a-zA-Z0-9._]{1,}(?:!^\*-?|}{`~<>+()\[\]\\,;:\s@"-#$%&=][A-Za-z0-9]+([^<>()\[\]\\,;:\s@"]+))*@((\[])|(([a-zA-Z\-]+\.)+[a-zA-Z]{2,3}))$/;
