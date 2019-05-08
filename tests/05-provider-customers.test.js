import {describe} from "mocha";

process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = require('chai').should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const server = require('../index')
const db_provider = require('../models/provider')


// Sign up provider

describe("provider's customers", function() {

    it('should get list customers of provider', function(done) {

    })

    it('should get all bookings of specific user', function(done) {

    })


})
