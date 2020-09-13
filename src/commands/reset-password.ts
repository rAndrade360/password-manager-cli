import { GluegunToolbox, GluegunCommand } from 'gluegun';
import Login from '../interfaces/ILogin';

const CommandConfig: GluegunCommand = {
    name: "reset",
    alias: "rs",
    description:"Update a login with informed domain, login and password",
    run: async (toolbox: GluegunToolbox) => {
        const { parameters: { first: domain, second: username, options }, filesystem } = toolbox;
        const { success } = toolbox.print;

        const passwords: Array<Login> = filesystem.read("pwd.json", "json") || [];
        const filteredPasswords = passwords.map(login => {
            if(login.username == username && domain == login.domain) {
                return {
                    ...login,
                    password: options.newPassword        
                }
            } 
            return login;
        })
        filesystem.write("pwd.json", filteredPasswords);
        
        success(`Updated login for ${username} in ${domain}`);
    }
}

module.exports = CommandConfig;