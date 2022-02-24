const Booking = require('./models/Booking');
const Listing = require('./models/Listing');
const User = require('./models/User');

exports.resolvers = {
    Query: {
        login: async (parent, args) => 
        {
            let user = await User.findOne({$and: [{username: args.username}, {password: args.password}]})

            if(!user)
            {
                return{error: 'Something is wrong here!'}
            }

            if(user.type == 'user')
            {
                return {secret: process.env.user_secured}
            }
            else
            {
                return{secret: process.env.admin_secured}
            }

        },


        listUsrBookings: async(parent, args) =>
        {
            let bookings = []
            if (args.username) {
                if (args.secret == process.env.SECRET_USER) {
                    bookings = await Booking.find({username: args.username})
                } else {
                    throw new Error("Must be logged in as user to see this")
                }
            } else {
                if (args.secret == process.env.SECRET_ADMIN) {
                    bookings = await Booking.find({})
                } else {
                    throw new Error("Must be logged in as Admin User to see this")
                }
            }
            return bookings
        },

        searchListingByName: async (parent, args) => {
            return await Listing.find(args)
        },

        searchListingByPostalCode: async (parent, args) => {
            return await Listing.find(args)
        },

        searchListingByCity: async (parent, args) => {
            return await Listing.find(args)
        },

        searchUserbyName: async (parent, args) => {
            return await User.find(args)
        },

        searchbyBooking: async (parent, args) => {
            return await Booking.find(args)
        },

        listadminListings: async(parent, args) =>
        {
            if (args.secret == process.env.admin_secured)
                {
                    return await Listing.find({})
                }
            else
            {
                throw new Error("You gotta be an admin!")
            }

        },
      

    },

    Mutation: {

        createListing: async (parent, args) =>
        {
            if(args.secret == process.env.admin_secured)
            {
                let listing = new Listing(args)
            return listing.save()
            }
            
        },

        createBooking: async (parent, args) =>
        {
            if(args.secret == process.env.admin_secured)
            {
                let booking = new Booking(args)
                return booking.save()
            }            
        },

        createUser: async (parent, args) =>
        {
            let user = new User(args)
            return user.save()
        },

       

    }
}