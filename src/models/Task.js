module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    assignmentType: {
      type: DataTypes.ENUM("INDIVIDUAL", "GROUP"),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("TODO", "COMPLETED"),
      defaultValue: "TODO"
    },
    priority: {
      type: DataTypes.ENUM("LOW", "MEDIUM", "HIGH"),
      defaultValue: "MEDIUM"
    },
    dueDate: DataTypes.DATE,
    createdBy: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    assignedUserId: DataTypes.INTEGER
  });

  return Task;
};
