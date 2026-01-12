module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define("Group", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Group;
};
