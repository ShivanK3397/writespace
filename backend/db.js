import mysql from "mysql"
import { configDotenv } from "dotenv"

export const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:"blog"
})