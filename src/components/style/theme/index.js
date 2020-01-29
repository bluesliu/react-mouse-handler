import * as Dark from "./dark";

let currentTheme = Dark;

let changeTheme = (theme)=>{
    switch (theme) {
        case 'dark':
            curTheme = Dark;
            break;
    }
};

export {
    changeTheme, currentTheme
}