"use strict"

/**
 * Get base url
 */
const getBaseURL = (req) => {
    const headers = req.headers;
    const stage = req.baseUrl;
    const protocol = headers['x-forwarded-proto'] || 'http';
    const host = headers['host'] || 'localhost';
    const port = headers['x-forwarded-port'] || '';
    return (host === 'localhost') ? `${protocol}://${host}:${port}` : `${protocol}://${host}${stage}`;
};

/**
 * Construct discovery response
 */
const discovery = (req, res) => {
    const baseURL = getBaseURL(req);

    return {
        href: `${baseURL}/images/twitter.png`,
        object_types: {
            card: {
                doc: {
                    href: "https://github.com/vmware-samples/card-connectors-guide/wiki/Card-Responses",
                },
                fields: {
                    keyword: {
                        capture_group: 1, 
                        regex: "([#])\w+"
                    }
                },
                endpoint: {
                    "href": `${baseURL}/cards/request`
                }
            }
        }
    };
};

// Export
module.exports = discovery;

