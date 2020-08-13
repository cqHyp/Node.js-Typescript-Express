import * as body from "body-parser";
import * as express from "express";
import * as logger from "morgan";
import * as cors from "cors";
import routes from "./routes/index";
import errorMiddleware from "./middleware/error.middleware";
import successMiddleware from "./middleware/success.middleware";
import Product from "./models/productEntity";
import Category from "./models/categoryEntity";
import sequelize from "./sql/dbConfig"
import Shop from "./models/shopEntity";
import Admin from "./models/adminEntity";
import HttpException from "../dist/exceptions/HttpException";
import { redisClient } from "./utils/redis";

/**
 * The Server 
 * 
 * @class Server
 */
export class Server {
    public app: express.Application;

    /**
     * Bootstrap the application
     * 
     * @class Server
     * @method bootstrap
     * @static
     * @return Returns the newly created injector for this app. Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor
     * 
     * @class Server
     * @method constructor
     */
    constructor() {
        // create express application
        this.app = express();

        // configure application
        this.config();

        this.initIntercept();

        // add routes
        this.routes();

        // add api
        this.api();

        this.initSqlConfig();

        this.initializeErrorHandling();

        this.initializeSuccessHandling();
    }

    /**
     * Create REST Api routes
     * 
     * @class Server
     * @method api
     */
    public api() {

    }

    public initIntercept() {
        // api拦截器
        this.app.all("/*", function (req, res, next) {
            let key = req.ip + "_" + req.url;
            redisClient.get(key, (err, val) => {
                if (err) {
                    console.log(err);
                } else {
                    if (!val) {
                        redisClient.set(key, JSON.stringify({body: req.body, query: req.query}));
                        redisClient.expire(key, 1);
                        next();
                    } else {
                        next(new HttpException(500, -1, "请求太频繁，请稍后再试"));
                    }
                }
            })
        });
    }

    /**
     * Configure application
     * 
     * @class Server
     * @method config
     */
    public config() {
        //开启 cors
        this.app.use(cors())
        //支持  application/json类型 发送数据
        this.app.use(body.json());
        //支持 application/x-www-form-urlencoded 发送数据
        this.app.use(body.urlencoded({ extended: false }));
        //日志中间件
        this.app.use(logger('dev'));
    }

    /**
     * Create router
     * 
     * @class Server
     * @method router
     */
    public routes() {
        this.app.use(routes);
    }

    /**
     * 表关联
     */
    public initSqlConfig() {
        sequelize.sync({ force: false });

        Category.hasMany(Product, { as: "Category", foreignKey: "category", sourceKey: "id" });
        Product.belongsTo(Category, { as: "Category", foreignKey: "category", targetKey: "id" });
        Shop.hasMany(Admin, { as: "shop", foreignKey: "shopId", sourceKey: "id" });
        Admin.belongsTo(Shop, { as: "shop", foreignKey: "shopId", targetKey: "id" });
    }

    public initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    public initializeSuccessHandling() {
        this.app.use(successMiddleware);
    }
}