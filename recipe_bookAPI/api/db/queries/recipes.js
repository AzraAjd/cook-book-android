const sequelize = require('sequelize');

module.exports = {
    find: (db, recipeId) => {
        const options = {
            where: { isActive: true },
            attributes: {
                exclude: 'UserId'
              }
            };
        if (!recipeId) return db.Recipe.findAll(options);
        return db.Recipe.findOne({
            ...options,
            where: { id: recipeId }
        });
    }, 

    search: (db, name) => {
        let value = name.toLowerCase();
        const options = {
            where: { isActive: true },
            attributes: {
                exclude: 'UserId'
              }
            };
        return db.Recipe.findAll({
            ...options,
            where: { name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + value + '%') }
        });
    },

    softDelete: async (db, recipeId) => {
        console.log(recipeId)
        await db.Recipe.update({ isActive: false }, { where: { id: recipeId } });
    }
};