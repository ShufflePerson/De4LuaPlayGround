const axios = require("axios");


function get_commits() {
    return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get(
                    "https://api.github.com/repos/ShufflePerson/De4Lua/commits",
                    {
                        headers: {
                            "User-Agent": "request",
                        },
                    }
                );
                resolve(response.data.map((commit) => {
                    return {
                        name: commit.commit.author.name,
                        message: commit.commit.message,
                        date: commit.commit.author.date,
                    };
                }));
            } catch (error) {
                console.error(error);
            }
    });
}

module.exports = get_commits;
