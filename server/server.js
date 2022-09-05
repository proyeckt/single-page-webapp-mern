const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const { createRoles } = require('./libs/initialSetup');

app.use(cors());

require('./config/config.mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/note.routes')(app);

app.listen(port, () => console.log(`We are listening in the port: ${port}, how cool is that!!!`))

//Initial actions
createRoles();