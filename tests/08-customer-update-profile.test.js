import {describe} from "mocha";
process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = require('chai').should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const server = require('../index')
const db_user = require('../models/user')




describe('widget update profile', function() {
    it('should update card info', function(done) {

    })
    it('should update email', function(done) {

    })
    it('should update password', function(done) {

    })

    it('should update name', function(done) {

    })
})