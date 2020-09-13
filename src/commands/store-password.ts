import { GluegunToolbox, GluegunCommand } from 'gluegun';


interface Login{
    id: number,
    username: string,
    password: string,
    discription?: string,
    domain?: string,
}

const CommandConfig: GluegunCommand = {
    name: "store:password",
    alias: "sp",
    description:"Create a new login with informed domain, login and password",
    run: async (toolbox: GluegunToolbox) => {
        const { parameters: { first: username, second: password, options }, filesystem } = toolbox;
        const { success } = toolbox.print;

        const passwords: Array<Login> = filesystem.read("pwd.json", "json") || [];
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