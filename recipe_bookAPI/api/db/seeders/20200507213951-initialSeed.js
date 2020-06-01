'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Anne',
        email: 'anne.gmail.com',
        password: '1234',
        image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        createdAt: new Date(),
        updatedAt: new Date,
        isAdmin: false,
        isActive: true
      },
      {
        name: 'Daisy',
        email: 'daisy.gmail.com',
        password: '4231',
        image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        createdAt: new Date(),
        updatedAt: new Date,
        isAdmin: false,
        isActive: true
      },
      {
        name: 'Sarah',
        email: 'sarah.gmail.com',
        password: '1324',
        image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        createdAt: new Date(),
        updatedAt: new Date,
        isAdmin: false,
        isActive: true
      },
      {
        name: 'John',
        email: 'john.gmail.com',
        password: '4321',
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        createdAt: new Date(),
        updatedAt: new Date,
        isAdmin: false,
        isActive: true
      },
    ], {});

   const users = await queryInterface.sequelize.query(
      `SELECT id FROM Users`
    )
    const usersRow = users[0];

    await queryInterface.bulkInsert('Recipes', [
      {
        name: 'Cheesecake',
        description: 'Easy & tasty cheesecake',
        directions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        prep_time: 40,
        img_url: 'https://images.pexels.com/photos/1098592/pexels-photo-1098592.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        authorId: usersRow[0].id,
        createdAt: new Date(),
        updatedAt: new Date,
        isActive: true
      },
      {
        name: 'Chocolate cake',
        description: 'Chocolate cake that will make you happy :)',
        directions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        prep_time: 30,
        img_url: 'https://images.pexels.com/photos/132694/pexels-photo-132694.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        authorId: usersRow[0].id,
        createdAt: new Date(),
        updatedAt: new Date,
        isActive: true
      },
      {
        name: 'Homemade Pizza',
        description: 'Tastiest pizza that you will make home',
        directions: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
        prep_time: 30,
        img_url: 'https://images.pexels.com/photos/803290/pexels-photo-803290.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        authorId: usersRow[1].id,
        createdAt: new Date(),
        updatedAt: new Date,
        isActive: true
      },
      {
        name: 'Roast Beef',
        description: 'Roast beef that will impress everyone at your dinner party',
        directions: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
        prep_time: 120,
        img_url: 'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        authorId: usersRow[2].id,
        createdAt: new Date(),
        updatedAt: new Date,
        isActive: true
      },
    ], {});
  },
 

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
    return queryInterface.bulkDelete('Recipes', null, {});
  }
};
