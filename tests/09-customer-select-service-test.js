import {describe} from "mocha";
process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = require('chai').should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const server = require('../index')
const db_user = require('../models/user')




describe('widget select service', function() {

    it('should see all the provider services', function(done) {
        
    })
    it('should select a service', function(done) {
        
    })
    it('should select a day', function(done) {

    })
    it('should select a time', function(done) {

    })
})