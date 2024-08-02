import winston from 'winston'
import time from 'moment-timezone'
import path from 'path'

//Set the path to src/Logs
const target_path = path.resolve(__dirname,"..")
const file_Dir =  path.resolve(target_path,"Logs")

//TimeZone and Timestamp for logs
const customFormat = winston.format.printf(({level, message, timestamp}) => {
    return `${timestamp} [${level}] : ${message}`
})

const timeZone = "Asia/Kolkata"; // For India
const logger = winston.createLogger({
format: winston.format.combine(
winston.format.timestamp({ format: () => time().tz (timeZone).format() }),
customFormat
),
transports: [
    new winston.transports.Console({ level: "debug" }),
    new winston.transports. File({
    filename: path.join(file_Dir, "test_run.log"),
    maxFiles: 5, // Max File size
    maxsize: 10 * 1024, // 10 KB (in bytes)
    level: "info",
    }),
new winston.transports.File({
filename: path.join(file_Dir, "test_error.log"),
maxFiles: 5, // Number of log files to retain
maxsize : 10 * 1024,
level : "error"
}),
],
});

export {logger}