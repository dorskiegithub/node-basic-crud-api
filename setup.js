const dotenv = require('dotenv');
const fs = require('fs');

const origin_file_name = '.env.example';
const dist_file_name = '.env';

let parse_data = dotenv.parse(fs.readFileSync(origin_file_name));

let new_env_format = '';

for (const key in parse_data) {
    if (new_env_format != '') new_env_format += "\n";
    new_env_format +=  key + '=' + parse_data[key];
}

fs.writeFileSync(dist_file_name, new_env_format)