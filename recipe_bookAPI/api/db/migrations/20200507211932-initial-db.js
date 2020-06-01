'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isActive: {
        allowNull:false,
        type:Sequelize.BOOLEAN,
        defaultValue: true
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    }, { timestamps: true });
  
  await queryInterface.createTable('Recipes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    directions: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    img_url: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    prep_time: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    authorId: {
      type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
     },
     createdAt: {
       allowNull: false,
       type: Sequelize.DATE,
       defaultValue: new Date()
     },
     updatedAt: {
       allowNull: false,
       type: Sequelize.DATE,
       defaultValue: new Date(),
     },
     isActive: {
       allowNull:false,
       type:Sequelize.BOOLEAN,  
     }
  }, { timestamps: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
    await queryInterface.dropTable('Recipes');
  }
};
