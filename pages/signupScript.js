//signUp validation check
const valid = () => {
    let name = document.forms['signup']['userName'].value;
    let email = document.forms['signup']['userEmail'].value;
    email = email.toLowerCase();
    let password = document.forms['signup']['userPassword'].value;
    
    if (!email.includes('@')) {
        alert('Invalid email. @ is needed, Please try again');
        return false;
    }
    else if (/\d/.test(name)) {
        alert('Name must contain characters only. Please try again');
        return false;
    } 
    else if (password.search(/[A-Z]/) < 0) {
        alert('Password must contain at least one uppercase letter. Please try again');
        return false;
    }
    else if (password.search(/[0-9]/) < 0) {
        alert('Password must contain at least one number. Please try again');
        return false;
    }
    
    return true;
}