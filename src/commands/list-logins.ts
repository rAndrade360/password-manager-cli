import { GluegunToolbox, GluegunCommand } from 'gluegun';
import Login from '../interfaces/ILogin';

const CommandConfig: GluegunCommand = {
    name: "list:passwords",
    alias: "lp",
    description:"List logins with domain and username filters",
    run: async (toolbox: GluegunToolbox) => {
        const { parameters: {first: domain, options }, filesystem } = toolbox;
        const passwords: Array<Login> = filesystem.read("pwd.json", "json") || [];
        const {info, success, warning, table} = toolbox.print; 

        const filteredPasswords = options.all ? passwords : passwords.filter(password => (password.domain == domain.toLocaleLowerCase() || password.username == options.username));
        info(`\nfounded ${filteredPasswords.length} results\n`);
        
        if(filteredPasswords.length > 0) {
          success(`Uhuu! We foud it\n`);
          let tableToPrint = [['DOMAIN', 'USERNAME', 'PASSWORD', 'DISCRIPTION']];
          filteredPasswords.forEach(password => {
              const line  = [password.domain, password.username, password.password, password.discription];
              tableToPrint.push(line);
          });
          table(tableToPrint);
          
        }else {
          warning(`Oh no! :(`);
        }
        
    }
}

module.exports = CommandConfig;