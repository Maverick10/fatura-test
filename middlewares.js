require('dotenv').config();
const env = process.env;
const recordsPerReq = parseInt(env.RECORDS_PER_REQUEST, 10) || 25;
module.exports = {
    pagination: async (page) => {
        if (page)
            return {
                limit: recordsPerReq,
                offset: (Math.max(page, 1) - 1) * recordsPerReq
            }
        else return {};
    }
}