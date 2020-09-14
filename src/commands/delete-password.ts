import { GluegunCommand, GluegunToolbox } from 'gluegun';
import Login from '../interfaces/ILogin';

const CommandsConfig: GluegunCommand = {
    name: 'delete',
    alias: 'del',
    run: async (toolbox: GluegunToolbox) => {
        const {
          parameters: {
            first: domain,
            second: username,
        },
          filesystem,
          readStorage
        } = toolbox;
        const { success } = toolbox.print;

     const passwords: Array<Login> = await readStorage();
      const filteredPasswords = passwords.filter(login => (!(login.username == username && domain == login.domain)))
      filesystem.write("pwd.json", filteredPasswords);

      return success('Login deleted');
    }
}

module.exports = CommandsConfig;