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
        sequelize.sync({force: false});
        Category.hasMany(Product, { as: "Category", foreignKey: "category", sourceKey: "id" });
        Product.belongsTo(Category, { as: "Category", foreignKey: "category", targetKey: "id" });
    }

    public initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    public initializeSuccessHandling() {
        this.app.use(successMiddleware);
    }
}