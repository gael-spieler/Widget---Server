import {describe} from "mocha";

process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = require('chai').should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const server = require('../index')
const db_provider = require('../models/provider')


// Sign up provider

describe('provider signup', function() {

    it('should create a new provider', function(done) {

    })

    it('should not create a provider with the same email', function(done) {

    })

})
