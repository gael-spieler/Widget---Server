import {describe} from "mocha";

process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = require('chai').should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const server = require('../index')
const db_provider = require('../models/provider')

// Provider's bookings

describe('provider bookings', function() {

    it("should create a reserved time slot for provider", function(done) {

    })

    it("should provide the list of bookings a provider has", function(done) {

    })

    it("should update a booking to approved", function(done) {

    })

    it("should update a booking to cancelled", function(done) {

    })

    it("should update a booking to archived", function(done) {

    })

    it("should get all bookings of specific customer from booking list", function(done) {

    })

})