import helperRouter from "./modules/helper/helper.route";
import adminRouter from "./modules/admin/admin.route";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/v1/helper", helperRouter);
app.use("/v1/admin", adminRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
