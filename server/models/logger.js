const log4js = require("log4js");
log4js.configure({
  appenders: {
    logFile: {   // 文件形式打印日志
      type: "dateFile",
      filename: 'logs/MyComponents',// 写入日志文件的路径
      alwaysIncludePattern: true,// （默认为false） - 将模式包含在当前日志文件的名称以及备份中
      // compress: true,// （默认为false） - 在滚动期间压缩备份文件（备份文件将具有.gz扩展名）
      pattern: "-yyyy-MM-dd.log",// （可选，默认为.yyyy-MM-dd） - 用于确定何时滚动日志的模式。格式:.yyyy-MM-dd-hh:mm:ss.log
      encoding: 'utf-8',// default "utf-8"，文件的编码
      maxLogSize: 1024 * 1024, // 文件最大存储空间，当文件内容超过文件存储空间会自动生成一个文件xxx.log.1的序列自增长的文件
      backups: 3,
    },
    logConsole: {   // 控制台打印日志
      type: 'console',
      pattern: "-yyyy-MM-dd.log",// （可选，默认为.yyyy-MM-dd） - 用于确定何时滚动日志的模式。格式:.yyyy-MM-dd-hh:mm:ss.log
    }
  },
  categories: {
    default: {   // 默认使用打印日志的方式
      appenders: ['logFile'],  // 指定为上面定义的appender，如果不指定，无法写入
      level: 'all' // 打印日志的级别
    },
    logFile: {
      appenders: ['logFile'],
      level: 'all'
    },
    logConsole: {
      appenders: ['logConsole', 'logFile'],
      level: log4js.levels.ALL
    }
  }
});
let logger = log4js.getLogger("logConsole");
// logger.trace("Entering cheese testing");
// logger.debug("Got cheese.");
// logger.info("Cheese is Comté.");
// logger.warn("Cheese is quite smelly.");
// logger.error("Cheese is too ripe!");
// logger.fatal("Cheese was breeding ground for listeria.");

module.exports = logger
