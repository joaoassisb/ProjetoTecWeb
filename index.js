"use strict";

/* eslint no-console:0 */

const server = require("./src/server");

const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
  console.info(`Server listening at port ${PORT}`);
}); 

