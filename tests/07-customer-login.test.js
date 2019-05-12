import {describe} from "mocha";

process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = require('chai').should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const server = require('../index')
const db_user = require('../models/user')




describe('widget login', function() {
    
    it('should not authenticate with wrong email', function(done) {

    })
    it('should not authenticate with wrong password', function(done) {

    })
})