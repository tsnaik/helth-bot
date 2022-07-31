import { dbConfig } from "../config/db.config.js";
import { Sequelize } from "sequelize";
import { userModel } from "./user.model.js";
import { groupModel } from "./group.model.js";
import { groupMemberModel } from "./groupMember.model.js";
import { attendanceModel } from "./attendance.model.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//models
db.users = userModel(sequelize, Sequelize);
db.groups = groupModel(sequelize, Sequelize);
db.groupMembers = groupMemberModel(sequelize, Sequelize);
db.attendances = attendanceModel(sequelize, Sequelize);

// associations (required for joins)
db.users.belongsToMany(db.groups, {
  through: db.groupMembers,
  foreignKey: "user_id",
});
db.groups.belongsToMany(db.users, {
  through: db.groupMembers,
  foreignKey: "group_id",
});

export const ormdb = db;
