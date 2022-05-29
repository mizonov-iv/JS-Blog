export class Validators {
    static required(value = '') {
        return value && value.trim();
    }
    
    static minLength(length) {
        return value => {
            return value && value.length >= length
        }

    }
}