const DB_NAME = process.env.DB_NAME || "crawl-a-lot";
const DB_URL = process.env.MONGODB_URI || `mongodb://localhost/${DB_NAME}`;
const MONGOOSE_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = { DB_NAME, DB_URL, MONGOOSE_OPTIONS };
