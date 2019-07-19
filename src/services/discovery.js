const url = require('url');
const constant = require('../utils/constant');


"use strict"

module.exports = function(req, res) {

    const base = getFullUrl(req);
    constant.baseUrlRef = req.baseUrl || "";
 
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
                        href : `${base}${constant.endPointHref}`
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
      })
}