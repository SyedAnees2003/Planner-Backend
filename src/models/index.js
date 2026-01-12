const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const User = require("./User")(sequelize, DataTypes);
const Group = require("./Group")(sequelize, DataTypes);
const Task = require("./Task")(sequelize, DataTypes);
const GroupMember = require("./GroupMember")(sequelize, DataTypes);
const TaskParticipation = require("./TaskParticipation")(sequelize, DataTypes);
const Comment = require("./Comment")(sequelize, DataTypes);

/* Associations */
User.belongsToMany(Group, { through: GroupMember });
Group.belongsToMany(User, { through: GroupMember });

Group.hasMany(Task);
Task.belongsTo(Group);

User.hasMany(Task, { foreignKey: "assignedUserId" });
Task.belongsTo(User, { foreignKey: "assignedUserId" });

Task.hasMany(TaskParticipation);
TaskParticipation.belongsTo(Task);

User.hasMany(TaskParticipation);
TaskParticipation.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Group.hasMany(Comment);
Comment.belongsTo(Group);

Task.hasMany(Comment);
Comment.belongsTo(Task);

module.exports = {
  sequelize,
  User,
  Group,
  Task,
  GroupMember,
  TaskParticipation,
  Comment
};
