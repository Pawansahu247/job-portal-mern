import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns"; // DNS import kiya

// DNS Servers manually set kar rahe hain (Google & Cloudflare)
// Isse ISP ki 'querySrv ECONNREFUSED' wali problem solve ho jati hai
dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config({ path: "./config/config.env" });

const dbConnection = () => {
    const dbUri = process.env.DB_URL;

    if (!dbUri) {
        console.log("❌ Error: DB_URL is missing in config.env!");
        return;
    }

    mongoose.connect(dbUri, {
        dbName: "Job_Portal",
    })
    .then(() => {
        console.log("✅ MongoDB Connected Successfully via Custom DNS!");
    })
    .catch((error) => {
        console.log("--- Database Connection Error ---");
        console.log(`Message: ${error.message}`);
        
        console.log("\n💡 STILL NOT WORKING?");
        console.log("1. Check Atlas Network Access (Allow Access From Anywhere).");
        console.log("2. Use Mobile Hotspot instead of College/Broadband WiFi.");
    });
};

export default dbConnection;