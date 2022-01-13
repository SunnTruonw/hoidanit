'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Xuan',
      lastName: 'Truong',
      email: 'admin@gmail.com',
      password : '123456',
      gender : 1,
      address : 'hanoi',
      typeRole : 'ROLE',
      keyRole : 'R1', 
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
