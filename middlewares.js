require('dotenv').config();
const env = process.env;
const recordsPerReq = parseInt(env.RECORDS_PER_REQUEST, 10) || 25;
module.exports = {
    pagination: async (page) => {
        let ret = {
            limit: recordsPerReq
        };
        if (page)   // because limit will be returned anyway
            ret.offset = (Math.max(page, 1) - 1) * recordsPerReq;

        return ret;
    }
}