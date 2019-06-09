const url = require('url');

"use strict"

module.exports = function(req, res) {

    const base = getFullUrl(req);

    const body = {
        image: { href: `${base}images/twitter.png`},
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
                        href : `${base}cards/request`
                    }
                }
            }
        };
    

    res.json(body);
}

function getFullUrl(req) {
    return url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.originalUrl
      });
}