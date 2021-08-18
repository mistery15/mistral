const validateFormData = <T>(formData: Record<string, any>, formValidators: Record<string, ((...args: any[]) => boolean)[]>) => {
    const errors = formData;
    
    for (const [key, value] of Object.entries(formData)) {
        errors[key] = false;
        formValidators[key]?.forEach((validator) => {
            if(!validator(value)){
                errors[key] = true;
            }
        });
    }
    return errors as T;
}

const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const validatePassword = (password: string) => {
    return password.length >= 6;
}
const validateIfEmpty = (string: string) => {
    return string.trim().length ? true : false;
}
export { validateEmail, validatePassword, validateIfEmpty, validateFormData };