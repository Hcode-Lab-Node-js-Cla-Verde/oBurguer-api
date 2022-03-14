export default {
  id: true,
  total: true,
  createdAt: true,
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
              ingredientTypes: {
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
