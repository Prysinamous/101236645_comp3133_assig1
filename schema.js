const { gql } = require('apollo-server-express');

exports.typeDefs = gql `

    type User {
        id: ID!
        username: String!
        firstname: String!
        lastname: String!
        password: String!
        email: String!
        type: String!
    }

    type Listing {
        id: ID!
        listing_id: String!
        listing_title: String!
        description: String!
        street: String!
        city: String!
        postal_code: String!
        price: Float!
        email: String!
        username: String!
    }

    type Booking {
        id: ID!
        listing_id: String!
        booking_id: String!
        booking_date: Date!
        booking_start: Date!
        booking_end: Date!
        username: String!
    }

    type Authentication {
        secret: String
    }

    scalar Date


    type Query {
        searchListingByName(listing_id: String!) : [Listing]
        searchListingByCity(city: String!) : [Listing]
        searchListingByPostalCode(postal_code: String!) : [Listing]

        searchUserbyName(username: String!) : [User]

        searchbyBooking(booking_id: String!) : [Booking]
        listUsrBookings(username: String, secret: String!) : [Booking]

        login(username: String!, password: String!) : Authentication
        listadminListings(secret: String!) : [Listing]
        
    }

    type Mutation {
        createUser(
            username: String!
            firstname: String!
            lastname: String!
            password: String!
            email: String!
            type: String!
        ) : User

        createListing(
            listing_id: String!
            listing_title: String!
            description: String!
            street: String!
            city: String!
            postal_code: String!
            price: Float!
            email: String!
            username: String!
            secret: String!
        ) : Listing

        createBooking(
            listing_id: String!
            booking_id: String!
            booking_start: Date!
            booking_end: Date!
            username: String!
            secret: String!
        ) : Booking

    }
`