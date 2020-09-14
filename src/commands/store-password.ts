import { GluegunToolbox, GluegunCommand } from 'gluegun';
import Login from '../interfaces/ILogin';

const CommandConfig: GluegunCommand = {
    name: "store",
    alias: "sp",
    description:"Create a new login with informed domain, login and password",
    run: async (toolbox: GluegunToolbox) => {
        const { parameters: { first: username, second: password, options }, filesystem, readStorage } = toolbox;
        const { success, error } = toolbox.print;

        const passwords: Array<Login> = await readStorage();
        const loginExists = passwords.filter(login => (login.username == username && String(options.d).toLocaleLowerCase() == login.domain))
        if (loginExists.length>0) return error("Can not store. The login already exists");
        const newPass:Login = {
            id: Date.now(),
            username,
            password,
            discription: options.m,
            domain: String(options.d).toLocaleLowerCase()
        }
        passwords.push(newPass);
        filesystem.write("pwd.json", passwords);
        
        success(`Stored login for ${username}`);
    }
}

module.exports = CommandConfig;