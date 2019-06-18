
switch(process.env.NODE.ENV){
    case "dev":
        let dev = DBConfig.dev;
        DBConfig.dev.URI = `mongodb://${dev.mongo.user}:${dev.mongo.password}@${dev.mongo.host}:${dev.mongo.port}/${local.mongo.database}`;
        settings = DBConfig.dev;
        break;
        case "test":
                let test = DBConfig.test;
                DBConfig.dev.URI = `mongodb://${dev.mongo.user}:${dev.mongo.password}@${dev.mongo.host}:${dev.mongo.port}/${local.mongo.database}`;
                settings = DBConfig.test;
                break;
                case "live  ":
                        let live = DBConfig.live;
                        DBConfig.dev.URI = `mongodb://${dev.mongo.user}:${dev.mongo.password}@${dev.mongo.host}:${dev.mongo.port}/${local.mongo.database}`;
                        settings = DBConfig.live;
                        break;
                    default:
                                let local = DBConfig.local;
                                DBConfig.dev.URI = `mongodb://${dev.mongo.user}:${dev.mongo.password}@${dev.mongo.host}:${dev.mongo.port}/${local.mongo.database}`;
                                settings = DBConfig.local;
                                break;
}

module.exports = settings;