export class Credential {
    readonly username: string;
    readonly password: string;
    readonly host: string;
    readonly port: string;
    readonly name: string;
    readonly protocol: string;

    constructor(urlString: string) {
        const url = new URL(urlString);

        const defaultProtocol = url.protocol.substring(0, url.protocol.length - 1);
        let protocol = defaultProtocol;
        switch (defaultProtocol) {
            case 'postgresql':
                protocol = 'postgres';
                break;
            case 'mysql':
                protocol = 'mysql';
                break;
        }

        this.protocol = protocol;
        this.username = url.username;
        this.password = url.password;
        this.host = url.hostname;
        this.port = url.port;
        this.name = url.pathname.substring(1); // Remove the leading slash
    }

    toTypeOrmConfig(synchronize?: boolean, entities?: any[]) {
        return {
            type: this.protocol as any, // Let TypeORM infer the correct type
            host: this.host,
            port: this.port ? parseInt(this.port, 10) : undefined,
            username: this.username,
            password: this.password,
            database: this.name,
            entities,
            synchronize: synchronize ?? false,
        };
    }

    toSequelizeConfig(models?: any[]) {
        return {
            dialect: this.protocol as any, // Let Sequelize infer the correct type
            host: this.host,
            port: this.port ? parseInt(this.port, 10) : undefined,
            username: this.username,
            password: this.password,
            database: this.name,
            models,
        };
    }
}