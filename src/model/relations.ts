import { Branch } from "./branch.model";
import { Client } from "./client.model";
import { Expense } from "./expense.model";
import { OrderItem } from "./order.item.model";
import { Order } from "./order.model";
import { ProductHistory } from "./product.history.model";
import { Product } from "./product.model";
import { User } from "./user.model";

export default function Relations() {
  User.hasOne(Branch, {
    foreignKey: {
      name: "user_id",
      allowNull: true,
    },
  });
  Branch.belongsTo(User, {
    foreignKey: {
      name: "user_id",
      allowNull: true,
    },
  });

  Branch.hasMany(Product, {
    foreignKey: {
      name: "branch_id",
      allowNull: false,
    },
  });
  Product.belongsTo(Branch, {
    foreignKey: {
      name: "branch_id",
      allowNull: false,
    },
  });

  Branch.hasMany(Client, {
    foreignKey: {
      name: "branch_id",
      allowNull: false,
    },
  });
  Client.belongsTo(Branch, {
    foreignKey: {
      name: "branch_id",
      allowNull: false,
    },
  });

  Product.hasMany(ProductHistory, {
    foreignKey: {
      name: "product_id",
      allowNull: false,
    },
  });
  ProductHistory.belongsTo(Product, {
    foreignKey: {
      name: "product_id",
      allowNull: false,
    },
  });

  Client.hasMany(Order, {
    foreignKey: {
      name: "client_id",
      allowNull: false,
    },
  });
  Order.belongsTo(Client, {
    foreignKey: {
      name: "client_id",
      allowNull: false,
    },
  });

  Product.hasMany(OrderItem, {
    foreignKey: {
      name: "product_id",
      allowNull: false,
    },
  });
  OrderItem.belongsTo(Product, {
    foreignKey: {
      name: "product_id",
      allowNull: false,
    },
  });

  Order.hasMany(OrderItem, {
    foreignKey: {
      name: "order_id",
      allowNull: false,
    },
  });
  OrderItem.belongsTo(Order, {
    foreignKey: {
      name: "order_id",
      allowNull: false,
    },
  });

  Branch.hasMany(Expense, {
    foreignKey: {
        name: "branch_id",
        allowNull: false,
    }
  });
  Expense.belongsTo(Branch, {
    foreignKey: {
        name: "branch_id",
        allowNull: false,
    }
  });
}
