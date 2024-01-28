export default class UserCredentials {
    constructor(options = {}) {
        //TODO: SET null AS A DEFAULT VALUE FOR THE PROPS
        this.email = options.email || 'fazz@mail.ru';
        this.password = options.password || '123';
    }
}