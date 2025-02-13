import {Pool} from "pg";
import {configDotenv} from "dotenv";

configDotenv();

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client:", err);
  process.exit(-1);
});

export default () => ({
  postgres: {
    reviewTable: "reviews",
    
    paymentTable: "payments",
    
    bookingTable: "bookings",
    
    patientTable: "patients",
    
    helperVerificationTable: "helper_verifications",
    
    helperTable: "helpers",
    
    adminTable: "admins",
    
    sampleModuleTable: "sampleModule",
    pool: pool,
  },
});
