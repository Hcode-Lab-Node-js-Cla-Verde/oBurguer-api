export default {
  id: true,
  total: true,
  createdAt: true,
  users: {
    select: {
      id: true,
      persons: {
        select: {
          name: true,
        },
      },
    },
  },
  orderStatus: {
    select: {
      id: true,
      name: true,
    }
  },
  orderItems: {
    select: {
      id: true,
      name: true,
      createdAt: true,
      itemIngredients: {
        select: {
          id: true,
          ingredient_price: true,
          createdAt: true,
          ingredients: {
            select: {
              name: true,
              ingredient_types: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  },
};
