import {describe} from "mocha";
process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = require('chai').should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const server = require('../index')
const db_user = require('../models/user')




describe('widget booking', function() {
    it('should book service', function(done) {

    })
    it('should not book service without balance on credit card', function(done) {

    })
    it('should not book service with invalid credit card', function(done) {

    })
    it('should not book service with empty field', function(done) {

    })
    it('should create a booking with same account')
})