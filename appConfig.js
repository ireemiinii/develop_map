var developmentDatabase = {
    postgres: {
    host: 'localhost',
    port: 5432,
    database: 'dspsjol4t6pna',
    user: 'snamuepirivcqb',
    password: 'a27b85780c0ea8e6249b1dd480b444df4a2973b93712a27bd7fdb5cb9b4611b1'
    }
    }
    
    var connectionString = "postgres://snamuepirivcqb:a27b85780c0ea8e6249b1dd480b444df4a2973b93712a27bd7fdb5cb9b4611b1@ec2-54-155-87-214.eu-west-1.compute.amazonaws.com:5432/dspsjol4t6pna";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = true;
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }