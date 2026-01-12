module.exports = (sequelize, DataTypes) => {
  const TaskParticipation = sequelize.define("TaskParticipation", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return TaskParticipation;
};
