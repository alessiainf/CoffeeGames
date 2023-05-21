'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Users', 
      [{
        username: 'not.defined',
        email: 'not.defined@cg.com',
        password: '$2b$10$79IqX.kD0ALlrw4i7n7riedWJq20nBmOgXgKD3px5sL7prAtQisGC', // not.defined
        icon: 'guest',
        resetResponse: '$2b$10$aciL8JfgeMa80hodjyrLnOOBZ6afMiycX8REc6DTvV3xXHnU7IX36', // not.defined
        resetQuestion: 'Q1',
        background: '0',
        createdAt: new Date(),
        updatedAt: new Date()
      }],
      {}
    );

    await queryInterface.bulkInsert('Achievements', 
      [{
        username: 'not.defined',
        level: '0',
        xp: '0',
        playedGame: 'GLOBAL',
        wins: '0',
        drows: '0',
        loses: '0',
        createdAt: new Date(),
        updatedAt: new Date()
      }],
      {}
    );

    await queryInterface.bulkInsert('ResetQuestions', 
      [{
        idQuestion: 'Q1',
        question: 'Nome del tuo primo amico',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idQuestion: 'Q2',
        question: 'Nome del tuo primo animale domestico',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idQuestion: 'Q3',
        question: 'Colore Preferito',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idQuestion: 'Q4',
        question: 'Nome della scuola elementare da te frequentata',
        createdAt: new Date(),
        updatedAt: new Date()
      }],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    
  }
};
