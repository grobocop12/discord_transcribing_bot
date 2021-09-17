import { client } from './discord_client'

const { token }  = require('../config/config.json')

client.login(token);