/**
 * @author Jake Hewitt
 * Last Edited: 05/29/2015
 * Description: Creates initial seed data for the database for the user model
 */

var User = require("../models/user.model").User;
var encrypt = require('../utilities/encryption');
function createDefaultUsers() {

    User.find().exec(function (err, collection) {
        if (collection.length == 0) {

            // TODO: Make these better
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'triph33t');
            User.create({
                name: 'Jake Hewitt',
                image: 'acct_circle.svg',
                phone: '480-415-0471',
                email: 'jake@apollorobotics.org',
                address: '1421 E. Drachman St.',
                city: 'Tucson',
                state: 'AZ',
                postalCode: '85719',
                username: 'jakehewitt',
                salt: salt,
                hashed_pwd: hash,
                roles: ['admin'],
                subscription: "Professional",
                riskiness: 100,
                location: {
                    longitude: 50.6,
                    latitude: 40.8
                }

            });

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'ElonMusk13');
            User.create({
                name: 'Apollo',
                image: 'acct_circle.svg',
                phone: '520-309-0519',
                email: 'admin@apollorobotics.org',
                address: '450 N. 6th Ave',
                city: 'Tucson',
                state: 'AZ',
                postalCode: '85705',
                username: 'admin@apollorobotics.org',
                salt: salt,
                hashed_pwd: hash,
                roles: ['admin'],
                subscription: "Professional",
                riskiness: 40,
                location: {
                    longitude: 50.6,
                    latitude: 40.8
                }

            });

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'test');
            User.create({
                name: 'Test User',
                image: 'acct_circle.svg',
                phone: '520-555-1234',
                email: 'testuser@gmail.com',
                address: '4628 N Belford Ave',
                city: 'Tucson',
                state: 'AZ',
                postalCode: '85705',
                username: 'testuser',
                salt: salt,
                hashed_pwd: hash,
                riskiness: 40,
                location: {
                    longitude: 50.6,
                    latitude: 40.8
                }

            });

            //salt = encrypt.createSalt();
            //hash = encrypt.hashPwd(salt, 'john');
            //User.create({
            //    name: 'John Smith',
            //    username: 'jsmith',
            //    salt: salt,
            //    hashed_pwd: hash,
            //    roles: [],
            //    subscription: "Free",
            //    riskiness: 200,
            //    location: {
            //        longitude: 7.6,
            //        latitude: 54.8
            //    }
            //
            //});
            //
            //salt = encrypt.createSalt();
            //hash = encrypt.hashPwd(salt, 'alice');
            //User.create({
            //    name: 'Alice Lee',
            //    username: 'alicelee',
            //    salt: salt,
            //    hashed_pwd: hash,
            //    roles: [],
            //    subscription: "Professional",
            //    riskiness: 150,
            //    location: {
            //        longitude: 24.6,
            //        latitude: 80.8
            //    }
            //
            //});
            //
            //salt = encrypt.createSalt();
            //hash = encrypt.hashPwd(salt, 'james');
            //User.create({
            //    name: 'James Wilson',
            //    username: 'jameswilson',
            //    salt: salt,
            //    hashed_pwd: hash,
            //    roles: [],
            //    subscription: "free",
            //    riskiness: 10,
            //    location: {
            //        longitude: 70.0,
            //        latitude: 45.5
            //    }
            //
            //});
            //
            //salt = encrypt.createSalt();
            //hash = encrypt.hashPwd(salt, 'luke');
            //User.create({
            //    name: 'Luke Walker',
            //    username: 'lukewalker',
            //    salt: salt,
            //    hashed_pwd: hash,
            //    roles: ['admin'],
            //    subscription: "free",
            //    riskiness: 500,
            //    location: {
            //        longitude: 60.0,
            //        latitude: 15.7
            //    }
            //
            //});
            //
            //salt = encrypt.createSalt();
            //hash = encrypt.hashPwd(salt, 'jonathan');
            //User.create({
            //    name: 'Jonathan Green',
            //    username: 'jgreen',
            //    salt: salt,
            //    hashed_pwd: hash,
            //    roles: ['admin'],
            //    subscription: "Professional",
            //    riskiness: 80,
            //    location: {
            //        longitude: 20.6,
            //        latitude: 130.8
            //    }
            //
            //});
            //
            //
            //salt = encrypt.createSalt();
            //hash = encrypt.hashPwd(salt, 'emily');
            //User.create({
            //    name: 'Emily King',
            //    username: 'emilyking',
            //    salt: salt,
            //    hashed_pwd: hash,
            //    roles: ['admin'],
            //    subscription: "free",
            //    riskiness: 800,
            //    location: {
            //        longitude: 80.6,
            //        latitude: 90.8
            //    }
            //
            //});
            //
            //salt = encrypt.createSalt();
            //hash = encrypt.hashPwd(salt, 'mia');
            //User.create({
            //    name: 'Mia Parker',
            //    username: 'miaparker',
            //    salt: salt,
            //    hashed_pwd: hash,
            //    roles: [],
            //    subscription: "Professional",
            //    riskiness: 350,
            //    location: {
            //        longitude: 79.0,
            //        latitude: 175.0
            //    }
            //
            //});
            //
            //salt = encrypt.createSalt();
            //hash = encrypt.hashPwd(salt, 'max');
            //User.create({
            //    name: 'Max Foster',
            //    username: 'maxfoster',
            //    salt: salt,
            //    hashed_pwd: hash,
            //    roles: ['admin'],
            //    subscription: "Professional",
            //    riskiness: 0,
            //    location: {
            //        longitude: 36.0,
            //        latitude: 17.0
            //    }
            //
            //});
            //
            //salt = encrypt.createSalt();
            //hash = encrypt.hashPwd(salt, 'david');
            //User.create({
            //    name: 'David Cruz',
            //    username: 'davidcruz',
            //    salt: salt,
            //    hashed_pwd: hash,
            //    roles: ['admin'],
            //    subscription: "free",
            //    riskiness: 350,
            //    location: {
            //        longitude: 59.0,
            //        latitude: 129.0
            //    }
            //
            //});

        }
    });
}

exports.createDefaultUsers = createDefaultUsers;
