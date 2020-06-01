module.exports = {
    //find all, by id or by email
    find: (db, userId) => {
        const options = {
            where: { isActive: true }
          };
        if (!userId) return db.User.findAll(options);
        return db.User.findOne({
            ...options,
            where:{id: userId} 
        });
    },

    findEmail: (db, email) => {
        const options = {
            where: { isActive: true }
          };
        return db.User.findOne({
            ...options,
            where:{ email: email}
        });
    },

    softDelete: async (db, userId) => {
        console.log(userId)
        await db.User.update({ isActive: false }, { where: { id: userId } });
    }
};
