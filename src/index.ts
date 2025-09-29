import express, { Request, Response } from "express";
import { errorMiddleware } from "./middleware/errorMiddleware";
import sequelize from "./db/database";
import Relations from "./model/relations";
import userRouter from "./router/user.router";
import branchRouter from "./router/branch.router"
import productRouter from "./router/product.router"
import clientRouter from "./router/client.router"
import expenseRouter from "./router/expense.router"
import productHistoryRouter from "./router/product.history.router"
import orderRouter from "./router/order.router"
import orderItemRouter from "./router/order.item.router";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend manzili
    credentials: true, // agar cookie ishlatsa
  })
);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello bro !");
})
app.use("/auth", userRouter);
app.use("/branches", branchRouter);
app.use("/products", productRouter);
app.use("/clients", clientRouter);
app.use("/expenses", expenseRouter);
app.use("/product-history", productHistoryRouter);
app.use("/orders", orderRouter);
app.use("/order-item", orderItemRouter);
app.use(errorMiddleware);

const serverStart = () => {
  sequelize.authenticate();
  console.log("Database connected successfully");
  Relations();
  sequelize.sync({});
  console.log("Models connnected");
  app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
};

serverStart();